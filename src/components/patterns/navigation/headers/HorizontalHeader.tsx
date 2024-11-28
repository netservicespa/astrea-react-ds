import { css } from '@emotion/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Box } from '@mui/material';
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
    `,
);

const NavigationContainer = styled('div')(
    ({ theme, configuration }: any) => css`
        display: flex;
        justify-content: space-between;
        background-color: ${!configuration?.centralLogo ? theme.header.menuBackgroundColor : null};
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
            height: 40px;
            display: flex;
            justify-content: flex-start;
            flex-direction: row;
            align-items: center;

            a {
                padding: 0px 10px;
                font-weight: 600;
                display: flex;
                justify-content: space-between;
                margin: 0px;
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
    const theme = useTheme();
    const [notificationState, setNotificationState] = useState(notificationData);

    return (
        <nav aria-label={t('header.userMenu')}>
            {configuration.notification && (
                <Box
                    aria-label={t('header.notifications')}
                    title={t('header.openNotifications')}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%',
                        aspectRatio: '1',
                        ...(configuration.hover && {
                            '&:hover': {
                                backgroundColor: theme.palette.primary.main,
                                color: '#fff',
                            },
                        }),
                    }}
                >
                    <NsNotification {...notificationState}>
                        <NotificationsNoneOutlinedIcon
                            sx={{
                                alignItems: 'center',
                                height: '100%',
                            }}
                        />
                    </NsNotification>
                    <Box sx={{ display: { xs: 'inline-block', md: 'none' } }}>{t('header.notifications')}</Box>
                </Box>
            )}
            {userPanelMenuItems &&
                (Array.isArray(userPanelMenuItems) ? (
                    <Box
                        aria-label={t('header.account')}
                        title={t('header.openAccount')}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            aspectRatio: '1',
                            ...(configuration.hover && {
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.main,
                                    color: '#fff',
                                },
                            }),
                        }}
                    >
                        <NsDropDown
                            dropdownItems={userPanelMenuItems}
                            router={router}
                            onLogout={onLogout}
                            dropDownConfiguration={configuration?.dropDownConfiguration}
                            overlay={false}
                        >
                            <AccountCircleIcon
                                sx={{
                                    alignItems: 'center',
                                    height: '100%',
                                }}
                            />
                        </NsDropDown>
                        <Box sx={{ display: { xs: 'inline-block', md: 'none' } }}>{t('header.account')}</Box>
                    </Box>
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
            <NavigationContainer className={isMenuOpen ? 'open' : ''} {...configuration}>
                <nav aria-label="Menu principale">
                    {menuItems?.map((item, i) =>
                        typeof item.path === 'string' ? (
                            <DynamicLink
                                key={item.name}
                                to={item.path}
                                router={router}
                                sx={{
                                    gap: '4px',
                                    alignItems: 'center',
                                    height: '100%',

                                    ...(configuration.hover && {
                                        '&:hover': {
                                            backgroundColor: theme.palette.primary.main,
                                            color: '#fff',
                                        },
                                    }),
                                }}
                            >
                                {item.icon && item.icon}
                                {item.name}
                            </DynamicLink>
                        ) : (
                            Array.isArray(item.path) && (
                                <NsDropDown
                                    key={item.name}
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
                                        hover: configuration.hover,
                                        dropDownIcon: configuration.dropDownIcon,
                                    }}
                                    overlay={false}
                                    icon={configuration.dropDownIcon}
                                >
                                    <StyledLink
                                        sx={{
                                            gap: '4px',
                                            alignItems: 'center',
                                            height: '100%',
                                            ...(configuration.hover && {
                                                '&:hover': {
                                                    backgroundColor: theme.palette.primary.main,
                                                    color: '#fff',
                                                },
                                            }),
                                            // '.caret-icon::before': {
                                            //     content: "'keyboard_arrow_down'",
                                            //     fontFamily: 'Material Icons',
                                            //     fontSize: '16px',
                                            //     display: 'inline-block',
                                            //     verticalAlign: 'middle',
                                            //     color: 'inherit',
                                            // },
                                        }}
                                    >
                                        {item.icon && item.icon}
                                        {item.name}
                                    </StyledLink>
                                </NsDropDown>
                            )
                        ),
                    )}
                </nav>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {Array.isArray(userPanelMenuItems) ? (
                        <UserMenu
                            userPanelMenuItems={userPanelMenuItems}
                            notificationData={notificationData}
                            router={router}
                            onLogout={onLogout}
                            configuration={configuration}
                        />
                    ) : (
                        userPanelMenuItems
                    )}
                </Box>
            </NavigationContainer>
        </HeaderContainer>
    );
}
