import React, { useState } from 'react';
import { Box, Divider, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { alpha, styled } from '@mui/material/styles';

/**
 * DynamicLink/ dropdown Component
 * @author vadim.chilinciuc
 */

export interface IDropdownItems {
    name: string;
    path: string;
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
}

export const StyledLink = styled('a')(({ theme }) => ({
    color: `${theme.palette.primary.main}`,
    backgroundColor: 'transparent !important',
    margin: '0px !important',
}));

const StyledMenu = styled(Menu)<{ overlay: boolean }>(({ theme, overlay }) => ({
    '& .MuiBackdrop-root': {
        backgroundColor: overlay ? alpha(theme.palette.primary.main, 0.5) : 'transparent',
    },
}));

export const DynamicLink = ({ router, to, children }: DynamicLinkProps) => {
    const isReactRouter = typeof router?.history !== 'undefined';
    const isNextRouter = typeof router?.push !== 'undefined';

    if (isReactRouter) {
        return (
            <StyledLink
                onClick={() => router.history.push(to)}
                className={'font-semiBold'}
                style={{ textDecoration: 'none', cursor: 'pointer', margin: '0px' }}
            >
                {children}
            </StyledLink>
        );
    } else if (isNextRouter) {
        return (
            <StyledLink
                onClick={() => router.push(to)}
                className={'font-semiBold'}
                style={{ textDecoration: 'none', cursor: 'pointer', margin: '0px' }}
            >
                {children}
            </StyledLink>
        );
    } else {
        // Handle the case when neither React Router nor Next.js Router is detected
        return (
            <StyledLink href={to} className={'font-semiBold'} style={{ textDecoration: 'none', margin: '0px' }}>
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
}: IDropDown) => {
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
            const items = dropdownItems.map((item, index: number) => (
                <DynamicLink to={item.path} router={router} key={item.path}>
                    <MenuItem>
                        {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                        {item.name}
                    </MenuItem>
                    {index < dropdownItems.length - 1 && <Divider />}
                </DynamicLink>
            ));

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

    return (
        <>
            <Box sx={{ cursor: 'pointer' }} onClick={handleMenuOpen}>
                {React.isValidElement(children) && React.Children.only(children)}
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
