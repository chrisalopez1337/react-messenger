import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// Children component
import MessageEntry from './MessageEntry.jsx';
import SendMessage from './SendMessage.jsx';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 2px solid #883ef0;
    margin: 10px;
    padding: 10px;
    border-radius: 7px;
    min-width: 90%;
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
    flex-direction: row;
    justify-content: center;
    @media (max-width: 415px) {
        flex-direction: column;
    }
`;

export default function MessageView({ userData, setPersonBeingMessaged, currentMessages, setCurrentMessages, personBeingMessaged, setUserData }) {
    // Check if the first message is empty
    if (!currentMessages[0]?.text) {
        currentMessages.shift();
    }

    // Only render if the user is signed in.
    const messageRender = userData
        ? (
            <>
                { currentMessages.map(message => (<MessageEntry userData={userData} message={message} />))}
            </>
          )
        : <Button onClick={() => setModalView('sign-up')}>Create Account to message</Button>
    return (
        <Container>
            <Wrapper>
                <Row>
                    <h3>{personBeingMessaged !== '' ? personBeingMessaged : 'Messages'}</h3>
                    <CloseButton onClick={() => { setPersonBeingMessaged(''); setCurrentMessages([]) }}>Clear</CloseButton>
                </Row>
                {messageRender}
                <SendMessage userData={userData} personBeingMessaged={personBeingMessaged} setUserData={setUserData} />
            </Wrapper>
        </Container>
    )
}
