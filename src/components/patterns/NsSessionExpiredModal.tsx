import React from 'react';
import { Modal, Button, Box, Typography, useTheme } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useTranslation } from 'react-i18next';

export interface NsSessionExpiredModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRefreshSession: () => void;
    children: React.ReactNode;
}

export const NsSessionExpiredModal: React.FC<NsSessionExpiredModalProps> = ({
    isOpen,
    onClose,
    onRefreshSession,
    children,
}) => {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            style={{
                display: 'block',
                width: '600px',
                margin: '0 auto',
                border: '0px',
                position: 'absolute',
                top: '20%',
            }}
        >
            <Box style={{ padding: '20px', height: '400px', background: '#fff' }}>
                <Box style={{ textAlign: 'left' }}>
                    <AccessTimeIcon style={{ fontSize: '100px', color: '#000' }} />
                </Box>
                <Typography variant="h1" component="h1">
                    {t('modal.session.expired.title')}
                </Typography>
                {children}
                <Box style={{ float: 'left', marginTop: '40px' }}>
                    <Button style={{ marginRight: '20px' }} variant="outlined" color="primary" onClick={onClose}>
                        {t('modal.session.expired.button.logout')}
                    </Button>
                    <Button
                        style={{
                            border: `1px solid ${theme.palette.primary.main}`,
                        }}
                        variant="contained"
                        color="primary"
                        onClick={onRefreshSession}
                    >
                        {t('modal.session.expired.button.refreshSession')}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};
