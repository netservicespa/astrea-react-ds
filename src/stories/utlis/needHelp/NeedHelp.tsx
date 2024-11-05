import React from 'react';
import { styled } from '@mui/material';
import { Box } from '@mui/material';

const NeedHelpStyled = styled(Box)(() => ({
    padding: '30px',
}));

export const NeedHelp = ({}) => {
    return (
        <NeedHelpStyled className="need-help">
            <h1>Need help?</h1>
            <p>
                If you’ve got a question about Astrea Design System, send an email to{' '}
                <a href="mailto:teamux@netservice.eu">teamux@netservice.eu</a>
            </p>
        </NeedHelpStyled>
    );
};
