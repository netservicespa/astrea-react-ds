import { INsHeaderPosition } from '@/components/components/header2/NsHeader2';
import { Box, BoxProps } from '@mui/material';
import React from 'react';

export interface NsHeaderBoxProps extends BoxProps {
    nsPosition?: INsHeaderPosition;
    isMobile?: boolean;
}
export const NsHeaderBox: React.FC<NsHeaderBoxProps> = ({
    children,
    isMobile = false,
    nsPosition = {
        desktop: { level: 1, position: 'center' },
        mobile: { level: -1, position: 'center' },
    },
    sx,
    ...props
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                margin: 0,
                padding: 0,
                ...sx,
            }}
            {...props}
        >
            {children}
        </Box>
    );
};
