import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { DynamicLinkProps } from '../../dropdown/NsDropDown';
import { useTheme } from '@mui/material/styles';
import { NotificationData, NsNotification } from '../../notification/NsNotification';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

export interface NsHeaderNotificationProps extends BoxProps {
    hover?: boolean;
    isMobile?: boolean;
    read?: NotificationData;
    unread?: NotificationData;
    onlyButton?: Omit<DynamicLinkProps, 'children'>;
    children?: React.ReactNode;
    markAsRead?: (...args: any[]) => any;
    headerHeight?: string;
}
export const NsHeaderNotification: React.FC<NsHeaderNotificationProps> = ({
    hover = true,
    headerHeight = '150px',
    markAsRead,
    read,
    unread,
    children,
    isMobile = false,
    sx,
    ...props
}) => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                display: 'flex',
                margin: 0,
                padding: 0,

                ...sx,
            }}
            {...props}
        >
            <NsNotification headerHeight={headerHeight} markAsRead={markAsRead} read={read} unread={unread}>
                <>
                    <NotificationsNoneOutlinedIcon
                        sx={{
                            alignItems: 'center',
                            height: '100%',
                        }}
                    />
                    {children}
                </>
            </NsNotification>
        </Box>
    );
};
