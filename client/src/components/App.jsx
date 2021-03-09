import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// Child components
import Header from './Header.jsx';

// Main container
const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export default function App() {
    // Hold the user that is currently logged in, currently no data but will mount info here.
    const [userData, setUserData] = useState(null);
    return (
        <Container>
            <Header userData={userData} />
        </Container>
    );
};
