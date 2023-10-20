import { css } from '@emotion/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { HeaderProps } from 'src/util/types';

import {
  DropdownComponent,
  DynamicLink,
} from '../../../components/Dropdown/DropDown';
import { NotificationComponent } from '../../../components/notification/NotificationComponent';

const HeaderContainer = styled('header')(
  ({ theme, configuration }: any) => css`
    border-bottom: ${!configuration ? '1px solid rgba(0, 0, 0, 0.1)' : '0px'};
    display: flex;
    flex-direction: column;
    font-family: ${theme.typography.fontFamily};
  `
);
const Logo = styled('svg')({
  height: 50,
  width: '100%',
  display: 'inline-block',
});
const LogoContainer = styled('div')(
  ({ theme, configuration }: any) => css`
    background-color: ${theme.header.backgroundColor};
    border-bottom: 8px solid ${theme.header.borderColor};
    padding: 20px 20px;
    display: flex;
    justify-content: ${!configuration?.centralLogo
      ? 'space-between'
      : 'center'};
    align-items: center;

    a {
      display: flex;
      align-items: center;
      min-width: ${!configuration?.centralLogo ? '370px' : undefined};

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
      display: none;
      cursor: pointer;
      color: #fff;
      font-weight: 599;

      @media (max-width: 768px) {
        display: block;
      }
    }
  `
);

const NavigationContainer = styled('div')(
  ({ theme, configuration }: any) => css`
    display: flex;
    justify-content: space-between;
    background-color: ${!configuration?.centralLogo
      ? theme.header.menuBackgroundColor
      : null};
    margin-bottom: 30px;
    padding: 6px 8px;

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
    }
  `
);

const AuthContainer = styled('div')(
  () => css`
    display: flex;
    justify-content: space-between;
    padding: 6px;
  `
);

export default function HorizontalHeader({
  menuItems,
  title,
  logo,
  notificationData,
  router,
  userPanelMenuItems,
  configuration,
  onLogout,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const UserMenu = ({
    notificationData,
    userPanelMenuItems,
    router,
    onLogout,
    configuration,
  }: any) => (
    <nav aria-label="Menu utente" style={{ alignItems: 'center' }}>
      {notificationData && (
        <span aria-label="Notifications" title="Open Notifications">
          <NotificationComponent notificationData={notificationData}>
            <NotificationsNoneOutlinedIcon />
          </NotificationComponent>{' '}
          <Box sx={{ display: { xs: 'inline-block', md: 'none' } }}>
            Notifications
          </Box>
        </span>
      )}
      {userPanelMenuItems && (
        <span
          aria-label="Account"
          title="Open Account"
          style={{ marginLeft: '20px' }}
        >
          <DropdownComponent
            router={router}
            userPanelMenuItems={userPanelMenuItems}
            onLogout={onLogout}
            dropDownConfiguration={configuration.dropDownConfiguration}
          >
            <AccountCircleIcon />
          </DropdownComponent>{' '}
          <Box sx={{ display: { xs: 'inline-block', md: 'none' } }}>
            Account
          </Box>
        </span>
      )}
    </nav>
  );
  // @ts-ignore
  return (
    <HeaderContainer configuration={configuration}>
      <LogoContainer configuration={configuration}>
        <DynamicLink key={'/'} to={'/'} router={router}>
          {logo ?? (
            <svg
              version="1.1"
              id="Livello_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 300.1 300"
              xmlSpace="preserve"
            >
              <path
                fill="#FFFFFF"
                className="st0"
                d="M227.2,77.4c-42.4,0-39.9,30.5-17.6,41.2c24.2,9.1,20.7,8.3,49.7,21.8c24.4,14.1,40,31,40.7,55.5V63
							c-1.2,4-12.5,30.7-13.7,32.5C272.3,89.2,247.6,75.3,227.2,77.4z"
              />
              <path
                fill="#FFFFFF"
                className="st0"
                d="M0.1,40.7L0.1,40.7l36.5,0c0,0,80.3,100.8,130.6,159c57.3,56,126.4-2.1,80-25.4c-43.3-21.8-76.9-24.1-88.4-59
							c-13.5-62.9,38-76.6,73.9-74.8c33.6,1.4,53.6,16.7,67.3,22.3V0H0v40.7H0.1z"
              />
              <path
                fill="#FFFFFF"
                className="st0"
                d="M299.6,205.1c-2.6,23.2-31.1,54.5-75.8,54.5c-65.9,0-85.3-37.7-103.6-59.9c-22.2-26.9-83.6-101-83.6-101v160.9
							H0.1v0H0V300h300V199.7C300,201.5,299.8,203.3,299.6,205.1z"
              />
            </svg>
          )}
          <div className="titles">
            <h1>
              <strong>{title?.bold}</strong> {title?.thin}
            </h1>
            <p className="subtitle">{title?.subtitle}</p>
          </div>
        </DynamicLink>
        <div
          className={!configuration?.centralLogo ? 'mobile-menu-icon' : ''}
          onClick={handleMenuToggle}
        >
          {isMenuOpen ? (
            <>
              <span>Menu</span> <KeyboardArrowUpIcon />
            </>
          ) : (
            <>
              <span>Menu</span> <KeyboardArrowDownIcon />
            </>
          )}
        </div>
      </LogoContainer>
      <NavigationContainer
        className={isMenuOpen ? 'open' : ''}
        configuration={configuration}
      >
        <nav aria-label="Menu principale">
          {menuItems?.map((item) => (
            <DynamicLink key={item.name} to={item.path} router={router}>
              <a>{item.name}</a>
            </DynamicLink>
          ))}
        </nav>
        <AuthContainer>
          <UserMenu
            notificationData={notificationData}
            userPanelMenuItems={userPanelMenuItems}
            router={router}
            onLogout={onLogout}
            configuration={configuration}
          />
        </AuthContainer>
      </NavigationContainer>
    </HeaderContainer>
  );
}
