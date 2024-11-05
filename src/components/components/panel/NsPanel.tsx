import React, { useState } from 'react';
import { Card, CardContent, Typography, SxProps, Theme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { PanelProps } from 'src/util/types';

export const NsPanel = ({
    menu = false,
    type = 'primary',
    title,
    subtitle,
    children,
    handleOpen,
    button,
    isOpen = true,
    ...rest
}: PanelProps) => {
    const { t } = useTranslation();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                border: '1px solid',
                borderColor: '#b1b4b6',
                margin: '0px !important',
                boxSizing: 'border-box',
                boxShadow: 'none',
                borderRadius: '0px',
                display: 'flex',
                flexDirection: 'row',
                ...rest,
            }}
        >
            {menu && (
                <Box
                    sx={{
                        flexGrow: 1,
                        flexDirection: 'column',
                        background: isHovered ? '#9c9fa1' : '#b1b4b6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        maxWidth: '40px',
                        minWidth: '40px',
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={handleOpen}
                >
                    <Typography fontWeight={isHovered ? 'bold' : 'normal'}>
                        {isOpen ? (
                            <>
                                {typeof button !== 'boolean' ? (
                                    <CloseIcon fontWeight={isHovered ? 'bold' : 'normal'} />
                                ) : (
                                    button
                                )}
                            </>
                        ) : (
                            <>
                                {typeof button !== 'boolean' ? (
                                    <ArrowLeftIcon fontWeight={isHovered ? 'bold' : 'normal'} />
                                ) : (
                                    button
                                )}
                            </>
                        )}
                    </Typography>
                </Box>
            )}
            {isOpen && (
                <Box
                    sx={{
                        borderRadius: '0px',
                        margin: 0,
                        backgroundColor: type === 'secondary' ? '#2e5a6019' : undefined,
                    }}
                >
                    <CardContent>
                        {title && (
                            <Typography variant={'h3'} fontWeight={900} gutterBottom>
                                {title}
                            </Typography>
                        )}
                        {subtitle && (
                            <Typography variant={'h4'} fontWeight={400}>
                                {subtitle}
                            </Typography>
                        )}
                        <Box component="div" mt={title || subtitle ? 3 : 0}>
                            {children}
                        </Box>
                    </CardContent>
                </Box>
            )}
        </Box>
    );
};
