import { Card, Container, Row } from 'react-bootstrap';
import { LoginForm } from '../components/forms/LoginForm';

export const LoginView = (props: any) => {
    return (
        <Container fluid>
            <Row className={'m-4'} style={{ textAlign: 'center' }}>
                <h1>
                    GPS 4G HAT
                    <br />
                    Web application
                </h1>
            </Row>
            <Row className={'m-4 align-items-center justify-content-center'}>
                <Card className={'has-shadow has-no-border'} style={{ width: '32rem' }}>
                    <Card.Body>
                        <Card.Title>Login</Card.Title>
                        <LoginForm />
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    );
};
