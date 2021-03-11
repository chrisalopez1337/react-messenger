import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// Children components
import ContactEntry from './ContactEntry.jsx';

// Main container to center module
const Container = styled.div`
    dispaly: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 99;
`;

// Wrapper for the search results
const SearchWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border: 2px solid #883ef0;
    border-radius: 7px;
    padding: 10px;
    margin: 10px;
    align-items: center;
    justify-content: center;
`;

const SearchBar = styled.input`
    padding: 5px;
    font-size: 16px;
    background-color: transparent;
    border: 2px solid #883ef0;
    border-radius: 7px;
    font-family: inherit;
    margin-left: 7px;
    margin-right: 7px;
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

export default function ContactDropdown({ userData, setUserData, setModalView }) {
 // Field handler to search for a user in the DB.
    const [searchTerm, setSearchedTerm] = useState('');

    // Contacts the user searched for
    const [contacts, setContacts] = useState([]);

    // Mount users contacts
    useEffect(() => {
        if (!userData) {
            setContacts([]);
        } else {
            setContacts(userData.contacts);
        }
    }, [userData]);

    // Input handler
    function inputHandler(e) {
        const { target } = e;
        const { value } = target;
        setSearchedTerm(value);
    }
    
    // Search handler
    useEffect(() => {
        if (searchTerm === '' && userData) {
            setContacts(userData.contacts);
        } else if (!userData) {
            setContacts([]);
        } else {
            // Search for data in the DB
            axios.get(`/users/search/${searchTerm}`)
                .then(({ data }) => setContacts(data))
                .catch(err => console.error(err));
        }
    }, [searchTerm]);
    
    return (
        <Container>
            <SearchWrapper>
                <Row>
                    <h3>Your Contacts:</h3>
                    <SearchBar value={searchTerm} onChange={inputHandler} />
                    <CloseButton onClick={() => setModalView('none')}>Close</CloseButton>
                </Row>
                { /* map over contacts */ }
                { contacts.map(contactInfo => (<ContactEntry contactInfo={contactInfo} userData={userData} setModalView={setModalView} />)) }
            </SearchWrapper>
        </Container>
    );
}
