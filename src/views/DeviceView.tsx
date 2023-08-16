import { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { DeviceDetailCanvas } from '../components/DeviceDetailCanvas';
import { DevicesList } from '../components/DevicesList';
import { DeviceApi } from '../data/api/DeviceApi';
import { Device } from '../data/models/Device';
import { ContentViewLayout } from '../layouts/ContentViewLayout';
import { useBreakoint } from '../style/BreakpointHelper';
import { getUserId } from '../data/storage/CookieManager';

export const DeviceView = (props: any) => {
    const breakpoint = useBreakoint();

    const [devices, setDevices] = useState<Device[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<Device>();
    const [showOffcanvas, setShowOffCanvas] = useState(false);

    /**
     * Initial loading sequence
     */
    useEffect(() => {
        loadDevices();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Handle new devices
     */
    useEffect(() => {}, [devices]);

    /**
     * Load devices.
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

    const handleOffCanvasOnClose = () => {
        setShowOffCanvas(false);
    };

    const handleOffCanvasShow = () => {
        setShowOffCanvas(true);
    };

    const onListItemClick = (device: Device) => {
        setSelectedDevice(device);

        if (['xs', 'sm', 'md'].includes(breakpoint)) {
            handleOffCanvasShow();
        }
    };

    return (
        <ContentViewLayout title={'Devices'}>
            <Row>
                <Col className="col-sm-12 col-lg-7">
                    <Row>
                        <DevicesList devices={devices} onItemClick={onListItemClick} />
                    </Row>
                </Col>
                <Col className="col-lg-5">
                    <DeviceDetailCanvas show={showOffcanvas} onHide={handleOffCanvasOnClose} responsive={'lg'} device={selectedDevice} />
                </Col>
            </Row>
        </ContentViewLayout>
    );
};
