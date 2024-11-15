import { css } from '@emotion/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Box, Menu, MenuItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { DynamicLink, IDropdownItems, NsDropDown, StyledLink } from '../../../components/dropdown/NsDropDown';
import { INotificationData, NsNotification } from '../../../components/notification/NsNotification';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { HeaderProps } from '../NsHeader';

/**
 * Horizontal Header
 * @contributor vadim.chilinciuc
 *
 */

const HeaderContainer = styled('header')(
    ({ theme, configuration }: any) => css`
        border-bottom: ${!configuration ? '1px solid rgba(0, 0, 0, 0.1)' : '0px'};
        display: flex;
        flex-direction: column;
        font-family: ${theme.typography.fontFamily};
    `,
);
const Logo = styled('svg')({
    height: 50,
    width: '100%',
    display: 'inline-block',
});
const LogoContainer = styled('div')(
  ({ theme, configuration }: any) => css`
    background-color: ${theme.header.backgroundColor};
    border-bottom: 9px solid ${theme.header.borderColor};
    padding: 20px 20px;
    display: flex;
    justify-content: ${configuration?.centralLogo ? 'center' : 'space-between'};
    align-items: center;
    flex-direction: row;
    width: 100%;

    .titles {
        text-align: left;
        width: ${configuration?.centralLogo ? '494px' : 'auto'};

        h1 {
            font-weight: 600;
            font-size: 1.7em;
            line-height: 1;
            margin: 0 0 2px 18px;
            color: #fff;
        }

        .subtitle {
            font-size: 0.7em;
            text-transform: uppercase;
            color: #fff;
            margin: 0 0 0 18px;
        }
    }

    a {
        display: flex;
        align-items: center;
        min-width: ${configuration?.centralLogo ? '370px' : 'auto'};
        text-decoration: none;
        color: ${theme.header.menuTextColor};

        &:focus {
            background-color: ${theme.header.focusBackgroundColor};
        }

        &:focus-visible {
            outline: 0;
        }

        svg {
            display: inline-block;
            vertical-align: top;
            max-height: 70px;
        }
    }

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
  `
);

const NavigationContainer = styled('div')(
    ({ theme, configuration }: any) => css`
        display: flex;
        justify-content: space-between;
        background-color: ${!configuration?.centralLogo ? theme.header.menuBackgroundColor : null};
        padding: 0px 8px;
        @media (max-width: 768px) {
            display: none;
            transition: max-height 0.2s ease-out;
            overflow: hidden;
            max-height: 0;
            &.open {
                display: block;
                max-height: 500px;
            }
        }

        nav {
            display: flex;
            justify-content: flex-start;
            flex-direction: row;

            a {
                padding: 4px 10px;
                font-weight: 600;
                display: flex;
                justify-content: space-between;
                background-color: ${!configuration?.centralLogo ? theme.header.menuBackgroundColor : null};
                margin-bottom: 30px;
                padding: 6px 8px;
                color: ${theme.header.menuTextColor};

                @media (max-width: 768px) {
                    display: none;
                    transition: max-height 0.2s ease-out;
                    overflow: hidden;
                    max-height: 0;
                    &.open {
                        display: block;
                        max-height: 500px;
                    }
                }
            }

            @media (max-width: 768px) {
                flex-direction: column !important;
            }
        }
    `,
);

const AuthContainer = styled('div')(
    () => css`
        display: flex;
        justify-content: space-between;
    `,
);

export interface UserMenuProps {
    notificationData?: INotificationData;
    userPanelMenuItems: React.ReactElement | IDropdownItems[];
    router: any;
    onLogout?: () => void;
    configuration?: any;
}

const UserMenu: React.FC<UserMenuProps> = ({
    notificationData,
    userPanelMenuItems,
    router,
    onLogout,
    configuration,
}) => {
    const { t } = useTranslation();

    return (
        <nav aria-label={t('header.userMenu')} style={{ alignItems: 'center' }}>
            {notificationData && (
                <span aria-label={t('header.notifications')} title={t('header.openNotifications')}>
                    <NsNotification {...notificationData}>
                        <NotificationsNoneOutlinedIcon />
                    </NsNotification>{' '}
                    <Box sx={{ display: { xs: 'inline-block', md: 'none' } }}>{t('header.notifications')}</Box>
                </span>
            )}
            {userPanelMenuItems &&
                (Array.isArray(userPanelMenuItems) ? (
                    <span
                        aria-label={t('header.account')}
                        title={t('header.openAccount')}
                        style={{ marginLeft: '20px' }}
                    >
                        <NsDropDown
                            dropdownItems={userPanelMenuItems}
                            router={router}
                            onLogout={onLogout}
                            dropDownConfiguration={configuration?.dropDownConfiguration}
                            overlay={false}
                        >
                            <AccountCircleIcon />
                        </NsDropDown>
                        <Box sx={{ display: { xs: 'inline-block', md: 'none' } }}>{t('header.account')}</Box>
                    </span>
                ) : (
                    userPanelMenuItems
                ))}
        </nav>
    );
};

export default function HorizontalHeader({
    menuItems,
    logo,
    notificationData,
    router,
    userPanelMenuItems,
    configuration,
    onLogout,
    infoBox,
}: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t } = useTranslation();
    const theme = useTheme();

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <HeaderContainer {...configuration}>
            <LogoContainer {...configuration}>
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
                {infoBox && (
                    <Box
                        sx={{
                            backgroundColor: 'secondary.main',
                        }}
                    >
                        {infoBox}
                    </Box>
                )}
                <Box
                    className={!configuration?.centralLogo ? 'mobile-menu-icon' : ''}
                    onClick={handleMenuToggle}
                    style={{
                        color: 'white',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Box display="flex" justifyContent="center" alignItems="center">
                        {t('header.menu')}
                        {isMenuOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </Box>
                </Box>
            </LogoContainer>
            <NavigationContainer
                className={isMenuOpen ? 'open' : ''}
                {...configuration}
                style={{
                    padding: menuItems && menuItems.length > 0 ? '6px' : undefined,
                }}
            >
                <nav aria-label="Menu principale">
                    {menuItems?.map((item) =>
                        typeof item.path === 'string' ? (
                            <DynamicLink key={item.name} to={item.path} router={router}>
                                {item.name}
                            </DynamicLink>
                        ) : (
                            Array.isArray(item.path) && (
                                <NsDropDown
                                    dropdownItems={item.path}
                                    router={router}
                                    dropDownConfiguration={{
                                        anchorOrigin: {
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                        },
                                        transformOrigin: {
                                            vertical: 'top',
                                            horizontal: 'center',
                                        },
                                    }}
                                    overlay={false}
                                >
                                    <StyledLink>{item.name}</StyledLink>
                                </NsDropDown>
                            )
                        ),
                    )}
                </nav>

                <AuthContainer
                    style={{
                        padding:
                            (Array.isArray(userPanelMenuItems) && userPanelMenuItems.length > 0) || onLogout
                                ? '6px'
                                : undefined,
                    }}
                >
                    {Array.isArray(userPanelMenuItems) ? (
                        <UserMenu
                            userPanelMenuItems={userPanelMenuItems}
                            notificationData={notificationData}
                            router={router}
                            onLogout={onLogout}
                            {...configuration}
                        />
                    ) : (
                        userPanelMenuItems
                    )}
                </AuthContainer>
            </NavigationContainer>
        </HeaderContainer>
    );
}
