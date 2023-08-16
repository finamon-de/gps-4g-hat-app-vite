import { Offcanvas, Col, Row } from "react-bootstrap"

export const DeviceDetailCanvas = (props: any) => {

    const { device, show, onHide, responsive } = props

    const getRow = (title: string, content: any) => {
        return (
            <Row>
                <Col className={"col-4"}>
                    <p className={"fw-semibold"}>{title}</p>
                </Col>
                <Col>
                    <code>{content}</code>
                </Col>
            </Row>
        )
    }

    return (
        <Offcanvas show={show} onHide={onHide} responsive={responsive}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Details</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Col>
                    { getRow('IMEI', device?.imei) }
                    { getRow('IP', device?.ip) }
                    { getRow('Last Contact (UTC)', device?.lastContact.toUTCString()) }
                    { getRow('Inputs', device?.inputs) }
                    { getRow('Outputs', device?.outputs) }
                    { getRow('LED', device?.led) }
                    { getRow('Button', device?.button) }
                    { getRow('Owner', device?.owner) }
                    { getRow('Positions', device?.positions.length) }
                    { getRow('Sensor readings', device?.accSensorData.length) }
                </Col>
            </Offcanvas.Body>
        </Offcanvas>
    )
}