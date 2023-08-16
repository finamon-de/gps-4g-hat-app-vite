import { Col, Container, Row } from "react-bootstrap"

export const ContentViewLayout = (props: any) => {

    const { title, children } = props

    return (
        <Container fluid className={'p-4'}>
            <Col>
                <Row>
                    <h2>{title}</h2>
                </Row>
                { children }
            </Col>
        </Container>
    )
}