import React from 'react';
import { Box, BoxProps } from '@mui/material';

export interface NsHeaderLogoProps extends BoxProps {
    isMobile?: boolean;
}
export const NsHeaderLogo: React.FC<NsHeaderLogoProps> = ({
    children,
    isMobile = false,

    sx,
    ...props
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                padding: 0,
                margin: 0,
                maxHeight: isMobile ? '40px' : '80px',
                ...sx,
            }}
            {...props}
        >
            {children}
        </Box>
    );
};
