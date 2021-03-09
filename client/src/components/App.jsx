import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { setOne, getOne, deleteOne } from 'local-js';
// Child components
import Header from './Header.jsx';
import SignUp from './SignUp.jsx';
import LogIn from './LogIn.jsx';

// Main container
const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export default function App() {
    // Hold the user that is currently logged in, currently no data but will mount info here.
    const [userData, setUserData] = useState(null);

    // Modal view handler
    const [modalView, setModalView] = useState('none');

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

    /* ____Conditional Rendering____ */
    const modalRender = modalView === 'none'
        ? (<></>)
        : modalView === 'sign-up'
        ? (<SignUp setModalView={setModalView} />)
        : modalView === 'log-in'
        ? (<LogIn setModalView={setModalView} logIn={logIn} />)
        : (<></>);
    return (
        <Container>
            <Header userData={userData} setModalView={setModalView} logOut={logOut} />
            {modalRender}
        </Container>
    );
};
