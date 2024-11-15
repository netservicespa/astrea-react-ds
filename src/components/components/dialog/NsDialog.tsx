import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogActionsProps,
    DialogContent,
    DialogContentProps,
    DialogProps,
    DialogTitle,
    DialogTitleProps,
    Button as NsButton,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';

/**
 * Props for the NsDialogTitle component, extending MUI's DialogTitleProps.
 */
export interface NsDialogTitleProps extends DialogTitleProps {
    /**
     * If true, a close button will be displayed in the dialog title.
     * You can also pass a custom string or React node to replace the default button.
     *
     * - `true`: Displays the default close button.
     * - `string`: Displays a custom text as the close button.
     * - `ReactNode`: Allows the rendering of a custom React component.
     *
     * Default is `false`, meaning no close button will be shown.
     */
    closeButton?: boolean | string | React.ReactNode;
    /**
     * Function to control the open/close state of the dialog.
     *
     * It takes a boolean argument:
     * - `true`: Opens the dialog.
     * - `false`: Closes the dialog.
     */
    setOpen: (arg0: boolean) => void;
}

/**
 * Props for the NsDialogContent component, extending MUI's DialogContentProps.
 * This interface inherits all properties from MUI's DialogContentProps without additional custom props.
 */
export interface NsDialogContentProps extends DialogContentProps {}

/**
 * Props for the NsDialogTitle component, extending MUI's DialogTitleProps.
 */
export interface NsDialogTitleProps extends DialogTitleProps {
    /**
     * If true, a close button will be displayed in the dialog title.
     * You can also pass a custom string or React node to replace the default button.
     *
     * - `true`: Displays the default close button.
     * - `string`: Displays a custom text as the close button.
     * - `ReactNode`: Allows the rendering of a custom React component.
     *
     * Default is `false`, meaning no close button will be shown.
     */
    closeButton?: boolean | string | React.ReactNode;

    /**
     * Function to control the open/close state of the dialog.
     *
     * It takes a boolean argument:
     * - `true`: Opens the dialog.
     * - `false`: Closes the dialog.
     */
    setOpen: (arg0: boolean) => void;
}

/**
 * Props for the NsdialogActions component, extending MUI's DialogActionsProps.
 */
export interface NsDialogActionsProps extends DialogActionsProps {
    /**
     * Determines if a cancel button should be displayed in the dialog actions.
     * You can pass:
     * - `true`: Displays the default cancel button.
     * - `string`: Displays a custom label as the cancel button.
     * - `ReactNode`: Allows rendering of a custom React component as the cancel button.
     *
     * Default is `false`, meaning no cancel button will be shown.
     */
    showCancelButton?: boolean | string | React.ReactNode;

    /**
     * Determines if a submit button should be displayed in the dialog actions.
     * You can pass:
     * - `true`: Displays the default submit button.
     * - `string`: Displays a custom label as the submit button.
     * - `ReactNode`: Allows rendering of a custom React component as the submit button.
     *
     * Default is `false`, meaning no submit button will be shown.
     */
    showSubmitButton?: boolean | string | React.ReactNode;

    /**
     * Function to control the open/close state of the dialog.
     *
     * It takes a boolean argument:
     * - `true`: Opens the dialog.
     * - `false`: Closes the dialog.
     */
    setOpen: (arg0: boolean) => void;
}
/**
 * Props for the NsdialogV3 component, extending MUI's DialogProps.
 */
export interface NsDialogProps extends DialogProps {
    /**
     * If true, a close button will be displayed in the dialog title.
     * You can also pass a custom string or React node to replace the default button.
     *
     * - `true`: Displays the default close button.
     * - `string`: Displays a custom text as the close button.
     * - `ReactNode`: Allows the rendering of a custom React component.
     *
     * Default is `false`, meaning no close button will be shown.
     */
    closeButton?: boolean | string | React.ReactNode;

    /**
     * Function to control the open/close state of the dialog.
     *
     * It takes a boolean argument:
     * - `true`: Opens the dialog.
     * - `false`: Closes the dialog.
     */
    setOpen: (open: boolean) => void;
}

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
