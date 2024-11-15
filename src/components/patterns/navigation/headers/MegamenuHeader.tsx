import { css } from '@emotion/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Button as NsButton, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { NsDropDown, DynamicLink } from '../../../components/dropdown/NsDropDown';
import { INotificationData, NsNotification } from '../../../components/notification/NsNotification';
import { useTranslation } from 'react-i18next';
import { HeaderProps } from '../NsHeader';

const HeaderContainer = styled('header')(
    ({ theme, configuration }: any) => css`
        border-bottom: ${!configuration ? '1px solid rgba(0, 0, 0, 0.1)' : '0px'};
        display: flex;
        flex-direction: column;
        font-family: ${theme.typography.fontFamily};
    `,
);

const LogoContainer = styled('div')(
    ({ theme, configuration }: any) => css`
        background-color: ${theme.header.backgroundColor};
        border-bottom: 9px solid ${theme.header.borderColor};
        padding: 20px 20px;
        display: flex;
        justify-content: ${configuration?.centralLogo ? 'center' : 'space-between'};
        align-items: center;
        a {
            display: flex;
            align-items: center;
            min-width: ${configuration?.centralLogo ? '370px' : undefined};

            text-decoration: none;
            color: ${theme.header.menuTextColor};

            &:focus {
                background-color: ${theme.header.focusBackgroundColor};
            }

            &:focus-visible {
                outline: 0;
            }

            .titles {
                text-align: left;
                width: ${configuration?.centralLogo ? '494px' : undefined};

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

            svg {
                display: inline-block;
                vertical-align: top;
                max-height: 70px;
                margin-left: 10%;
            }
        }

        .mobile-menu-icon {
            display: block;
            cursor: pointer;
            color: ${theme.header.backgroundColor};
            font-weight: 599;
        }
        @media (min-width: 768px) {
            .mobile-menu-icon {
                display: none !important;
            }
        }
    `,
);

const NavigationContainer = styled('div')(
    ({ theme, configuration }: any) => css`
        display: flex;
        justify-content: space-between;
        background-color: ${!configuration?.centralLogo ? theme.header.menuBackgroundColor : null};
        padding-top: 6px;
        padding-bottom: 6px;
        padding-left: 100px;
        padding-right: 40px;
        @media (min-width: 768px) {
            margin-bottom: 30px;
        }
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
                align-items: center;
                color: #1c3538;
                text-decoration: none;

                &:hover {
                    color: #000;
                    text-decoration: underline;
                }

                &:active {
                    color: #2e3d60;
                    position: relative;

                    &:after {
                        content: '';
                        display: inline-block;
                        height: 3px;
                        width: 100%;
                        background: black;
                        position: absolute;
                        left: 0;
                        bottom: -6px;
                    }
                }

                &:focus {
                    background: #ffe300;
                    position: relative;

                    &:after {
                        content: '';
                        display: inline-block;
                        height: 3px;
                        width: 100%;
                        background: black;
                        position: absolute;
                        left: 0;
                        bottom: 0;
                    }
                }

                @media (max-width: 768px) {
                    border-bottom: 1px solid lightgray;
                    padding: 10px 10px;
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
        padding: 6px;
    `,
);
const MenuTitle = styled('div')(
    ({ theme }: any) => css`
        background-color: ${theme.header.borderColor};
        color: ${theme.header.menuTextColor};
    `,
);
const MenuButton = styled(NsButton)(
    ({ theme }) => css`
        background-color: ${theme.header.borderColor};
        color: ${theme.header.menuTextColor};
        padding: '0px';
    `,
);
export interface UserMenuProps {
    notificationData?: INotificationData;
    userPanelMenuItems: any;
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
                    </NsNotification>
                    <Box sx={{ display: { xs: 'inline-block', md: 'none' } }}>{t('header.notifications')}</Box>
                </span>
            )}
            {userPanelMenuItems && (
                <span aria-label={t('header.account')} title={t('header.openAccount')} style={{ marginLeft: '20px' }}>
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
            )}
        </nav>
    );
};

export default function MegamenuHeader({
    columns,
    logo,
    notificationData,
    router,
    userPanelMenuItems,
    configuration,
    onLogout,
}: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t } = useTranslation();

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    // @ts-ignore
    return (
        <HeaderContainer {...configuration}>
            <LogoContainer {...configuration}>
                <DynamicLink key={'/'} to={'/'} router={router}>
                    {logo}
                </DynamicLink>
            </LogoContainer>
            <NavigationContainer className={isMenuOpen ? 'open' : ''} {...configuration}>
                <nav aria-label="Menu principale">
                    <NsButton onClick={handleMenuToggle} color="secondary" size="small" variant="outlined">
                        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        {t('header.menu')}
                    </NsButton>
                </nav>
                <AuthContainer>
                    <UserMenu
                        userPanelMenuItems={userPanelMenuItems}
                        notificationData={notificationData}
                        router={router}
                        onLogout={onLogout}
                        {...configuration}
                    />
                </AuthContainer>
            </NavigationContainer>
            {isMenuOpen && (
                <Box
                    display="flex"
                    justifyContent="center"
                    flexDirection="row"
                    alignItems="baseline"
                    sx={{ justifyContent: 'space-evenly' }}
                >
                    {columns?.map((item, index) => (
                        <Box key={index} marginBottom={2} display="flex" flexDirection="column">
                            <MenuTitle>{item.title}</MenuTitle>
                            <Typography variant="h6"></Typography>
                            {item.links.map((menu, index) => (
                                <u>
                                    <DynamicLink key={menu.text} to={menu.href} router={router}>
                                        {menu.text}
                                    </DynamicLink>
                                </u>
                            ))}
                        </Box>
                    ))}
                </Box>
            )}
        </HeaderContainer>
    );
}
