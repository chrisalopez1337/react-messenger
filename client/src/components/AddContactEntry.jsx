import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

export default function AddContactEntry({ contactInfo, userData, setUserData }) {
    // Store the button type to render
    const [buttonType, setButtonType] = useState(null);

    // Mount button type on load or on user data change
    useEffect(() => {
        const searchedUsersContacts = contactInfo.contacts;
        const loggedInUsername = userData.username;

        // First find if the user exists in the contacts list already.
        searchedUsersContacts.forEach(obj => {
            const { username, request } = obj;
            // If the username is in there contacts
            if (username === loggedInUsername) {
                // Check if they are already friends
                if (request === 'confirmed') {
                    // They are friends render a already friends button
                    setButtonType('friends');
                    return;
                } else if (request === 'pending') {
                    // The user already has a friend request sent to them
                    setButtonType('pending');
                    return;
                }
            }
        });
        
        // Else if the username is not in there contacts
        setButtonType('add');
    }, [userData]);

    /* _____Conditional rendering for button_____ */
    const buttonRender = buttonType === 'add'
        ? (<button>Add</button>)
        : (<></>);
    
    return (
        <>
            <h3>{contactInfo.username}</h3>
            {buttonRender}
        </>
    );
}
