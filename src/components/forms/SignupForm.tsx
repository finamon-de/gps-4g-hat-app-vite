import { useState } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router';

export const SignupForm = () => {
    const navigate = useNavigate();

    const [input, setInput] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
    });

    const moveToLogin = (event: any) => {
        navigate('/login');
    };

    const isValidEmail = (): boolean => {
        console.warn('TODO: Implement proper validation');
        console.info(`Current input: ${input.email}`);
        return true;
    };

    const arePasswordsValid = (): boolean => {
        console.warn('TODO: Implement proper validation');
        console.info(`Current input: ${input.password}, ${input.passwordConfirm}`);
        return true;
    };

    const attemptRegistration = async (event: any) => {
        isValidEmail();
        arePasswordsValid();
    };

    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="formLoginEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" onChange={(event) => setInput((prev) => ({ ...prev, email: event.target.value }))} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLoginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(event) => setInput((prev) => ({ ...prev, password: event.target.value }))} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLoginPasswordConfirm">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password" onChange={(event) => setInput((prev) => ({ ...prev, passwordConfirm: event.target.value }))} />
                </Form.Group>
            </Form>
            <Stack gap={2} className="col-md-6 col-sm-12 mx-auto">
                <Button variant="primary" onClick={attemptRegistration}>
                    Register
                </Button>

                <Button variant="text" onClick={moveToLogin}>
                    Back to Login
                </Button>
            </Stack>
        </div>
    );
};
