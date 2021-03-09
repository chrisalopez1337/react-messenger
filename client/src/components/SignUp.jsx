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
`;

// Form
const Form = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const Input = styled.input`
    background-color: transparent;
    margin: 10px;
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
                handleMessage('usernameMessage', '');
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


    return (
        <Container>
            <FormContainer>
                <Title>Create an account</Title>
                <Form>
                    <label htmlFor="username">Username</label>
                    <Input type="text" name="username" value={username} onChange={handleFields}/>

                    <label htmlFor="email">Email</label>
                    <Input type="email" name="email" value={email} onChange={handleFields}/>

                    <label htmlFor="password">Password</label>
                    <Input type="password" name="password" value={password} onChange={handleFields}/>

                    <label htmlFor="verifyPassword">Verify Password</label>
                    <Input type="password" name="verifyPassword" value={verifyPassword} onChange={handleFields}/>

                    <button type="submit">Create account</button>
                    <button>Already signed up?</button>
                </Form>
            </FormContainer>
        </Container>
    );
}
