import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// Children component 
import AddContactEntry from './AddContactEntry.jsx';

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

export default function AddContact({ setModalView, setUserData, userData }) {
    // Field handler to search for a user in the DB.
    const [searchTerm, setSearchedTerm] = useState('');

    // Contacts the user searched for
    const [contacts, setContacts] = useState([]);

    // Input handler
    function inputHandler(e) {
        const { target } = e;
        const { value } = target;
        setSearchedTerm(value);
    }
    
    // Search handler
    useEffect(() => {
        // Search for data in the DB
        axios.get(`/users/search/${searchTerm}`)
            .then(({ data }) => setContacts(data))
            .catch(err => console.error(err));
    }, [searchTerm])


    return (
        <Container>
            <SearchWrapper>
                <Row>
                    <h2>Add Contact: </h2>
                    <SearchBar value={searchTerm} onChange={inputHandler}/>
                </Row>
            {/* map over contacts */}
            {  contacts.length > 0 ? contacts.map(contactInfo => (<AddContactEntry contactInfo={contactInfo} setUserData={setUserData} userData={userData} /> )) : null}
            </SearchWrapper>
        </Container>
    );
}
