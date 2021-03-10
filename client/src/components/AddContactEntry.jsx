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
        // First check if the username searched is the one logged in
        if (loggedInUsername === contactInfo.username) {
            setButtonType('yourself');
        } else {
            // Check if that friend exists in their contacts
            let match = null;
            for (let i = 0; i < searchedUsersContacts.length; i++) {
                const singleContact = searchedUsersContacts[i];
                // Define relevant data
                const singleContactUsername = singleContact.username;
                const singleContactRequest = singleContact.request;
                // If they do exist add them to match
                if (singleContactUsername === contactInfo.username) {
                    match = singleContactRequest;
                }
            }
            // See if we found a user or not
            if (match) {
                // We found a user
                setButtonType(match);
            } else {
                setButtonType('add');
            }
        }

    }, []);

    /* _____Conditional rendering for button_____ */
    const buttonRender = buttonType === 'add'
        ? (<button>Add</button>)
        : buttonType === 'yourself'
        ? (<button>Yourself</button>)
        : buttonType === 'pending'
        ? (<button>Pending</button>)
        :(<></>);
    
    return (
        <>
            <h3>{contactInfo.username}</h3>
            {buttonRender}
        </>
    );
}
