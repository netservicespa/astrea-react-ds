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
    children?: any;
    variant?: 'filled' | 'outlined';
    textColor?: any;
    iconColor?: any;
    anchorOrigin?: { horizontal: 'left' | 'right' | 'center'; vertical: 'bottom' | 'top' };
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
                    {/* <ErrorOutlineRoundedIcon
                        id="textIconColor"
                        sx={{
                            width: '25px',
                            height: '25px',
                            position: 'absolute',
                            padding: '1px',
                            zIndex: 0,
                        }}
                    /> */}
                </>
            )}
        </Box>
    );
};
export const NsNotifier: React.FC<NsNotifierProps> = ({
    children,
    variant = 'filled',
    textColor,
    iconColor,
    anchorOrigin = { horizontal: 'right', vertical: 'top' },
}) => {
    const [state, dispatch] = useReducer(notificationReducer, {
        notifications: [],
    });
    const ctx: INotificationContext = {
        state,
        notify: (notification: any) => dispatch(pushNotification(notification)),
        dismiss: (key: NotificationKey) => dispatch(clearNotifications(key)),
        remove: (key: NotificationKey) => dispatch(removeNotification(key)),
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

    return (
        <SnackbarProvider
            maxSnack={20}
            preventDuplicate
            anchorOrigin={anchorOrigin}
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
