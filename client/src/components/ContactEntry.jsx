import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const EntryContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`;

const EntryWrapper = styled.div`
    border: 2px solid #883ef0;
    border-radius: 7px;
    padding: 4px;
    margin: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    min-width: 400px;
`;

const UsableButton = styled.div`
    border: 2px solid #883ef0;
    font-family: inherit;
    font-size: 16px;
    border-radius: 7px;
    background-color: transparent;
    padding: 4px;
    transition-duration: 0.2s;
    &:hover {
        color: white;
        background-color: #883ef0;
    }
`;

export default function ContactEntry({ contactInfo, setModalView }) {
    const { username } = contactInfo;
    return (
        <EntryContainer>
            <EntryWrapper>
                <h3>{contactInfo.username}</h3>
                <UsableButton onClick={() => console.log('hi')}>Message</UsableButton>
            </EntryWrapper>
        </EntryContainer>
    );
}
