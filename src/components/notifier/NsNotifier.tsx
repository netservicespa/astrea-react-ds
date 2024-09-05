import React, { useReducer, useEffect } from 'react';
import { MaterialDesignContent, SnackbarProvider, useSnackbar } from 'notistack';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, styled } from '@mui/material';
import { clearNotifications, pushNotification, notificationReducer, removeNotification } from './NotificationReducer';
import { INotificationContext, NotificationContext } from './NotificationContext';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';

let displayed: any[] = [];

export type NotificationKey = string | number | undefined;

export interface NsNotifierProps {
    message: string;
    children?: any;
    variant?: 'filled' | 'outlined';
    textColor?: any;
    iconColor?: any;
    type?: 'info' | 'success' | 'warning' | 'error';
}
export interface CustomIconProps {
    type?: 'error' | 'check';
    iconColor?: any;
    textColor?: any;
}
const CustomIcon: React.FC<CustomIconProps> = ({ type = 'check', iconColor, textColor }) => {
    return (
        <Box
            sx={{
                width: '26px',
                height: '26px',
                marginRight: '20px',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {type === 'check' ? (
                <CheckCircleOutlineRoundedIcon color={textColor || iconColor} />
            ) : (
                <>
                    <ErrorRoundedIcon
                        id="externalIconColor"
                        sx={{
                            width: '26px',
                            height: '26px',
                            position: 'absolute',
                            zIndex: 1,
                        }}
                    />
                    <ErrorOutlineRoundedIcon
                        id="textIconColor"
                        sx={{
                            width: '25px',
                            height: '25px',
                            position: 'absolute',
                            padding: '1px',
                            zIndex: 0,
                        }}
                    />
                </>
            )}
        </Box>
    );
};
export const NsNotifier: React.FC<NsNotifierProps> = ({
    children,
    variant = 'filled',
    type = 'info',
    textColor,
    iconColor,
    message,
}) => {
    const [state, dispatch] = useReducer(notificationReducer, {
        notifications: [],
    });
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const ctx: INotificationContext = {
        state,
        notify: (notification: any) => dispatch(pushNotification(notification)),
        dismiss: (key: NotificationKey) => dispatch(clearNotifications(key)),
        remove: (key: NotificationKey) => dispatch(removeNotification(key)),
    };
    const storeDisplayed = (id: NotificationKey) => {
        displayed = [...displayed, id];
    };

    const removeDisplayed = (id: NotificationKey) => {
        displayed = [...displayed.filter((key) => id !== key)];
    };

    const NsNotifierCustom = styled(MaterialDesignContent)(({ theme }) => ({
        '&.outlined': {
            '&.notistack-MuiContent-success': {
                '#notistack-snackbar svg': {
                    fill: `${iconColor || theme.palette.success.main} !important`,
                },
            },
            '&.notistack-MuiContent-warning': {
                '#notistack-snackbar svg#externalIconColor': {
                    fill: `${iconColor || theme.palette.focus.main} !important`,
                },
                '#notistack-snackbar svg#TextIconColor': {
                    fill: `${textColor || theme.palette.focus.main} !important`,
                },
            },
            '&.notistack-MuiContent-error': {
                '#notistack-snackbar svg': {
                    fill: `${iconColor || theme.palette.error.main} !important`,
                },
            },
            '&.notistack-MuiContent-info': {
                '#notistack-snackbar svg': {
                    fill: `${iconColor || theme.palette.success.main} !important`,
                },
            },
        },

        '&.notistack-MuiContent': {
            borderRadius: '0px',
            boxShadow: 'none',
            border: variant === 'outlined' && `1px solid ${theme.palette.borderColor.main}`,
            color: variant === 'outlined' ? textColor || theme.palette.darkTextColor.primary : '#fff',
        },
        '&.notistack-MuiContent-success': {
            backgroundColor: variant === 'filled' ? theme.palette.success.main : '#fff',
        },
        '&.notistack-MuiContent-warning': {
            backgroundColor: variant === 'filled' ? theme.palette.focus.main : '#fff',
            color: '#000',
        },
        '&.notistack-MuiContent-error': {
            backgroundColor: variant === 'filled' ? theme.palette.error.main : '#fff',
        },
        '&.notistack-MuiContent-info': {
            backgroundColor: variant === 'filled' ? theme.palette.success.main : '#fff',
        },
    }));

    useEffect(() => {
        state.notifications.forEach(({ key, messages, options = {}, dismissed = false }) => {
            if (dismissed) {
                // dismiss snackbar using notistack
                closeSnackbar(key);
                return;
            }

            // do nothing if snackbar is already displayed
            if (displayed.find((id) => id === key)) {
                return;
            }

            // display snackbar using notistack
            enqueueSnackbar(message, {
                key,
                ...options,
                action: (snackKey: any) => (
                    <IconButton onClick={() => closeSnackbar(snackKey)}>
                        <CloseIcon />
                    </IconButton>
                ),
                // ...options,
                onClose: (event: any, reason: any, myKey: any) => {
                    if (options.onClose) {
                        options.onClose(event, reason, myKey);
                    }
                },
                onExited: (event: any, myKey: any) => {
                    // remove this snackbar from redux store
                    dispatch(removeNotification(myKey));
                    removeDisplayed(myKey);
                },
            });

            // keep track of snackbars that we've displayed
            storeDisplayed(key);
        });
    }, [state.notifications, closeSnackbar, enqueueSnackbar]);

    return (
        <SnackbarProvider
            maxSnack={20}
            preventDuplicate
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            Components={{
                success: NsNotifierCustom,
                warning: NsNotifierCustom,
                error: NsNotifierCustom,
                info: NsNotifierCustom,
            }}
            iconVariant={{
                success: <CustomIcon type="check" iconColor={variant === 'filled' ? '#fff' : '#006636'} />,
                error: <CustomIcon type="error" iconColor={variant === 'filled' ? '#fff' : '#D4351C'} />,
                warning: (
                    <CustomIcon
                        type="error"
                        iconColor={variant === 'filled' ? '#fff' : '#FFE300'}
                        textColor={variant === 'filled' ? '#FFE300' : '#000'}
                    />
                ),
                info: <CustomIcon type="check" iconColor={variant === 'filled' ? '#fff' : '#006636'} />,
            }}
            className={variant === 'outlined' ? 'outlined' : 'filled'}
        >
            <NotificationContext.Provider value={ctx}>{children}</NotificationContext.Provider>
        </SnackbarProvider>
    );
};
