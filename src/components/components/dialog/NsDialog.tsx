import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button as NsButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { NsDialogActionsProps, NsDialogContentProps, NsDialogProps, NsDialogTitleProps } from 'src/util/types';

export const NsDialogTitle: React.FC<NsDialogTitleProps> = ({
    title,
    children,
    closeButton = false,
    setOpen,
    ...rest
}) => {
    const theme = useTheme();
    return (
        <DialogTitle {...rest}>
            {children ? children : <Typography variant="h1">{title}</Typography>}
            {closeButton && (
                <Typography
                    sx={{
                        position: 'absolute',
                        top: '10px',
                        right: '14px',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        color: theme.palette.primary.main,
                    }}
                    onClick={() => setOpen(false)}
                >
                    {typeof closeButton === 'boolean' ? 'x' : closeButton}
                </Typography>
            )}
        </DialogTitle>
    );
};

export const NsDialogContent: React.FC<NsDialogContentProps> = ({ children, ...rest }) => {
    const theme = useTheme();
    return <DialogContent {...rest}>{children}</DialogContent>;
};
export const NsDialogActions: React.FC<NsDialogActionsProps> = ({
    children,
    showCancelButton,
    showSubmitButton,
    setOpen,
    ...rest
}) => {
    const theme = useTheme();
    return (
        <>
            {children ? (
                <DialogActions {...rest}>{children}</DialogActions>
            ) : (
                (showCancelButton || showSubmitButton) && (
                    <DialogActions {...rest} sx={{ padding: '0px' }}>
                        <Box
                            sx={{
                                marginTop: '1rem',
                                display: 'flex',
                                justifyContent: showCancelButton !== true ? 'flex-end' : 'space-between',
                                backgroundColor: '#ebefef',
                                width: '100% !important',
                                padding: '8px',
                            }}
                        >
                            {showCancelButton && (
                                <NsButton
                                    onClick={() => setOpen(false)}
                                    color="secondary"
                                    size="small"
                                    variant="contained"
                                    sx={{ mr: 1 }}
                                >
                                    {typeof showCancelButton === 'boolean' ? 'Close' : showCancelButton}
                                </NsButton>
                            )}
                            {showSubmitButton && (
                                <NsButton type="submit" color="primary" size="small" variant="contained" sx={{ ml: 1 }}>
                                    {typeof showSubmitButton === 'boolean' ? 'Confirm' : showSubmitButton}
                                </NsButton>
                            )}
                        </Box>
                    </DialogActions>
                )
            )}
        </>
    );
};
export const NsDialog: React.FC<NsDialogProps> = ({
    open = false,
    children,
    setOpen,
    maxWidth = 'xs',
    fullWidth = true,
    scroll = 'body',
    fullScreen = false,
    ...rest
}) => {
    const theme = useTheme();

    return (
        <Dialog
            {...rest}
            open={open}
            onClose={() => setOpen(false)}
            scroll={scroll}
            maxWidth={maxWidth}
            fullWidth={fullWidth}
            fullScreen={fullScreen}
        >
            {children}
        </Dialog>
    );
};
