import React, { useState } from 'react';
import {
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { DynamicLinkProps, IDropDown } from 'src/util/types';

/**
 * DynamicLink/ Dropdown Component
 * @author vadim.chilinciuc
 */

export const DynamicLink = ({ router, to, children }: DynamicLinkProps) => {
  const isReactRouter = typeof router?.history !== 'undefined';
  const isNextRouter = typeof router?.push !== 'undefined';

  if (isReactRouter) {
    return (
      <a
        onClick={() => router.history.push(to)}
        className={'font-semiBold'}
        style={{ textDecoration: 'none', cursor: 'pointer' }}
      >
        {children}
      </a>
    );
  } else if (isNextRouter) {
    return (
      <a
        onClick={() => router.push(to)}
        className={'font-semiBold'}
        style={{ textDecoration: 'none', cursor: 'pointer' }}
      >
        {children}
      </a>
    );
  } else {
    // Handle the case when neither React Router nor Next.js Router is detected
    return (
      <a
        href={to}
        className={'font-semiBold'}
        style={{ textDecoration: 'none' }}
      >
        {children}
      </a>
    );
  }
};

export const NsDropDown = ({
  router,
  dropdownItems,
  onLogout,
  children,
  dropDownConfiguration,
}: IDropDown) => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event: any) => {
    setIsOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setIsOpen(false);
    setAnchorEl(null);
  };

  const handleMenuItemClick = (item: any) => {
    handleMenuClose(); // Close the menu after an item is clicked
  };

  return (
    <>
      <div style={{ cursor: 'pointer' }} onClick={handleMenuOpen}>
        {children}
      </div>

      <React.Fragment>
        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          open={isOpen}
          keepMounted
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: dropDownConfiguration?.anchorOrigin?.vertical,
            horizontal: dropDownConfiguration?.anchorOrigin?.horizontal,
          }}
          transformOrigin={{
            vertical: dropDownConfiguration?.transformOrigin?.vertical,
            horizontal: dropDownConfiguration?.transformOrigin?.horizontal,
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
          {dropdownItems &&
            dropdownItems.length > 0 &&
            dropdownItems.map((item: any, index: number) => (
              <DynamicLink to={item.path} router={router} key={index}>
                <MenuItem>
                  <ListItemIcon>{item.icon || <HomeIcon />}</ListItemIcon>
                  {item.name}
                </MenuItem>
                <Divider />
              </DynamicLink>
            ))}
          <MenuItem onClick={() => handleMenuItemClick('Logout')}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              style={{ color: '#FFF' }}
              onClick={onLogout}
            />
          </MenuItem>
        </Menu>
      </React.Fragment>
    </>
  );
};
