import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { setOne, getOne, deleteOne } from 'local-js';
// Child components
import Header from './Header.jsx';
import SignUp from './SignUp.jsx';
import LogIn from './LogIn.jsx';
import ContactsBar from './ContactsBar.jsx';
import AddContact from './AddContact.jsx';
import ContactDropdown from './ContactDropdown.jsx';

// Main container
const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export default function App() {
    // Hold the user that is currently logged in, currently no data but will mount info here.
    const [userData, setUserData] = useState(null);

    // Modal view handler
    const [modalView, setModalView] = useState('contact-list');

    // Log in handler
    function logIn(data) {
        const { username } = data;
        // Persist data into localStorage
        const key = 'logged-in';
        setOne(key, username);
        // Update userData in state
        setUserData(data);
    }

    // Log out Handler
    function logOut() {
        // Delete user from localStorage
        const key = 'logged-in';
        deleteOne(key);
        // Remove user data
        setUserData(null);
        // Clear modal view
        setModalView('none');
    }


    // User mounting if they are already logged in
    useEffect(() => {
        // Retrieve localStorage data
        const key = 'logged-in';
        const storedUsername = getOne(key);
        if (storedUsername && userData === null) {
            // Fetch user data
            axios.get(`/users/${storedUsername}`)
                .then(({ data }) => logIn(data))
                .catch(err => console.log(err));
        }
    }, []);

    /* _____Conditional Rendering____ */
    const modalRender = modalView === 'none'
        ? (<></>)
        : modalView === 'sign-up'
        ? (<SignUp setModalView={setModalView} />)
        : modalView === 'log-in'
        ? (<LogIn setModalView={setModalView} logIn={logIn} />)
        : modalView === 'add-contact'
        ? (<AddContact setModalView={setModalView} setUserData={setUserData} userData={userData}/>)
        : modalView == 'contact-list'
        ? (<ContactDropdown userData={userData} setModalView={setModalView} setUserData={setUserData}/>)
        : (<></>);
    return (
        <Container>
            <Header userData={userData} setModalView={setModalView} logOut={logOut} />
            {modalRender}
            <ContactsBar setModalView={setModalView} userData={userData} /> 
        </Container>
    );
};
