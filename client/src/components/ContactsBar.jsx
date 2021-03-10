import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// Children Components
import ContactEntry from './ContactEntry.jsx';

export default function ContactsBar({ userData }) {
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


    return (
        <>
            <h1>Contacts</h1>
            { contacts.map(contactInfo => <ContactEntry contactInfo={contactInfo} />) }
        </>
    );
}
