import { Alert, Card, Container, Row } from 'react-bootstrap';
import { SignupForm } from '../components/forms/SignupForm';

export const SignupView = (props: any) => {
    return (
        <Container fluid>
            <Row className={'m-4'} style={{ textAlign: 'center' }}>
                <h1>GPS 4G HAT Web application</h1>
            </Row>
            <Row className={'m-4 justify-content-center'}>
                <Card className={'has-shadow has-no-border'} style={{ width: '32rem' }}>
                    <Card.Body>
                        <Card.Title>Register</Card.Title>
                        <SignupForm />

                        <Alert variant={'warning'}>Please, be aware that this demo application does not implement any validation for the email and password fields.</Alert>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    );
};
