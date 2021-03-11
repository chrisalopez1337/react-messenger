import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const MainWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`;


export default function ContactEntry({ contactInfo }) {
    const { username } = contactInfo;
    return (
        <MainWrapper>
            <p>{username}</p>
        </MainWrapper>
    );
}
