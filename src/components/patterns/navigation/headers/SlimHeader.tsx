import React, { useState } from 'react';
import { Box } from '@mui/material';
import { css, styled } from '@mui/material/styles';
import { DynamicLink, IDropDownConfiguration } from 'src/components/components/dropdown/NsDropDown';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { INotificationData, NsNotification } from 'src/components/components/notification/NsNotification';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

interface SlimHeaderProps {
    router: any;
    logo?: React.ReactNode;
    children?: React.ReactNode;
    notificationData?: INotificationData;
    configuration?: {
        centralLogo?: boolean;
        dropDownConfiguration?: IDropDownConfiguration | undefined;
        hover?: boolean;
        dropDownIcon?: React.ReactElement | boolean;
        notification?: boolean;
    };
}
const HeaderContainer = styled('header')(
    ({ theme, configuration }: any) => css`
        height: 80px;
        display: flex;
        flex-direction: row;
        font-family: ${theme.typography.fontFamily};
        background-color: ${theme.header.backgroundColor};
        border-bottom: ${!configuration ? '1px solid' : '0px'};
        border-color: ${theme.header.borderColor};
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        width: 100%;
    `,
);
const LogoContainer = styled('div')(
    ({ theme }) => css`
        padding: 10px 20px;
        display: flex;
        justify-content: 'center';
        align-items: center;
        flex-direction: row;
        width: 100%;
        flexgrow: 1;

        .mobile-menu-icon {
            display: none !important;
            cursor: pointer;
            color: ${theme.header.backgroundColor};
            font-weight: 599;

            @media (max-width: 768px) {
                display: block !important;
            }
        }

        @media (min-width: 768px) {
            .mobile-menu-icon {
                display: none !important;
            }
        }
    `,
);
const ChildrenContainer = styled('div')(
    ({ theme }) => css`
        padding: 10px 20px;
        display: flex;
        justify-content: 'center';
        align-items: center;
        flex-direction: row;

        .mobile-menu-icon {
            display: none !important;
            cursor: pointer;
            color: ${theme.header.backgroundColor};
            font-weight: 599;

            @media (max-width: 768px) {
                display: block !important;
            }
        }

        @media (min-width: 768px) {
            .mobile-menu-icon {
                display: none !important;
            }
        }
    `,
);
export default function SlimHeader({ router, logo, children, configuration, notificationData }: SlimHeaderProps) {
    const { t } = useTranslation();
    const theme = useTheme();
    const [notificationState, setNotificationState] = useState(notificationData);
    return (
        <HeaderContainer>
            {logo && (
                <LogoContainer>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '40px',
                            width: '100%',
                            justifyContent: 'space-between',
                        }}
                    >
                        <DynamicLink key={'/'} to={'/'} router={router}>
                            {logo}
                        </DynamicLink>
                    </Box>
                </LogoContainer>
            )}
            <Box
                sx={{
                    display: 'flex',
                    height: '100%',
                    flexDirection: 'row',
                }}
            >
                {configuration?.notification && (
                    <Box
                        aria-label={t('header.notifications')}
                        title={t('header.openNotifications')}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            aspectRatio: '1',
                        }}
                    >
                        <NsNotification {...notificationState} headerHeight="80px">
                            <NotificationsNoneOutlinedIcon
                                sx={{
                                    alignItems: 'center',
                                    height: '100%',
                                    color: theme.palette.secondary.main,
                                }}
                            />
                        </NsNotification>
                    </Box>
                )}
                {children && <ChildrenContainer>{children}</ChildrenContainer>}
            </Box>
        </HeaderContainer>
    );
}
