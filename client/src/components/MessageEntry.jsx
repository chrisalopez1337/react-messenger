import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const MessageOuterWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: row;
    width: 95%;
`;

const MessageFromYou = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
`;

const MessageToYou = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
`;

const MessageBubbleSent = styled.div`
    display: flex;
    background-color: blue;
    padding: 10px;
    border-radius: 7px;
    color: white;
`;

const MessageBubbleReceived = styled.div`
    display: flex;
    background-color: #7b2ca8;
    padding: 10px;
    border-radius: 7px;
    color: white;
`;

export default function MessageEntry({ userData, message }) {
    const { to, from, text, date } = message;

    const messageRender = from === userData.username
        ? (
            <MessageFromYou>
                <MessageBubbleSent>
                    {text}
                </MessageBubbleSent>
            </MessageFromYou>
          )
        : (
            <MessageToYou>
                <MessageBubbleReceived>
                    {text}
                </MessageBubbleReceived>
            </MessageToYou>
          );

    return (
        <MessageOuterWrapper>
            {messageRender}
        </MessageOuterWrapper>
    );
}
