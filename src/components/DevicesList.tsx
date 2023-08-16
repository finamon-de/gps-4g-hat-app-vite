import { ListGroup, Card, Row, Col, Alert } from "react-bootstrap";
import { Device } from "../data/models/Device";

export const DevicesList = (props: any) => {
    const { devices, onItemClick } = props;

    const onItemClicked = (device: Device) => {
        if (typeof onItemClick === 'function') {
            onItemClick(device)
        } else {
            console.info('List item click listener not set.')
        }
    }

    const getListItem = (device: Device) => {
        return (
            <ListGroup.Item 
                key={device.imei}
                action 
                className={'has-no-border has-inherited-bg'}
                onClick={() => { onItemClicked(device) }}>
                <Card className={"has-no-border has-shadow"}>
                    <Card.Body>
                        <Card.Title>{device.imei}</Card.Title>
                        <hr />
                        <Row>
                            <Col className={"col-3"}>
                                <p className={"fw-semibold mb-1"}>IP</p>
                            </Col>
                            <Col>
                                <code>{device.ip}</code>
                            </Col>
                        </Row>
                        <Row>
                            <Col className={"col-3"}>
                                <p className={"fw-semibold mb-1"}>Last contact (UTC)</p>
                            </Col>
                            <Col>
                                <code>{device.lastContact.toUTCString()}</code>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </ListGroup.Item>
        )
    }

    return devices && (Array.isArray(devices) && devices.length > 0) ? (
        <ListGroup variant={"flush"}>
            { devices.map((device) => getListItem(device)) }
        </ListGroup>
    ) : (
        <Alert variant={'info'}>It seems there are currently no devices assigned.</Alert>
    )
}
