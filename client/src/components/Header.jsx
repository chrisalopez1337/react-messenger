import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// Children components
import HeaderButtons from './HeaderButtons.jsx';

// Main container
const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: column;
    @media (max-width: 410px) {
        flex-direction: column;
    }
`;

// Text styling
const Logo = styled.h2`
    color: #0356fc;
`;

export default function Header({ userData, setModalView }) {
    // View change for buttons
    const [buttonView, setButtonView] = useState('signed-out');
    // Event handler for button view
    useEffect(() => {
        if (userData) {
            setButtonView('logged-in');
        } else {
            setButtonView('signed-out');
        }
    }, [userData]);

    return (
        <Container>
            <Logo>React-Messenger</Logo>
            <HeaderButtons buttonView={buttonView} setModalView={setModalView} />
        </Container>
    );
}
