import React, { useState } from 'react';
import { Badge, Box, Button, List, ListItem, ListItemIcon, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { NsTabs } from '../tabs/NsTabs';
import { DynamicLink, DynamicLinkProps } from '../dropdown/NsDropDown';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

export interface IReadWrite {
    id: number;
    status: string;
    link?: DynamicLinkProps;
    text: string;
}

export interface NotificationData {
    notifications?: IReadWrite[];
    markAsRead?: (...args: any[]) => any;
    /**
     * Link to show more
     */
    showMore?: DynamicLinkProps;
    totalCount?: number;
}

/**
 * Notification Component
 * @author vadim.chilinciuc
 */

/**
 * An object containing the notification data, including both read and unread notifications.
 */
export interface INotificationData {
    read?: NotificationData;
    unread?: NotificationData;
    onlyButton?: Omit<DynamicLinkProps, 'children'>;
    children?: React.ReactNode;
    markAsRead?: (...args: any[]) => any;
    headerHeight?: string;
}

/**
 * Notifaction status
 */

const Status = {
    valid: 'valid',
    invalid: 'invalid',
};

const MainNotificationDiv = ({
    notifications,
    showMore,
    totalCount,
    isReadUnread,
    markAsRead,
}: NotificationData & { isReadUnread: 'READ' | 'UNREAD' }) => {
    const theme = useTheme();
    const { t } = useTranslation();
    return (
        <List
            sx={{
                width: '364px',
                border: `1px solid ${theme.palette.borderColor.main}`,
                backgroundColor: '#ffffff',
                boxSizing: 'border-box',
                p: 3,
            }}
        >
            {isReadUnread === 'READ' ? (
                <div style={{ fontSize: '24px' }}>{t('header.notification.read')}</div>
            ) : (
                <div
                    key={'x'}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <div style={{ fontSize: '24px' }}>{t('header.notification.unread')}</div>
                    <Badge style={{ marginRight: '8px' }} badgeContent={totalCount} color="error" />
                </div>
            )}

            {notifications &&
                notifications.map((item: any, index: number) => {
                    return (
                        <DynamicLink {...item.link}>
                            <ListItem
                                key={index}
                                divider
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    cursor: 'pointer',
                                }}
                            >
                                <ListItemIcon>
                                    {item.status === Status.valid ? (
                                        <CheckCircleIcon color={'primary'} />
                                    ) : (
                                        <ErrorOutlineIcon color={'error'} />
                                    )}
                                </ListItemIcon>
                                <Typography component="h4" variant="h4">
                                    {item.text}
                                </Typography>
                            </ListItem>
                        </DynamicLink>
                    );
                })}

            {isReadUnread === 'UNREAD' && markAsRead && (
                <Button sx={{ width: '100%', fontSize: '18px', textDecoration: 'underline' }} onClick={markAsRead}>
                    {t('header.notification.markAsRead')}
                </Button>
            )}
            {showMore && <DynamicLink {...showMore}></DynamicLink>}
        </List>
    );
};

export const NsNotification: React.FC<INotificationData> = ({
    read,
    unread,
    children,
    onlyButton,
    markAsRead,
    headerHeight,
}) => {
    const [isOpenNotification, setIsOpenNotification] = useState(false);
    const { t } = useTranslation();
    const theme = useTheme();

    const tabs = [
        {
            id: '1',
            label: t('header.notification.unreadCount', { count: unread?.totalCount || 0 }),
            children: <MainNotificationDiv isReadUnread={'UNREAD'} {...unread} markAsRead={markAsRead} />,
        },
        {
            id: '2',
            label: t('header.notification.readCount', { count: read?.totalCount || 0 }),
            children: <MainNotificationDiv isReadUnread={'READ'} {...read} markAsRead={markAsRead} />,
        },
    ] as any;

    // const DivIcon: any = onlyButton ? DynamicLink : React.Fragment;
    // const boxWidth = onlyButton ? 'auto' : '364px';
    return (
        <>
            {/* <Box sx={{ width: boxWidth, height: '40px', alignItems: 'center', display: 'flex', position: 'relative' }}>
                <DivIcon {...onlyButton}>
                    <div
                        onClick={() => (onlyButton ? () => {} : setIsOpenNotification(!isOpenNotification))}
                        style={{ textAlign: 'left', cursor: 'pointer' }}
                    >
                        <Badge badgeContent={unread?.totalCount} color="error">
                            {children}
                        </Badge>
                    </div>
                </DivIcon>
            </Box> */}
            <Box
                onClick={() => setIsOpenNotification(!isOpenNotification)}
                sx={{
                    height: '100%',
                    alignItems: 'center',
                    display: 'flex',
                    position: 'relative',
                    textAlign: 'left',
                    cursor: 'pointer',
                    justifyContent: 'left',
                }}
            >
                <Badge badgeContent={unread?.totalCount} color="error">
                    {children}
                </Badge>
            </Box>
            {isOpenNotification && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: headerHeight || 0,
                        right: 0,
                        maxWidth: '50%',
                        minWidth: '25%',
                        border: `1px solid ${theme.palette.borderColor.main}`,
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        zIndex: 10,
                        marginX: '10px',
                    }}
                >
                    <NsTabs tabs={tabs} configuration={{ centered: true, boxBorder: 'none' }} />
                </Box>
            )}
        </>
    );
};
