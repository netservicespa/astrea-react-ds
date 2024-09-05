import React, { CSSProperties } from 'react';
import { styled } from '@mui/material';
import { Box } from '@mui/material';

const NeedHelpStyled = styled(Box)(({ theme }) => ({
    background: '#f0f0f0',
    padding: '30px',
}));

export const NeedHelp = ({}) => {
    return (
        <NeedHelpStyled>
            <h1>Need help?</h1>
            <p>
                If you’ve got a question about Astrea Design System, send an email to{' '}
                <a href="mailto:teamux@netservice.eu">teamux@netservice.eu</a>
            </p>
        </NeedHelpStyled>
    );
};
