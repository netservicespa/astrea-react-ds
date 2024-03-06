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
  NsDropDown,
  DynamicLink,
} from '../../../components/Dropdown/NsDropDown';
import {
  INotificationData,
  NsNotification,
} from '../../../components/notification/NsNotification';
import { useTranslation } from 'react-i18next';

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
    border-bottom: 0px solid ${theme.header.borderColor};
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

interface UserMenuProps {
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
        <span
          aria-label={t('header.notifications')}
          title={t('header.openNotifications')}
        >
          <NsNotification {...notificationData}>
            <NotificationsNoneOutlinedIcon />
          </NsNotification>{' '}
          <Box sx={{ display: { xs: 'inline-block', md: 'none' } }}>
            {t('header.notifications')}
          </Box>
        </span>
      )}
      {userPanelMenuItems && (
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
          >
            <AccountCircleIcon />
          </NsDropDown>{' '}
          <Box sx={{ display: { xs: 'inline-block', md: 'none' } }}>
            {t('header.account')}
          </Box>
        </span>
      )}
    </nav>
  );
};

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

  // @ts-ignore
  return (
    <HeaderContainer configuration={configuration}>
      <LogoContainer configuration={configuration}>
        <DynamicLink key={'/'} to={'/'} router={router}>
          {logo ?? (
            <Box
              component="img"
              src="./images/logo-light.png"
              alt="logo"
              sx={{ maxHeight: '45px' }}
            />
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
          style={{
            color: 'white',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
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
              {item.name}
            </DynamicLink>
          ))}
        </nav>
        <AuthContainer>
          <UserMenu
            userPanelMenuItems={userPanelMenuItems}
            notificationData={notificationData}
            router={router}
            onLogout={onLogout}
            configuration={configuration}
          />
        </AuthContainer>
      </NavigationContainer>
    </HeaderContainer>
  );
}
