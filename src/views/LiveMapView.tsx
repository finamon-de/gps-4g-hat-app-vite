import { useCallback, useEffect, useRef, useState } from 'react';
import { ContentViewLayout } from '../layouts/ContentViewLayout';
import { Device } from '../data/models/Device';
import { Position } from '../data/models/Position';
import { DeviceApi } from '../data/api/DeviceApi';
import { ApiWebSocket } from '../data/api/ApiWebSocket';
import mapboxgl, { Map, Marker } from 'mapbox-gl';
import { Row } from 'react-bootstrap';
import { DeviceDropdown } from '../components/DeviceDropdown';
import { getUserId } from '../data/storage/CookieManager';

mapboxgl.accessToken = import.meta.env.REACT_APP_MAPBOX_TOKEN ?? '';

const apiSocket = ApiWebSocket();

const defaultMapProperties = {
    zoom: 9,
    center: {
        lat: 51.2291589,
        lng: 6.7160651,
    },
};

export const LiveMapView = (props: any) => {
    const mapContainer = useRef<HTMLInputElement>(null);
    const map = useRef<Map | null>(null);
    const [mapProperties] = useState(defaultMapProperties);

    const [devices, setDevices] = useState<Device[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<Device>();
    const [positions, setPositions] = useState<Position[]>([]);
    const [lastPosition, setLastPosition] = useState<Position>();
    const [marker, setMarker] = useState<Marker>();

    /**
     * Handle a new position from the web socket connection.
     */
    const receiveNewPosition = useCallback((position: Position) => {
        setLastPosition(position);
    }, []);

    /**
     * Update the marker on the map when a new position is received.
     */
    const updateMarker = useCallback(() => {
        if (!mapContainer.current) return;
        if (!map.current) return;
        if (!lastPosition) return;

        const m = new mapboxgl.Marker()
            .setLngLat([lastPosition.longitude, lastPosition?.latitude])
            .setPopup(new mapboxgl.Popup().setHTML(`<p style="font-family:monospace;">${selectedDevice?.imei ?? 'Unknown IMEI'}<br/>Lat: ${lastPosition.latitude}<br/>Lng: ${lastPosition.longitude}</p>`))
            .addTo(map.current);

        if (marker) {
            marker.remove();
        }

        setMarker(m);
    }, [lastPosition]);

    /**
     * Load the devices connected with the current user account.
     */
    const loadDevices = useCallback(async () => {
        const userId = getUserId();
        if (!userId) {
            console.warn('You are trying to load devices for an invalid/missing user id.');
            return;
        }
        const result = await DeviceApi().loadDevicesForUser(userId);
        setDevices(result);
    }, []);

    /**
     * Initialize the web socket connection.
     * @param userId
     */
    const initWebSocket = async (userId: string) => {
        if (apiSocket.connected()) {
            await apiSocket.disconnect(); // disconnect existing connection before creating a new connection
        }

        apiSocket.connect(userId, () => {
            apiSocket.setPositionCallback(receiveNewPosition);
        });
    };

    /**
     * Initial load.
     */
    useEffect(() => {
        loadDevices();

        if (map.current) return; // initialize map only once

        // initialize the map
        map.current = new Map({
            container: mapContainer.current ?? 'map-container',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [mapProperties.center.lng, mapProperties.center.lat],
            zoom: mapProperties.zoom,
        });

        return () => {
            if (apiSocket) {
                apiSocket.disconnect();
            }
        };
    }, []);

    /**
     * Handle when a new device is selected.
     */
    useEffect(() => {
        if (!selectedDevice) return;

        const userId = getUserId();
        if (!userId) return;

        initWebSocket(userId);
    }, [selectedDevice]);

    /**
     * Handle when a new position is received.
     */
    useEffect(() => {
        if (!lastPosition) return;
        setPositions((prev) => [...prev, lastPosition]);
        updateMarker();
    }, [lastPosition, updateMarker]);

    /**
     * Change handler of the dropdown.
     * @param eventKey
     * @param event
     */
    const handleDropdownSelect = (eventKey: any, event: unknown) => {
        setSelectedDevice(devices[eventKey]);
    };

    return (
        <ContentViewLayout title={'Live View'}>
            <Row className={'mb-3'}>
                <DeviceDropdown devices={devices} onSelect={handleDropdownSelect} />
            </Row>
            <Row className={'m-0 p-0'}>
                <div className={'border rounded-3 has-shadow m-0 p-0'}>
                    <div ref={mapContainer} className="map-container rounded-3" style={{ width: '100%', height: 'calc(100vh - 224px)' }} />
                </div>
            </Row>
        </ContentViewLayout>
    );
};
