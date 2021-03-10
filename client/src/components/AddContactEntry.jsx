import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const EntryContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`;

const EntryWrapper = styled.div`
    border: 2px solid #883ef0;
    border-radius: 7px;
    padding: 4px;
    margin: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    min-width: 400px;
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

const DeadButton = styled.div`
    border: 2px solid gray;
    font-family: inherit;
    font-size: 16px;
    border-radius: 7px;
    background-color: transparent;
    padding: 4px;
    color: gray;
`;


export default function AddContactEntry({ contactInfo, userData, setUserData }) {
    // Store the button type to render
    const [buttonType, setButtonType] = useState(null);

    // Mount button type on load or on user data change
    useEffect(() => {
        const loggedInUsersContacts = userData.contacts;
        const searchedUser = contactInfo.username;

        // First check if the user being searched is the logged in user
        if (userData.username === searchedUser) {
            setButtonType('yourself');
        } else {
            // Check if the user is already in the contacts
            let singleContactInfo = false;
            for (let i = 0; i < loggedInUsersContacts.length; i++) {
                const singleContact = loggedInUsersContacts[i];
                if (singleContact.username === searchedUser) {
                    // Found the user
                    singleContactInfo = singleContact;
                }
            }
            if (!singleContactInfo) {
                // There isnt a match
                setButtonType('add');
            } else {
                // There is a match, check the type
                if (singleContactInfo.friend_status === 'outbound') {
                    setButtonType('pending');
                } else if (singleContactInfo.friend_status === 'inbound') {
                    setButtonType('accept');
                } else if (singleContactInfo.friend_status === 'friends') {
                    setButtonType('friends');
                }
            }
        }
    }, [userData]);

    // Send friend request handler
    function sendFriendRequest() {
        const requestData = { userSending: userData.username, userRecieving: contactInfo.username, userSendingContacts: userData.contacts };
        // Update user info
        axios.post('/users/friend-request/send', requestData)
            .then(res => {
                // Fetch new user info and update
                axios.get(`/users/${userData.username}`)
                    .then(({ data }) => setUserData(data))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

    // Accept friend request handler
    function acceptFriendRequest() {
        const requestData = { userAccepting: userData.username, userThatSent: contactInfo.username, userAcceptingContacts: userData.contacts};
        // Update user info
        axios.post('/users/friend-request/accept', requestData)
            .then(res => {
                // Now Fetch users new info and update
                axios.get(`/users/${userData.username}`)
                    .then(({ data }) => setUserData(data))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

    /* _____Conditional rendering for button_____ */
    const buttonRender = buttonType === 'add'
        ? (<UsableButton onClick={() => sendFriendRequest()}>Add</UsableButton>)
        : buttonType === 'yourself'
        ? (<DeadButton>Yourself</DeadButton>)
        : buttonType === 'pending'
        ? (<DeadButton>Pending</DeadButton>)
        : buttonType === 'accept'
        ? (<UsableButton onClick={() => acceptFriendRequest()}>Accept</UsableButton>)
        : buttonType === 'friends'
        ? (<DeadButton>Friends</DeadButton>)
        :(<></>);
    
    return (
        <EntryContainer>
            <EntryWrapper>
                <h3>{contactInfo.username}</h3>
                {buttonRender}
            </EntryWrapper>
        </EntryContainer>
    );
}
