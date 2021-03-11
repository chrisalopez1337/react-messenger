import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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
        <>
            <input type="text" value={messageText} onChange={inputHandler} />
            <button onClick={() => sendMessage()}>Send</button>
        </>
    );
}
