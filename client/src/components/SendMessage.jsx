import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 95%;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 40%;
`;

const Input = styled.input`
    background-color: transparent;
    font-family: inherit;
    padding: 6px;
    border: 2px solid #3784a6;
    border-radius: 7px;
    margin-right: 5px;
`;

const UsableButton = styled.div`
    border: 2px solid #883ef0;
    font-family: inherit;
    font-size: 16px;
    border-radius: 7px;
    background-color: transparent;
    padding: 4px;
    transition-duration: 0.2s;
    &:hover {
        color: white;
        background-color: #883ef0;
    }
`;


export default function SendMessage({ personBeingMessaged, userData, setUserData }) {
    // Store the text the user wants to send
    const [messageText, setMessageText] = useState('');
    // Handler for input
    function inputHandler(e) {
        const { target } = e;
        const { value } = target;
        setMessageText(value);
    }

    // Send Message handler
    function sendMessage() {
        const now = new Date();
        const requestData = { text: messageText, date: now.getTime(), sendingUser: userData.username, receivingUser: personBeingMessaged, sendingUsersContacts: userData.contacts };
        axios.post('/users/messaging/send', requestData)
            .then(res => {
                // Update user data and messages
                axios.get(`/users/${userData.username}`)
                    .then(({ data }) => {
                        setUserData(data);
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    }


    return (
        <Container>
            <Wrapper>
                <Input type="text" value={messageText} onChange={inputHandler} />
                <UsableButton onClick={() => sendMessage()}>Send</UsableButton>
            </Wrapper>
        </Container>
    );
}
