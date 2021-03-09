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
    margin-top: 10px;
    background-color: #0356fc;
    color: white;
    border: 2px solid #0356fc;
    border-radius: 7px;
    font-size: 16px;
`;

export default function LogIn({ setModalView, logIn }) {
    // Fields
    const [fields, setFields] = useState({ searchItem: '', password: ''});
    const { searchItem, password } = fields;
    // Field handler
    function handleFields(e) {
        const { target } = e;
        const { name, value } = target;
        setFields({...fields, [name]: value});
    }

    // Error messaging 
    const [submitError, setSubmitError] = useState('');

    // Submit handler
    function handleSubmit(e) {
        e.preventDefault();
        // First make sure the user actually exists
        axios.get(`/users/${searchItem}`)
            .then(({ data }) => {
                if (data.username) {
                    // User exists, validate them, could potentially refactor backend to not do another query for the user data as we have access to the hash here.
                    const validateData = { username: data.username, password };
                    axios.post('/users/validate', validateData)
                        .then(res => {
                            const results = res.data;
                            if (res.data.validated) {
                                // user is validated, log them in
                                /* localStorage handler here */
                                logIn(data);
                                setModalView('none');
                            } else {
                                // User is not valid
                                setSubmitError('Please check your credentials again.');
                            }
                        })
                        .catch(err => console.error(err));
                } else {
                    // User doesnt exist
                    setSubmitError('Please check your credentials, we dont have a user under that username/email.');
                }
            })
            .catch(err => console.error(err));
    }
    return (
        <Container>
            <FormContainer>
                <Title>Log In</Title>
                <Form onSubmit={handleSubmit}>
                    <label htmlFor="searchItem">Username or Email</label>
                    <Input type="text" name="searchItem" value={searchItem} onChange={handleFields}/>

                    <label htmlFor="password">Password</label>
                    <Input type="password" name="password" value={password} onChange={handleFields}/>
                    <SubmitButton type="submit">Log In</SubmitButton>
                    <Error>{submitError}</Error>
                </Form>
            </FormContainer>
        </Container>
    );
}
