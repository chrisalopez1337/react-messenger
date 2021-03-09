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
    padding: 15px;
`;

// Text styling
const Title = styled.h3`
    color: #20293b; 
`;

export default function SignUp({ setModalView }) {
    return (
        <Container>
            <FormContainer>
                <Title>Create an account</Title>
                <form>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" />
                </form>
            </FormContainer>
        </Container>
    );
}
