import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// Children Components
import ContactEntry from './ContactEntry.jsx';


const MainWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Row = styled.div`
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

export default function ContactsBar({ userData, setModalView }) {
    // Hold a users contact
    const [contacts, setContacts] = useState([]);

    // Load contacts on mount, or on change
    useEffect(() => {
        if (userData) {
            const userContacts = userData.contacts;
            setContacts(userData.contacts);
        } else {
            setContacts([]);
        }
    }, [userData]);


    /* ___Conditional Rendering for button____ */
    const buttonRender = userData
        ? (<Button onClick={() => setModalView('add-contact')}>Add Contacts</Button>)
        : (<Button onClick={() => setModalView('sign-up')}>Create account to add contacts</Button>);


    return (
        <MainWrapper>
            <Row>
                <h2>Contacts</h2>
                {buttonRender}
            </Row>
            { contacts.map(contactInfo => <ContactEntry contactInfo={contactInfo} />) }
        </MainWrapper>
    );
}
