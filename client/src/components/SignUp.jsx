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
