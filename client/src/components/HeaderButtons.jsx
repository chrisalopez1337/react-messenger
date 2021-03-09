import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Button container
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row; 
`;

export default function HeaderButtons({ buttonView, setModalView }) {
    // Condtional rendering
    const buttonRender = buttonView === 'signed-out'
        ? (
            <>
                <button onClick={() => setModalView('sign-up')}>Sign Up</button>
                <button onClick={() => setModalView('log-in')}>Log In</button>
            </>
          )
        : buttonView === 'logged-in'
        ? (
            <>
                <button onClick={() => {/* logout handler here */}}>Log Out</button>
            </>
          )
        : <>Loading...</>;
    return (
        <Container>
            {buttonRender}
        </Container>
    );
};
