import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function HeaderButtons({ buttonView, setModalView }) {
    // Condtional rendering
    const buttonRender = buttonView === 'signed-out'
        ? (
            <>
                <button onClick={() => setModalView('sign-up')}>Sign Up</button>
                <button onClick={() => setModalView('log-in')}>Log In</button>
            </>
          )
        : buttonView === 'logged-in'
        ? (
            <>
                <button onClick={() => {/* logout handler here */}}>Log Out</button>
            </>
          )
        : <>Loading...</>;
    return (
        <>
            {buttonRender}
        </>
    );
};
