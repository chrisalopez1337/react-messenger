import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

export default function AddContact({ setModalView }) {
    // Field handler to search for a user in the DB.
    const [searched, setSearched] = useState('');
    // Input handler
    function inputHandler(e) {
        const { target } = e;
        const { value } = target;
        setSearched(value;)
    }

    return (
        <>
            <h1>Add Contact<h1>
        </>
    );
}
