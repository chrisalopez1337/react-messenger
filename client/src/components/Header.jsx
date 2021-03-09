import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

export default function Header({ userData }) {
    // View change for buttons
    const [buttonView, setButtonView] = useState('signed-out');
    // Event handler for button view
    useEffect(() => {
        if (userData) {
            setButtonView('logged-in');
        } else {
            setButtonView('signed-out');
        }
    }, [userData]);

    // View change for the sign up and sign in modals
    const [modalView, setModalView] = useState('none');

    return (
        <>
            <h1>React-Messenger</h1>
        </>
    );
}
