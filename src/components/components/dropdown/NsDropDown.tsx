import React, { useState, useId } from 'react';
import { Box, Divider, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { alpha, styled, SxProps, Theme, useTheme } from '@mui/material/styles';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { useTranslation } from 'react-i18next';
/**
 * DynamicLink/ dropdown Component
 * @author vadim.chilinciuc
 */

export interface IDropdownItems {
    name: string;
    path: string | IDropdownItems[];
    icon?: React.ReactElement;
}
export interface IDropDownConfiguration {
    anchorOrigin?: {
        vertical: any;
        horizontal?: any;
    };
    transformOrigin?: {
        vertical?: any;
        horizontal?: any;
    };
    hover?: boolean;
    dropDownIcon?: React.ReactElement | boolean;
}
export interface IDropDown {
    /**
     * Router object required for enabling routing functionality.
     */
    router: any;

    /**
     * An array of dropdown items that redirect to specific paths when clicked.
     */
    dropdownItems: IDropdownItems[];

    /**
     * Optional callback function invoked when the "logout" action is triggered.
     */
    onLogout?: () => void;

    /**
     * The clickable element (e.g., icon, div, component) that triggers the dropdown.
     */
    children: React.ReactElement;

    /**
     * Extra configuration for managing the dropdown, such as anchor position and other details (refer to MUI dropdown documentation for more information).
     */
    dropDownConfiguration?: IDropDownConfiguration;
    /**
     * Extra configuration for Backdrop.
     */
    overlay?: boolean;
    icon?: boolean | React.ReactElement;
    /**
     * If true, the dropdown menu will close when a menu item is clicked.
     */
    closeOnMenuItemClick?: boolean;
}

export interface DynamicLinkProps {
    /**
     * Router object required for enabling routing functionality.
     */
    router: any;

    /**
     * The path to which the link should redirect.
     */
    to: string;

    /**
     * The clickable element (e.g., icon, div, component) that triggers the redirection.
     */
    children: any;
    sx?: SxProps<Theme>;
    isActive?: boolean;
    ariaCurrent?: React.AriaAttributes['aria-current'];
}

export const StyledLink = styled('a')(({ theme }) => ({
    color: `${theme.palette.primary.main}`,
    position: 'relative',
    textDecoration: 'none',
    display: 'block',
    width: '100%',
}));

const StyledMenu = styled(Menu)<{ overlay: boolean }>(({ theme, overlay }) => ({
    '& .MuiBackdrop-root': {
        backgroundColor: overlay ? alpha(theme.palette.primary.main, 0.5) : 'transparent',
    },
}));

type ExtendChildrenProps = {
    children: React.ReactElement;
    icon?: boolean | React.ReactElement;
    isOpen: boolean;
};

const normalizePath = (path?: string) => {
    if (!path) return undefined;
    const [cleanPath] = path.split(/[?#]/);
    const trimmed = cleanPath.replace(/\/+$/, '');
    return trimmed === '' ? '/' : trimmed;
};

export const resolveCurrentPath = (router?: any): string | undefined => {
    if (!router && typeof window !== 'undefined') return window.location?.pathname;
    if (typeof router?.asPath === 'string') return router.asPath.split('?')[0];
    if (typeof router?.pathname === 'string') return router.pathname;
    if (typeof router?.location?.pathname === 'string') return router.location.pathname;
    if (typeof router?.history?.location?.pathname === 'string') return router.history.location.pathname;
    if (typeof window !== 'undefined') return window.location?.pathname;
    return undefined;
};

export const isActivePath = (currentPath?: string, targetPath?: string): boolean => {
    const current = normalizePath(currentPath);
    const target = normalizePath(targetPath);
    if (!current || !target) return false;
    if (target === '/') return current === '/';
    return current === target || current.startsWith(`${target}/`);
};
export const DynamicLink = ({ router, to, children, sx, isActive, ariaCurrent }: DynamicLinkProps) => {
    const isReactRouter = typeof router?.history !== 'undefined';
    const isNextRouter = typeof router?.push !== 'undefined';
    const active = Boolean(isActive);
    const mergedSx = [
        {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
    ];
    const commonProps = {
        className: 'font-semiBold',
        style: { textDecoration: 'none', cursor: 'pointer', margin: '0px' },
        sx: mergedSx,
        'data-active': active ? 'true' : undefined,
        'aria-current': active ? ariaCurrent ?? 'page' : undefined,
    };
    if (isReactRouter) {
        return (
            <StyledLink onClick={() => router.history.push(to)} {...commonProps}>
                {children}
            </StyledLink>
        );
    } else if (isNextRouter) {
        return (
            <StyledLink onClick={() => router.push(to)} {...commonProps}>
                {children}
            </StyledLink>
        );
    } else {
        // Handle the case when neither React Router nor Next.js Router is detected
        return (
            <StyledLink href={to} {...commonProps}>
                {children}
            </StyledLink>
        );
    }
};

export const NsDropDown = ({
    router,
    dropdownItems,
    onLogout,
    children,
    dropDownConfiguration,
    closeOnMenuItemClick,
    overlay = false,
    icon = false,
}: IDropDown) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const currentPath = resolveCurrentPath(router);
    const handleMenuOpen = (event: React.MouseEvent<HTMLDivElement>) => {
        setIsOpen(true);
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setIsOpen(false);
        setAnchorEl(null);
    };

    const handleMenuItemClick = () => {
        handleMenuClose();
        onLogout && onLogout();
    };

    const renderMenuItems = () => {
        if (Array.isArray(dropdownItems)) {
            const items = dropdownItems.flatMap((item, index) => {
                if (typeof item.path === 'string') {
                    const linkIsActive = isActivePath(currentPath, item.path);
                    return [
                        <Box
                            component="div"
                            key={'box-menu-item-' + item.name}
                            sx={{ display: 'block', width: '100%' }}
                            onClick={() => {
                                if (closeOnMenuItemClick) {
                                    handleMenuClose();
                                }
                            }}
                        >
                            <DynamicLink
                                to={item.path}
                                router={router}
                                key={`item-${item.path}`}
                                isActive={linkIsActive}
                                ariaCurrent={linkIsActive ? 'page' : undefined}
                            >
                                {/*<MenuItem>
                                    <Box
                                        key={item.name}
                                        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                                    >
                                        {item.icon && item.icon}
                                        {item.name}
                                    </Box>
                                </MenuItem>*/}
                                <MenuItem sx={{ width: '100%' }}>
                                    {item.icon && (
                                        <ListItemIcon sx={{ color: theme.palette.primary.main, fontSize: '20px' }}>
                                            {item.icon}
                                        </ListItemIcon>
                                    )}
                                    <ListItemText
                                        primary={item.name}
                                        sx={{
                                            '& .MuiTypography-root': {
                                                color: theme.palette.primary.main,
                                            },
                                        }}
                                    />
                                </MenuItem>
                            </DynamicLink>
                        </Box>,
                        index < dropdownItems.length - 1 && <Divider key={`divider-${index}`} />,
                    ];
                }
                return [];
            });

            if (onLogout) {
                items.push(
                    <Divider key="logout-divider" />,
                    <MenuItem onClick={onLogout} key="logout-menu-item">
                        <ListItemIcon>
                            <LogoutIcon sx={{ color: theme.palette.error.main, fontSize: '20px' }} />
                        </ListItemIcon>
                        <ListItemText primary={t('dropdown.logout')} sx={{ color: theme.palette.error.main }} />
                    </MenuItem>,
                );
            }

            return items; // Restituisce un array piatto di elementi validi
        }

        return dropdownItems;
    };

    const ExtendChildren = ({ children, icon, isOpen }: ExtendChildrenProps) => {
        return (
            <Box
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                {React.Children.map(children, (child, i) => {
                    if (React.isValidElement(child)) {
                        return (
                            <Box
                                key={useId()}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                {React.cloneElement(child)}
                                {icon &&
                                    (isOpen ? (
                                        typeof icon === 'boolean' ? (
                                            <KeyboardArrowUpOutlinedIcon
                                                sx={{
                                                    transition: 'transform 0.3s',
                                                }}
                                            />
                                        ) : (
                                            <>{icon}</>
                                        )
                                    ) : typeof icon === 'boolean' ? (
                                        <KeyboardArrowUpOutlinedIcon
                                            sx={{
                                                transform: 'rotate(180deg)',
                                                transition: 'transform 0.3s',
                                            }}
                                        />
                                    ) : (
                                        <Box
                                            sx={{
                                                transform: 'rotate(180deg)',
                                                transition: 'transform 0.3s',
                                                display: 'inline-flex',
                                            }}
                                        >
                                            {icon}
                                        </Box>
                                    ))}
                            </Box>
                        );
                    }
                    return child;
                })}
            </Box>
        );
    };

    return (
        <>
            <Box
                sx={{
                    cursor: 'pointer',
                    height: '100%',
                    display: 'flex',
                    direction: 'row',
                    alignItems: 'center',
                }}
                onClick={handleMenuOpen}
            >
                <ExtendChildren icon={icon} isOpen={isOpen}>
                    {children}
                </ExtendChildren>
            </Box>
            <StyledMenu
                overlay={overlay}
                id="account-menu"
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: dropDownConfiguration?.anchorOrigin?.vertical ?? 'bottom',
                    horizontal: dropDownConfiguration?.anchorOrigin?.horizontal ?? 'right',
                }}
                transformOrigin={{
                    vertical: dropDownConfiguration?.transformOrigin?.vertical ?? 'top',
                    horizontal: dropDownConfiguration?.transformOrigin?.horizontal ?? 'right',
                }}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            borderRadius: 0,
                            mt: 1,
                            width: anchorEl?.clientWidth,
                            minWidth: anchorEl?.clientWidth,
                            //filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: 0,
                                mr: 1,
                            },
                        },
                    },
                    list: {
                        disablePadding: true,
                        sx: {
                            py: 0,
                        },
                    },
                }}
            >
                {renderMenuItems()}
            </StyledMenu>
        </>
    );
};
