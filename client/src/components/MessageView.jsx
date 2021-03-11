import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 2px solid #883ef0;
    margin: 10px;
    padding: 10px;
    border-radius: 7px;
    min-width: 90%;
`;

export default function MessageView({ userData, currentMessages }) {
    console.log(currentMessages);
    return (
        <Container>
            <Wrapper>
                <h2>Messages</h2>
            </Wrapper>
        </Container>
    )
}
