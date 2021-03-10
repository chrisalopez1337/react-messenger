import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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
        ? (<button onClick={() => sendFriendRequest()}>Add</button>)
        : buttonType === 'yourself'
        ? (<button>Yourself</button>)
        : buttonType === 'pending'
        ? (<button>Pending</button>)
        : buttonType === 'accept'
        ? (<button onClick={() => acceptFriendRequest()}>Accept</button>)
        : buttonType === 'friends'
        ? (<button>Friends</button>)
        :(<></>);
    
    return (
        <>
            <h3>{contactInfo.username}</h3>
            {buttonRender}
        </>
    );
}
