import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Main Container
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

// Form Container
const FormContainer = styled.div`
    border: 2px solid #91b4fa;
    border-radius: 7px;
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 15px;
    min-width: 400px;
    min-height: 400px;
    max-width: 400px;
    @media (max-width: 440px) {
        min-width: 250px;
        margin-top: 15px;
    }
`;

// Form
const Form = styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const Input = styled.input`
    background-color: transparent;
    padding: 7px;
    font-size: 16px;
    font-family: inherit;
    border-radius: 7px;
    border: 1px solid black;
`;

// Text styling
const Title = styled.h3`
    color: #20293b; 
`;

const Error = styled.p`
    color: red;
`;

// Buttons
const SubmitButton = styled.button`
    font-family: inherit;
    padding: 7px;
    margin-top: 5px;
    margin-bottom: 5px;
    background-color: #0356fc;
    color: white;
    border: 2px solid #0356fc;
    border-radius: 7px;
    font-size: 16px;
`;

const AlreadyRegisteredButton = styled.button`
    margin-top: 4px;
    marigin-bottom: 4px;
    color: #0356fc;
    font-family: inherit;
    text-decoration: underline;
    font-size: 16px;
    border: transparent;
    background-color: transparent;
`;

const CloseButton = styled.button`
    background-color: red;
    color: white;
    font-weight: bold;
    font-size: 16px;
    border: 1px solid red;
    padding: 5px;
    margin-left: 10px;
    border-radius: 7px;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
`;

export default function SignUp({ setModalView }) {
    // Fields for the form
    const [fields, setFields] = useState({ username: '', email: '', password: '', verifyPassword: ''});
    const { username, email, password, verifyPassword } = fields;
    // Field handler
    function handleFields(e) {
        const { target } = e;
        const { name, value } = target;
        setFields({...fields, [name]: value});
    }

    // User messaging handlers
    const [messages, setMessages] = useState({ usernameMessage: '', emailMessage: '', passwordMessage: '', vPasswordMessage: ''});
    const { usernameMessage, emailMessage, passwordMessage, vPasswordMessage } = messages;

    // Message handler
    function handleMessage(type, value) {
        setMessages({...messages, [type]: value});
    }

    // Field validation
    const [validated, setValidated] = useState({ username: false, email: false, password: false, vPassword: false });
    
    // Field validation handler
    function validationHandler(type, value) {
        setValidated({...validated, [type]: value});
    }

    // Handle username validation
    useEffect(() => {
        if (username !== '') {
            const regex = new RegExp("^[a-zA-Z0-9]{4,10}$");
            if (regex.test(username)) {
                // Make sure the username doesnt already exist
                axios.get(`/users/${username}`)
                    .then(({ data }) => {
                        if (!data.username) {
                            // Username is available
                            handleMessage('usernameMessage', '');
                            validationHandler('username', true);
                        } else {
                            // Username is taken
                            const message = 'Username is already taken';
                            handleMessage('usernameMessage', message);
                            validationHandler('username', false);
                        }
                    })
                    .catch(err => console.error(err));
            } else {
                const message = 'Username must be 4-10 characters, and contain no special characters.';
                handleMessage('usernameMessage', message);
                validationHandler('username', false);
            }
        } else {
            handleMessage('usernameMessage', '');
            validationHandler('username', false);
        }
    }, [username]);

    // Handle email validation
    useEffect(() => {
        if (email !== '') {
            const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (regex.test(email.toLowerCase())) {
                // First check if the email already exists
                axios.get(`/users/${email}`)
                    .then(({ data }) => {
                        if (!data.email) {
                            // Email hasnt been taken yet
                            handleMessage('emailMessage', '');
                            validationHandler('email', true);
                        } else {
                            // Email is taken
                            handleMessage('emailMessage', 'Email is already taken, please log in.');
                            validationHandler('email', false);
                        }
                    })
            } else {
                handleMessage('emailMessage', 'Please enter a valid email');
                validationHandler('email', false);
            }
        } else {
            handleMessage('emailMessage', '');
            validationHandler('email', false);
        }
    }, [email]);

    // Handle password validation
    useEffect(() => {
        if (password !== '') {
            const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");
            if (regex.test(password)) {
                handleMessage('passwordMessage', '');
                validationHandler('password', true);
            } else {
                handleMessage('passwordMessage', 'Password must be eight or more characters, contain atleast one uppercase, one symbol, and one lowercase.');
                validationHandler('password', false);
            }
        } else {
            handleMessage('passwordMessage', '');
            validationHandler('password', false);
        }
    }, [password]);


    // Handle password check validation
    useEffect(() => {
        if (verifyPassword !== '') {
            if (verifyPassword === password) {
                handleMessage('vPasswordMessage', '');
                validationHandler('vPassword', true);
            } else {
                handleMessage('vPasswordMessage', 'Make sure passwords match');
                validationHandler('vPassword', false);
            }
        } else {
            handleMessage('vPasswordMessage', '');
            validationHandler('vPassword', false);
        }
    }, [verifyPassword]);


    // Submit error messaging
    const [submitError, setSubmitError] = useState('');

    // Submit handler
    function handleSubmit(e) {
        e.preventDefault();
        // Make sure all fields are valid
        for (const key in validated) {
            if (!validated[key]) {
                setSubmitError(`Please check all fields, namely the ${key} field.`);
                return;
            }
        }

        // Create the user
        const data = { username, password, email };
        axios.post('/users/create', data)
            .then(res => {
                // User created, redirect them to the logged in view.
                setModalView('log-in');
            })
            .catch(err => console.error(err));
    }


    return (
        <Container>
            <FormContainer>
                <Row>
                    <Title>Create an account</Title>
                    <CloseButton onClick={() => setModalView('none')}>Close</CloseButton>
                </Row>
                <Form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <Input type="text" name="username" value={username} onChange={handleFields}/>
                    <Error>{usernameMessage}</Error>

                    <label htmlFor="email">Email</label>
                    <Input type="email" name="email" value={email} onChange={handleFields}/>
                    <Error>{emailMessage}</Error>

                    <label htmlFor="password">Password</label>
                    <Input type="password" name="password" value={password} onChange={handleFields}/>
                    <Error>{passwordMessage}</Error>

                    <label htmlFor="verifyPassword">Verify Password</label>
                    <Input type="password" name="verifyPassword" value={verifyPassword} onChange={handleFields}/>
                    <Error>{vPasswordMessage}</Error>

                    <SubmitButton type="submit">Create account</SubmitButton>
                    <AlreadyRegisteredButton>Already signed up?</AlreadyRegisteredButton>
                    <Error>{submitError}</Error>
                </Form>
            </FormContainer>
        </Container>
    );
}
