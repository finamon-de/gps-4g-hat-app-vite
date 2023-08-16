import { useState } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { UserApi } from '../../data/api/UserApi';
import { isUserLoggedIn } from '../../data/storage/CookieManager';

export const LoginForm = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);

    const moveToRegistration = (event: any) => {
        navigate('/register');
    };

    const moveToMain = () => {
        navigate('/');
    };

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        attemptLogin(event);
    };

    const attemptLogin = async (event: any) => {
        const api = UserApi();
        const result = await api.login(email, password);
        if (result && isUserLoggedIn()) {
            moveToMain();
        }
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formLoginEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control required type="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)} />
                <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLoginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                <Form.Control.Feedback type="invalid">Please enter a password.</Form.Control.Feedback>
            </Form.Group>

            <Stack gap={2} className="col-md-6 col-sm-12 mx-auto">
                <Button variant="primary" type="submit">
                    Sign in
                </Button>

                <Button variant="text" onClick={moveToRegistration}>
                    Register a new account
                </Button>
            </Stack>
        </Form>
    );
};
