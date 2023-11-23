import React from 'react';
import Modal from '@mui/material/Modal';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import { NsButton } from './NsButton';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

export interface NsModalProps {
	title: string;
	content: string | React.ReactNode;
    onConfirm?: () => void;
    showCancelButton?: boolean;
    showConfirmButton?: boolean;
    fullScreen?: boolean;
    useDrawer?: boolean;
    drawerPosition?: 'left' | 'right' | 'top' | 'bottom';
    drawerProps?: Omit<DrawerProps, 'open' | 'onClose'>;
	otherProps?: React.ComponentProps<typeof Modal>;
    externalOpen?: boolean;
    openFromParent?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
}

const boxStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
};
const StyledModalContent = styled(Box)({
	padding: '1rem',
});

const StyledModalActions = styled(Box)({
	marginTop: '1rem', 
    display: 'flex', 
    justifyContent: 'space-between',
    backgroundColor: '#ebefef',
    padding: '10px',
});
const closeLinkStyle = {
    position: 'absolute' as 'absolute',
    top: '10px',
    right: '14px',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: '1rem !important'
};

/* FULLSCREEN */
const fullScreenStyle = {
    width: '100%',
    height: '100%',
    top: '0%',
    left: '0%',
    transform: 'none',
    overflow: 'auto',
    backgroundColor: 'white',
};
const fullScreenHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'white',
    padding: '1rem',
};
const fullScreenActionsStyle = {
    display: 'flex',
    gap: '1rem',
};

/* DRAWER */
const drawerStyle = {
    width: '400px', 
    maxWidth: '100%',
};

export const NsModal: React.FC<NsModalProps> = ({
	title,
	content,
    onConfirm,
    showCancelButton,
    showConfirmButton,
    fullScreen,
    useDrawer = false,
    drawerPosition = 'right',
    drawerProps,
	otherProps,
    externalOpen,
    openFromParent = false, 
    onOpen = () => {}, 
    onClose = () => {}
}) => {
    const [internalOpen, setInternalOpen] = React.useState(false);

    const isOpen = openFromParent ? (externalOpen ?? false) : internalOpen;

    const handleOpen = () => {
        if (!openFromParent) {
            setInternalOpen(true);
        }
        onOpen();
    };

    const handleClose = () => {
        if (!openFromParent) {
            setInternalOpen(false);
        }
        onClose();
    };

    const handleConfirm = () => {
        onConfirm?.();
        handleClose();
    };

    const {t} = useTranslation();
	const renderContent = () => (
        <>
            {fullScreen ? (
                <>
                    <Box sx={fullScreenHeaderStyle}>
                        <Typography variant="h1" component="h2">{title}</Typography>
                        {(showCancelButton || showConfirmButton) && (
                            <Box sx={fullScreenActionsStyle}>
                                {showCancelButton && <NsButton onClick={handleClose} color="secondary" size="small">{t('modal.buttons.cancel')}</NsButton>}
                                {showConfirmButton && <NsButton onClick={handleConfirm} color="primary" size="small">{t('modal.buttons.confirm')}</NsButton>}
                            </Box>
                        )}
                    </Box>
                    <StyledModalContent>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>{content}</Typography>
                    </StyledModalContent>
                </>
            ) : (
                <>
                    <Typography component="a" sx={closeLinkStyle} onClick={handleClose}>{t('modal.close')}</Typography>
                    <StyledModalContent>
                        <Typography id="modal-modal-title" variant="h1" component="h2">{title}</Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>{content}</Typography>
                    </StyledModalContent>
                </>
            )}

            {!fullScreen && (showCancelButton || showConfirmButton) && (
                <StyledModalActions>
                    {showCancelButton && <NsButton onClick={handleClose} color="secondary" size="small" sx={{ mr: 1 }}>{t('modal.buttons.cancel')}</NsButton>}
                    {showConfirmButton && <NsButton onClick={handleConfirm} color="primary" size="small">{t('modal.buttons.confirm')}</NsButton>}
                </StyledModalActions>
            )}
        </>
    );

    if (useDrawer) {
        return (
            <div>
                {!openFromParent && (<NsButton onClick={handleOpen}>Open</NsButton>)}
                <Drawer
                    anchor={drawerPosition}
                    open={isOpen}
                    onClose={handleClose}
                    {...drawerProps}
                >
                    <Box sx={drawerStyle}>
                        {renderContent()}
                    </Box>
                </Drawer>
            </div>
        );
    }

    return (
        <div>
            {!openFromParent && (<NsButton onClick={handleOpen}>Open modal</NsButton>)}
            <Modal
                open={isOpen ?? false}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                {...otherProps}
            >
                <Box sx={fullScreen ? fullScreenStyle : boxStyle}>{renderContent()}</Box>
            </Modal>
        </div>
    );
}