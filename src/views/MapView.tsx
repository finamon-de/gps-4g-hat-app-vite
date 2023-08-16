import { useCallback, useEffect, useRef, useState } from 'react';
import mapboxgl, { Map } from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { ContentViewLayout } from '../layouts/ContentViewLayout';
import { Row } from 'react-bootstrap';
import { DeviceDropdown } from '../components/DeviceDropdown';
import { Device } from '../data/models/Device';
import { DeviceApi } from '../data/api/DeviceApi';
import { Position } from '../data/models/Position';
import { generateRandomHexColor } from '../style/ColorHelper';
import { getUserId } from '../data/storage/CookieManager';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN ?? '';

export const MapView = (props: any) => {
    const mapContainer = useRef<HTMLInputElement>(null);
    const map = useRef<Map | null>(null);

    const [devices, setDevices] = useState<Device[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<Device>();
    const [segments, setSegments] = useState<Position[][]>([]);
    const [polylineSource, setPolylineSource] = useState<any[]>([]);
    const [circleSource, setCircleSource] = useState<any[]>([]);
    const [mapProperties] = useState({
        zoom: 9,
        center: {
            lat: 51.2291589,
            lng: 6.7160651,
        },
    });

    const loadDevices = useCallback(async () => {
        const userId = getUserId();
        if (!userId) {
            console.warn('You are trying to load devices for an invalid/missing user id.');
            return;
        }
        const result = await DeviceApi().loadDevicesForUser(userId);
        setDevices(result);
    }, []);

    const loadPositions = useCallback(async (device: Device) => {
        const positions = await DeviceApi().loadPositionsForDevice(device.id);
        const segments = buildPathSegments(positions);
        setSegments(segments);
    }, []);

    useEffect(() => {
        loadDevices();

        if (map.current) return; // initialize map only once

        // initialize
        map.current = new Map({
            container: mapContainer.current ?? 'map-container',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [mapProperties.center.lng, mapProperties.center.lat],
            zoom: mapProperties.zoom,
        });

        // handling after `map` is ready
        map.current?.on('load', () => {
            map.current?.addSource('polylines', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [],
                },
            });
            map.current?.addLayer({
                id: 'polylines',
                type: 'line',
                source: 'polylines',
                paint: {
                    'line-width': 3,
                    'line-color': ['get', 'color'],
                },
            });
            map.current?.addSource('polyline-markers', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [],
                },
            });
            map.current?.addLayer({
                id: 'polyline-markers',
                type: 'circle',
                source: 'polyline-markers',
                paint: {
                    'circle-radius': 5,
                    'circle-color': ['get', 'color'],
                },
            });
        });

        map.current.on('click', 'polyline-markers', (e) => {
            if (!e.features) return;
            if (!map.current) return;

            // TODO: Find a way to use the correct types
            // For some reason the type defintions are not resolved properly
            // Therefore, in some cases there needs to be this ugly casting
            const feature = e.features[0];
            const coordinates = (feature.geometry as unknown as any).coordinates.slice();
            const lat = coordinates[1];
            const lng = coordinates[0];
            const utc = (feature.properties as unknown as any).utc ?? 0;
            const timestamp = new Date(utc).toISOString();

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup({ anchor: 'bottom' }).setLngLat(coordinates).setHTML(`<span style="font-family: monospace">Lat: ${lat}<br>Lng: ${lng}<br/>Time: ${timestamp}</span>`).addTo(map.current);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!map.current) return;
        if (!map.current.getSource('polylines')) return;
        if (!polylineSource) return;

        const geojsonSource = map.current.getSource('polylines') as unknown as any;
        geojsonSource.setData({
            type: 'FeatureCollection',
            features: polylineSource,
        });
    }, [polylineSource]);

    useEffect(() => {
        if (!map.current) return;
        if (!map.current.getSource('polyline-markers')) return;
        if (!circleSource) return;

        const geojsonSource = map.current.getSource('polyline-markers') as unknown as any;
        geojsonSource.setData({
            type: 'FeatureCollection',
            features: circleSource,
        });
    }, [circleSource]);

    useEffect(() => {
        const lineStringFeatures = buildLineStringFeatures(segments);
        setPolylineSource(lineStringFeatures);

        const circleFeatures = buildCircleFeatures(segments);
        setCircleSource(circleFeatures);
    }, [segments]);

    useEffect(() => {
        if (!selectedDevice) return;
        loadPositions(selectedDevice);
    }, [loadPositions, selectedDevice]);

    const handleDropdownSelect = (eventKey: any, event: object) => {
        setSelectedDevice(devices[eventKey]);
    };

    const buildLineStringFeatures = (segments: Position[][]) => {
        const features: any[] = [];
        segments.forEach((item, index) => {
            const coordinates =
                item
                    .filter((el) => el.longitude !== undefined && el.latitude !== undefined)
                    .map((el) => {
                        return [el.longitude, el.latitude];
                    }) ?? [];
            const color = generateRandomHexColor();
            features.push({
                type: 'Feature',
                properties: {
                    color: color,
                },
                geometry: {
                    type: 'LineString',
                    coordinates: coordinates,
                },
            });
        });

        return features;
    };

    const buildCircleFeatures = (segments: Position[][]) => {
        const features: any[] = [];

        segments.forEach((item, index) => {
            const coordinates =
                item
                    .filter((el) => el.longitude !== undefined && el.latitude !== undefined)
                    .map((el) => {
                        return el;
                    }) ?? [];
            const color = generateRandomHexColor();
            coordinates.forEach((c) => {
                features.push({
                    type: 'Feature',
                    properties: {
                        color: color,
                        utc: c.utc ?? 0,
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [c.longitude, c.latitude],
                    },
                });
            });
        });

        return features;
    };

    const buildPathSegments = (positions: Position[]) => {
        const segments: Position[][] = [];
        let currentDate: number[] = [];
        let segmentIndex = 0;
        positions.forEach((el) => {
            const d = new Date(el.utc);
            const month = d.getMonth();
            const date = d.getDate();

            // handle first position
            if (currentDate.length === 0) {
                currentDate = [date, month];
                segments[segmentIndex] = [];
                segments[segmentIndex].push(el);
            } else {
                // handle other positions
                const isSameDay = currentDate[0] === date && currentDate[1] === month;
                if (isSameDay) {
                    segments[segmentIndex].push(el);
                } else {
                    currentDate = [date, month];
                    segmentIndex++;
                    segments[segmentIndex] = [];
                    segments[segmentIndex].push(el);
                }
            }
        });
        return segments;
    };

    return (
        <ContentViewLayout title={'Map'}>
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
