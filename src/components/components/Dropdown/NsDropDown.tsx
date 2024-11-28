import React, { useState, useId } from 'react';
import { Box, Divider, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { alpha, styled, SxProps, Theme, useTheme } from '@mui/material/styles';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
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
}

export const StyledLink = styled('a')(({ theme }) => ({
    color: `${theme.palette.primary.main}`,
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
export const DynamicLink = ({ router, to, children, sx }: DynamicLinkProps) => {
    const isReactRouter = typeof router?.history !== 'undefined';
    const isNextRouter = typeof router?.push !== 'undefined';
    const commonStyle = {
        className: 'font-semiBold',
        style: { textDecoration: 'none', cursor: 'pointer', margin: '0px' },
        sx,
    };
    if (isReactRouter) {
        return (
            <StyledLink onClick={() => router.history.push(to)} {...commonStyle}>
                {children}
            </StyledLink>
        );
    } else if (isNextRouter) {
        return (
            <StyledLink onClick={() => router.push(to)} {...commonStyle}>
                {children}
            </StyledLink>
        );
    } else {
        // Handle the case when neither React Router nor Next.js Router is detected
        return (
            <StyledLink href={to} {...commonStyle}>
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
    overlay = false,
    icon = false,
}: IDropDown) => {
    const theme = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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
            const items = dropdownItems.map((item, index) => {
                if (typeof item.path === 'string') {
                    return (
                        <React.Fragment key={item.path}>
                            <DynamicLink to={item.path} router={router}>
                                <MenuItem>
                                    {item.icon && item.icon}
                                    {item.name}
                                </MenuItem>
                            </DynamicLink>
                            {index < dropdownItems.length - 1 && <Divider />}
                        </React.Fragment>
                    );
                }
                return null;
            });

            if (onLogout) {
                items.push(
                    <>
                        <Divider />
                        <MenuItem onClick={onLogout} key="logout">
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" style={{ color: '#FFF' }} />
                        </MenuItem>
                    </>,
                );
            }

            return items;
        } else {
            return dropdownItems;
        }
    };

    const ExtendChildren = ({ children, icon, isOpen }: ExtendChildrenProps) => {
        return (
            <Box
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'row',

                    '&:hover': {
                        backgroundColor: theme.palette.primary.main,
                        color: '#fff',
                    },
                    '&:hover a': {
                        color: '#fff',
                    },
                    '&:hover svg': {
                        color: '#fff',
                    },
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
                                                    color: theme.palette.primary.main,
                                                }}
                                            />
                                        ) : (
                                            <>{icon}</>
                                        )
                                    ) : typeof icon === 'boolean' ? (
                                        <KeyboardArrowUpOutlinedIcon
                                            sx={{
                                                color: theme.palette.primary.main,
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
                    ...(dropDownConfiguration?.hover && {
                        '&:hover': {
                            backgroundColor: theme.palette.primary.main,
                            color: '#fff',
                        },
                    }),
                }}
                onClick={handleMenuOpen}
            >
                <ExtendChildren children={children} icon={icon} isOpen={isOpen} />
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
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                        },
                    },
                }}
            >
                {renderMenuItems()}
            </StyledMenu>
        </>
    );
};
