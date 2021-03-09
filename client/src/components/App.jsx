import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
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

    /* ____Conditional Rendering____ */
    const modalRender = modalView === 'none'
        ? (<></>)
        : modalView === 'sign-up'
        ? (<SignUp setModalView={setModalView} />)
        : modalView === 'log-in'
        ? (<LogIn setModalView={setModalView} setUserData={setUserData} />)
        : (<></>);
    return (
        <Container>
            <Header userData={userData} setModalView={setModalView} />
            {modalRender}
        </Container>
    );
};
