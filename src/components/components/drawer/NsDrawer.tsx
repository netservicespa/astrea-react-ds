import React from 'react';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Box, Button as NsButton, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useTranslation } from 'react-i18next';

export interface NsDrawerProps extends Omit<DrawerProps, 'content'> {
    title: string;
    content: string | React.ReactNode;
    onConfirm?: () => void;
    showCancelButton?: boolean;
    showConfirmButton?: boolean;
    drawerType?: 'anchor' | 'swipeable' | 'responsive';
    drawerPosition?: 'left' | 'right' | 'top' | 'bottom';
    width?: string | number;
}

const DrawerContent = styled(Box)(({ theme }) => ({
    width: '400px',
    maxWidth: '100%',
    padding: theme.spacing(2),
}));

export const NsDrawer: React.FC<NsDrawerProps> = ({
    title,
    content,
    onConfirm,
    showCancelButton = true,
    showConfirmButton = true,
    drawerType = 'anchor',
    drawerPosition = 'right',
    width = '400px',
    onClose,
    ...drawerProps
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { t } = useTranslation();

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => {
        setIsOpen(false);
        onClose?.({}, 'backdropClick');
    };

    const handleConfirm = () => {
        onConfirm?.();
        handleClose();
    };

    const renderDrawerContent = () => (
        <DrawerContent sx={{ width }}>
            <Typography variant="h6">{title}</Typography>
            <Box mt={2}>{content}</Box>
            <Box mt={2} display="flex" justifyContent="space-between">
                {showCancelButton && (
                    <NsButton onClick={handleClose} color="secondary">
                        {t('modal.buttons.cancel')}
                    </NsButton>
                )}
                {showConfirmButton && (
                    <NsButton onClick={handleConfirm} color="primary">
                        {t('modal.buttons.confirm')}
                    </NsButton>
                )}
            </Box>
        </DrawerContent>
    );

    if (drawerType === 'swipeable') {
        return (
            <SwipeableDrawer
                anchor={drawerPosition}
                open={isOpen}
                onClose={handleClose}
                onOpen={handleOpen}
                {...drawerProps}
            >
                {renderDrawerContent()}
            </SwipeableDrawer>
        );
    }

    return (
        <Drawer
            anchor={drawerPosition}
            open={isOpen}
            onClose={handleClose}
            {...drawerProps}
        >
            {renderDrawerContent()}
        </Drawer>
    );
};