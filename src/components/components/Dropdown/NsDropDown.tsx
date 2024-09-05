import React, { useState } from 'react';
import { Divider, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { DynamicLinkProps, IDropDown } from '../../../util/types';
import { styled } from '@mui/material/styles';

/**
 * DynamicLink/ dropdown Component
 * @author vadim.chilinciuc
 */

const StyledLink = styled('a')(({ theme }) => ({
    color: `${theme.palette.primary.main}`,
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

export const NsDropDown = ({ router, dropdownItems, onLogout, children, dropDownConfiguration }: IDropDown) => {
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
            return (
                <>
                    {dropdownItems.map((item: any, index: number) => (
                        <DynamicLink to={item.path} router={router} key={index}>
                            <MenuItem>
                                <ListItemIcon>{item.icon || <HomeIcon />}</ListItemIcon>
                                {item.name}
                            </MenuItem>
                            <Divider />
                        </DynamicLink>
                    ))}
                    <MenuItem onClick={handleMenuItemClick}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" style={{ color: '#FFF' }} />
                    </MenuItem>
                </>
            );
        } else {
            return dropdownItems;
        }
    };

    return (
        <>
            <div style={{ cursor: 'pointer' }} onClick={handleMenuOpen}>
                {React.isValidElement(children) && React.Children.only(children)}
            </div>

            <Menu
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
                            border: '1px solid #b1b4b6',
                            mt: 4,
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
            </Menu>
        </>
    );
};

