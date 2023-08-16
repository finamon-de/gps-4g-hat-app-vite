import { useCallback, useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { DeviceDropdown } from '../components/DeviceDropdown';
import { PositionTable } from '../components/PositionTable';
import { DeviceApi } from '../data/api/DeviceApi';
import { Device } from '../data/models/Device';
import { Position } from '../data/models/Position';
import { ContentViewLayout } from '../layouts/ContentViewLayout';
import { getUserId } from '../data/storage/CookieManager';

export const PositionView = (props: any) => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<Device>();
    const [positions, setPositions] = useState<Position[]>([]);

    const loadDevices = useCallback(async () => {
        const userId = getUserId();
        if (!userId) {
            console.warn('You are trying to load devices for an invalid/missing user id.');
            return;
        }
        const result = await DeviceApi().loadDevicesForUser(userId);
        setDevices(result);
    }, []);

    const loadPositions = useCallback(async () => {
        if (!selectedDevice) return;
        const result = await DeviceApi().loadPositionsForDevice(selectedDevice.id);
        setPositions(result);
    }, [selectedDevice]);

    useEffect(() => {
        loadDevices();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        loadPositions();
    }, [selectedDevice, loadPositions]);

    const handleDropdownSelect = (eventKey: any, event: object) => {
        setSelectedDevice(devices[eventKey]);
    };

    return (
        <ContentViewLayout title={'Positions'}>
            <Row>
                <DeviceDropdown devices={devices} onSelect={handleDropdownSelect} />
            </Row>
            <Row className="pt-4 pb-4">
                <PositionTable positions={positions} />
            </Row>
        </ContentViewLayout>
    );
};
