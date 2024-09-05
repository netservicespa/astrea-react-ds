import React, { useState } from 'react';
import { Badge, Box, Button, List, ListItem, ListItemIcon, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { NsTabs } from '../tabs/NsTabs';
import { DynamicLinkProps } from '../../../util/types';
import { DynamicLink } from '../dropdown/NsDropDown';

export interface IReadWrite {
    id: number;
    status: string;
    link?: DynamicLinkProps;
    text: string;
}

export interface NotificationData {
    notifications: IReadWrite[];

    /**
     * Link to show more
     */
    showMore?: DynamicLinkProps;
    totalCount: number;
}

/**
 * Notification Component
 * @author vadim.chilinciuc
 */

/**
 * An object containing the notification data, including both read and unread notifications.
 */
export interface INotificationData {
    read: NotificationData;
    unread: NotificationData;
    onlyButton?: Omit<DynamicLinkProps, 'children'>;
    children: React.ReactNode;
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
    markAsRead = true,
}: NotificationData & { isReadUnread: 'READ' | 'UNREAD' } & {
    markAsRead?: boolean;
}) => {
    return (
        <List
            sx={{
                width: '364px',
                border: '1px solid #b1b4b6',
                backgroundColor: '#ffffff',
                boxSizing: 'border-box',
                p: 3,
            }}
        >
            {isReadUnread === 'READ' ? (
                <div style={{ fontSize: '24px' }}>Read Notification</div>
            ) : (
                <div
                    key={'x'}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <div style={{ fontSize: '24px' }}>Unread Notification</div>
                    <Badge style={{ marginRight: '8px' }} badgeContent={totalCount} color="error" />
                </div>
            )}

            {notifications.map((item: any, index: number) => {
                return (
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
                );
            })}

            {isReadUnread === 'UNREAD' && markAsRead ? (
                <Button sx={{ width: '100%', fontSize: '18px', textDecoration: 'underline' }} onClick={() => {}}>
                    Mark all as read
                </Button>
            ) : (
                <></>
            )}
            {showMore && <DynamicLink {...showMore}></DynamicLink>}
        </List>
    );
};

export const NsNotification: React.FC<INotificationData> = ({ read, unread, children, onlyButton }) => {
    const [isOpenNotification, setIsOpenNotification] = useState(false);

    const tabs = [
        {
            id: '1',
            label: `Unread (${unread.totalCount})`,
            children: <MainNotificationDiv isReadUnread={'UNREAD'} {...unread} />,
        },
        {
            id: '2',
            label: `Read (${read.totalCount})`,
            children: <MainNotificationDiv isReadUnread={'READ'} {...read} />,
        },
    ] as any;

    const DivIcon: any = onlyButton ? DynamicLink : React.Fragment;
    const boxWidth = onlyButton ? 'auto' : '364px';
    return (
        <>
            {!isOpenNotification ? (
                <Box sx={{ width: boxWidth, height: '40px' }}>
                    <DivIcon {...onlyButton}>
                        <div
                            onClick={() => (onlyButton ? () => {} : setIsOpenNotification(!isOpenNotification))}
                            style={{ textAlign: 'right', cursor: 'pointer' }}
                        >
                            <Badge style={{ marginRight: '5px' }} badgeContent={unread?.totalCount} color="error">
                                {children}
                            </Badge>
                        </div>
                    </DivIcon>
                </Box>
            ) : (
                <>
                    <Box sx={{ width: boxWidth, height: '40px' }}>
                        <div
                            onClick={() => setIsOpenNotification(!isOpenNotification)}
                            style={{ textAlign: 'right', cursor: 'pointer' }}
                        >
                            <Badge style={{ marginRight: '5px' }} badgeContent={unread?.totalCount} color="error">
                                {children}
                            </Badge>
                        </div>
                        <NsTabs tabs={tabs} configuration={{ centered: true, boxBorder: '1px solid #b1b4b6' }} />
                    </Box>
                </>
            )}
        </>
    );
};
