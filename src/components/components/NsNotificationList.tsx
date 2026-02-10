import React, { ReactElement } from 'react';
import styled from '@emotion/styled';
import { Pagination, Grid, Button, useTheme, Box } from '@mui/material';
import { useState } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useTranslation } from 'react-i18next';

export type Notification = {
    id: string;
    date?: string;
    title?: string;
    description?: string;
    readNotification: boolean;
    color?: 'primary' | 'secondary' | 'success' | 'error';
};

export type NsNotificationListProps = {
    notifications: Notification[];
    typeNotification: 'basic' | 'classic';
    maxRowsPerPage?: number;
    color?: 'primary' | 'secondary' | 'success' | 'error';
    actionButtons?: boolean | ((notification: Notification) => React.ReactNode);
    pagination?: boolean;
    handleView?: () => void;
    handleAction?: () => void;
};

export const NsNotificationList: React.FC<NsNotificationListProps> = ({
    notifications,
    actionButtons,
    typeNotification,
    pagination,
    handleView,
    handleAction,
    color = 'primary',
    maxRowsPerPage = 5,
}) => {
    const [page, setPage] = useState(1);
    const theme = useTheme();
    const { t } = useTranslation();

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const currentNotifications = notifications.slice((page - 1) * maxRowsPerPage, page * maxRowsPerPage);

    const StyledPagination = styled(Pagination)({
        '& .Mui-selected': {
            color: '#0678BE',
            borderRadius: '0px',
        },
        '& .MuiPaginationItem-root': {
            border: '1px solid 0678BE',
            borderRadius: '0px',
        },
        '& .MuiPaginationItem-page': {
            borderRadius: '0px',
        },
    });

    return (
        <>
            {typeNotification === 'classic' && (
                <Box className="notifications-list" sx={{ height: '500px' }}>
                    {currentNotifications.map((notification) => (
                        <Box
                            key={notification.id}
                            className="notification"
                            sx={{
                                width: '100%',
                                marginTop: '10px',
                                padding: '10px 20px',
                                border: '1px solid #E0E0E0',
                                borderRadius: '0px',
                                borderBottom: '1px solid #E0E0E0',
                                borderLeft:
                                    notification.readNotification === false
                                        ? notification?.color && theme.palette[notification?.color]
                                            ? `5px solid ${theme.palette[notification?.color].main}`
                                            : `5px solid ${theme.palette[color].main}`
                                        : '5px solid #E0E0E0',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box
                                className="notification-info"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: {
                                            xs: 'column', // colonna su mobile
                                            sm: 'row', // riga su desktop
                                        },
                                        alignItems: {
                                            xs: 'flex-start',
                                            sm: 'center',
                                        },
                                        gap: '10px',
                                        flexWrap: 'wrap',
                                        marginLeft: '20px',
                                    }}
                                >
                                    <Box sx={{ fontWeight: 'bold' }}>{notification.title}</Box>

                                    {/* Bullet visibile solo da sm in su */}
                                    <Box
                                        sx={{
                                            display: {
                                                xs: 'none',
                                                sm: 'block',
                                            },
                                        }}
                                    >
                                        &bull;
                                    </Box>

                                    <Box>{notification.date}</Box>
                                </Box>

                                {/* Description visibile solo da sm in su */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: {
                                            xs: 'column', // colonna su mobile
                                            sm: 'row', // riga su desktop
                                        },
                                        alignItems: {
                                            xs: 'flex-start',
                                            sm: 'center',
                                        },
                                        gap: '10px',
                                        flexWrap: 'wrap',
                                        marginLeft: '20px',
                                    }}
                                >
                                    {notification.description}
                                </Box>
                            </Box>

                            {actionButtons === true && (
                                <Box
                                    className="notification-buttons"
                                    sx={{
                                        width: '50%',
                                        textAlign: 'right',
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        gap: '10px',
                                        [theme.breakpoints.down('sm')]: {
                                            flexDirection: 'column',
                                            alignItems: 'flex-end',
                                        },
                                    }}
                                >
                                    <Button
                                        onClick={handleAction}
                                        variant="outlined"
                                        color={color}
                                        sx={{
                                            marginRight: '10px',
                                            [theme.breakpoints.down('sm')]: {
                                                marginRight: 0,
                                            },
                                        }}
                                    >
                                        {t('notifications.button.action')}
                                    </Button>
                                    <Button
                                        onClick={handleView}
                                        variant="contained"
                                        color={color}
                                        sx={{
                                            border: `1px solid ${theme.palette.primary.main}`,
                                        }}
                                    >
                                        {t('notifications.button.view')}
                                    </Button>
                                </Box>
                            )}
                            {typeof actionButtons === 'function' && actionButtons(notification)}
                        </Box>
                    ))}
                    {pagination === true && (
                        <Box sx={{ paddingTop: '20px' }}>
                            <StyledPagination
                                count={Math.ceil(notifications.length / maxRowsPerPage)}
                                page={page}
                                sx={{ borderRadius: '0px', float: 'right' }}
                                variant="outlined"
                                shape="rounded"
                                onChange={handleChangePage}
                                color="primary"
                            />
                        </Box>
                    )}
                </Box>
            )}

            {typeNotification === 'basic' && (
                <Box className="notifications-list" sx={{ height: '500px' }}>
                    {currentNotifications.map((notification) => (
                        <Box
                            key={notification.id}
                            className="notification"
                            sx={{
                                width: '100%',
                                marginTop: '10px',
                                padding: '10px 20px',
                                borderRadius: '0px',
                                borderBottom: '1px solid #E0E0E0',
                                display: 'flex',
                                alignItems: 'flex-start',
                            }}
                        >
                            {notification.readNotification === true ? (
                                <CircleIcon
                                    sx={{
                                        color: '#0678BE',
                                        fontSize: '16px',
                                        position: 'relative',
                                        top: '15px',
                                        left: '-10px',
                                    }}
                                />
                            ) : (
                                <RadioButtonUncheckedIcon
                                    sx={{
                                        color: '#0678BE',
                                        fontSize: '16px',
                                        position: 'relative',
                                        top: '15px',
                                        left: '-10px',
                                    }}
                                />
                            )}
                            <Box className="notification-info" sx={{ marginLeft: '20px', width: '100%' }}>
                                <Box>
                                    <a href={`/communications/${notification.id}`}>{notification.description}</a>
                                </Box>
                                <Box>{notification.date}</Box>
                            </Box>
                        </Box>
                    ))}
                    {pagination === true && (
                        <Box sx={{ paddingTop: '20px' }}>
                            <StyledPagination
                                count={Math.ceil(notifications.length / maxRowsPerPage)}
                                page={page}
                                sx={{ borderRadius: '0px', float: 'right' }}
                                variant="outlined"
                                shape="rounded"
                                onChange={handleChangePage}
                                color="primary"
                            />
                        </Box>
                    )}
                </Box>
            )}
        </>
    );
};
