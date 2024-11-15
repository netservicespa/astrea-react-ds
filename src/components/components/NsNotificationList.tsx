import React from 'react';
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
};

export type NsNotificationListProps = {
    notifications: Notification[];
    typeNotification: 'basic' | 'classic';
    actionButtons?: boolean;
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
}) => {
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const theme = useTheme();
    const { t } = useTranslation();

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const currentNotifications = notifications.slice((page - 1) * rowsPerPage, page * rowsPerPage);

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
                <Box
                    className="notifications-list"
                    style={{
                        height: '500px',
                    }}
                >
                    {currentNotifications.map((notification) => (
                        <Grid
                            container
                            key={notification.id}
                            className="notification"
                            style={{
                                width: '100%',
                                marginTop: '10px',
                                padding: '10px 20px',
                                border: '1px solid #E0E0E0',
                                borderRadius: '0px',
                                borderBottom: '1px solid #E0E0E0',
                                borderLeft:
                                    notification.readNotification === true
                                        ? `5px solid ${theme.palette.primary.main}`
                                        : '5px solid #E0E0E0',
                            }}
                        >
                            <Grid item xs={6} className="notification-info">
                                <Box style={{ marginLeft: '20px' }}>{notification.date}</Box>
                                <Box style={{ marginLeft: '20px' }}>{notification.description}</Box>
                            </Grid>
                            {actionButtons === true && (
                                <Grid item xs={6} className="notification-buttons">
                                    <Box style={{ float: 'right' }}>
                                        <Button
                                            onClick={handleAction}
                                            variant="outlined"
                                            style={{ marginRight: '10px' }}
                                        >
                                            {t('notifications.button.action')}
                                        </Button>
                                        <Button
                                            onClick={handleView}
                                            variant="contained"
                                            style={{
                                                border: `1px solid ${theme.palette.primary.main}`,
                                            }}
                                        >
                                            {t('notifications.button.view')}
                                        </Button>
                                    </Box>
                                </Grid>
                            )}
                        </Grid>
                    ))}
                    {pagination === true && (
                        <Box style={{ paddingTop: '20px' }}>
                            <StyledPagination
                                count={Math.ceil(notifications.length / rowsPerPage)}
                                page={page}
                                style={{ borderRadius: '0px', float: 'right' }}
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
                <Box
                    className="notifications-list"
                    style={{
                        height: '500px',
                    }}
                >
                    {currentNotifications.map((notification) => (
                        <Grid
                            container
                            key={notification.id}
                            className="notification"
                            style={{
                                width: '100%',
                                marginTop: '10px',
                                padding: '10px 20px',
                                borderRadius: '0px',
                                borderBottom: '1px solid #E0E0E0',
                            }}
                        >
                            {notification.readNotification === true ? (
                                <CircleIcon
                                    style={{
                                        color: '#0678BE',
                                        fontSize: '16px',
                                        position: 'relative',
                                        top: '15px',
                                        left: '-10px',
                                    }}
                                />
                            ) : (
                                <RadioButtonUncheckedIcon
                                    style={{
                                        color: '#0678BE',
                                        fontSize: '16px',
                                        position: 'relative',
                                        top: '15px',
                                        left: '-10px',
                                    }}
                                />
                            )}
                            <Grid item xs={6} className="notification-info">
                                <Box style={{ marginLeft: '20px' }}>
                                    <a href={`/communications/${notification.id}`}>{notification.description}</a>
                                </Box>
                                <Box style={{ marginLeft: '20px' }}>{notification.date}</Box>
                            </Grid>
                        </Grid>
                    ))}
                    {pagination === true && (
                        <Box style={{ paddingTop: '20px' }}>
                            <StyledPagination
                                count={Math.ceil(notifications.length / rowsPerPage)}
                                page={page}
                                style={{ borderRadius: '0px', float: 'right' }}
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
