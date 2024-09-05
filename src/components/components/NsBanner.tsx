import React from 'react';
import { Box } from '@mui/system';

export interface NsBannerProps {
    children: string | React.ReactNode;
    backgroundColor: string;
    borderColor: string;
}

export const NsBanner = ({ children, backgroundColor, borderColor }: NsBannerProps) => {
    return (
        <Box
            height={212}
            width={'100%'}
            p={2}
            sx={{
                height: '100%',
                border: `1px solid ${borderColor}`,
                fontWeight: '700',
                background: `${backgroundColor}`,
            }}
        >
            <Box
                style={{
                    display: 'block',
                    margin: '10px',
                    width: '100%',
                    fontWeight: '600',
                    fontSize: '20px',
                    float: 'left',
                    color: '#000',
                }}
            >
                {children}
            </Box>
        </Box>
    );
};
