import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

export interface PanelProps {
    type?: 'primary' | 'secondary';
    title: string;
    children: React.ReactNode;
    menu?: boolean;
    isOpen?: boolean;
    handleOpen: () => any;
}
const StyledCard = styled(Card)<any>(({ theme, type }) => ({
    border: '1px solid',
    borderColor: '#b1b4b6',
    boxSizing: 'border-box',
    boxShadow: 'none',
    borderRadius: '0px',
    height: '100%',
}));

export const NsPanel = ({
    menu = false,
    type = 'primary',
    title,
    children,
    handleOpen: onClose,
    isOpen = true,
}: PanelProps) => {
    const { t } = useTranslation();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <StyledCard type={type}>
            <Box display="flex" flexDirection="row" sx={{ height: '100%' }}>
                {menu && (
                    <Box
                        sx={{
                            padding: '10px',
                            flexGrow: 1,
                            flexDirection: 'column',
                            background: isHovered ? '#9c9fa1' : '#b1b4b6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            maxWidth: '40px',
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={onClose}
                    >
                        {isOpen ? (
                            <>
                                <CloseIcon fontWeight={isHovered ? 'bold' : 'normal'} />
                                <Typography fontWeight={isHovered ? 'bold' : 'normal'}>{t('panel.close')}</Typography>
                            </>
                        ) : (
                            <>
                                <ArrowLeftIcon fontWeight={isHovered ? 'bold' : 'normal'} />
                                <Typography fontWeight={isHovered ? 'bold' : 'normal'}>{t('panel.open')}</Typography>
                            </>
                        )}
                    </Box>
                )}
                {isOpen && (
                    <Card
                        sx={{
                            borderRadius: '0px',
                            backgroundColor: type === 'secondary' ? '#2e5a6019' : undefined,
                        }}
                    >
                        <CardContent>
                            <Typography variant={'h3'} fontWeight={900} gutterBottom>
                                {title}
                            </Typography>

                            {children}
                        </CardContent>
                    </Card>
                )}
            </Box>
        </StyledCard>
    );
};
