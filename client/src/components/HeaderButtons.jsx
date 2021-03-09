import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Button container
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row; 
`;

const Button = styled.button`
    font-family: inherit;
    padding: 7px;
    margin-right: 5px;
    margin-left: 5px;
    background-color: transparent;
    border: 2px solid #0356fc;
    border-radius: 7px;
    transition-duration: 0.2s;
    color: #0356fc;
    font-weight: bold;
    font-size: 18px;
    &:hover {
        background-color: #0356fc;
        color: white;
    }
`;

export default function HeaderButtons({ buttonView, setModalView }) {
    // Condtional rendering
    const buttonRender = buttonView === 'signed-out'
        ? (
            <>
                <Button onClick={() => setModalView('sign-up')}>Sign Up</Button>
                <Button onClick={() => setModalView('log-in')}>Log In</Button>
            </>
          )
        : buttonView === 'logged-in'
        ? (
            <>
                <Button onClick={() => {/* logout handler here */}}>Log Out</Button>
            </>
          )
        : <>Loading...</>;
    return (
        <Container>
            {buttonRender}
        </Container>
    );
};
