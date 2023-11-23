import React from 'react';
import { INotificationData } from 'src/components/components/notification/NotificationComponent';

export type User = {
  name: string;
};

export type ApplicationTitle = {
  bold: string;
  thin: string;
  subtitle: string;
};

export type MenuItem = {
  name: string;
  path: string;
  icon?: React.ReactElement;
};

interface IUserPanelItem {
  name: string;
  path: string;
  icon: React.ReactElement;
}

interface IDropdownItems {
  name: string;
  path: string;
  icon: React.ReactElement;
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

export interface HeaderProps {
  /**
   * Type of the header, which can be either 'vertical' or 'horizontal'.
   */
  type: 'vertical' | 'horizontal';

  /**
   * Optional: The title to be displayed in the header.
   */
  title?: ApplicationTitle;

  /**
   * Optional: Callback function invoked when the logout option is clicked.
   */
  onLogout?: () => void;

  /**
   *  Router object required for enabling routing functionality.
   */
  router: any;

  /**
   * Optional: An array of header menu items that redirect to specific paths when clicked.
   */
  menuItems?: MenuItem[];

  /**
   * Optional: Configuration for enabling notification functionality (Bell Icon).
   *
   * See 'Notification Panel Component' for more details about the data.
   */
  notificationData?: INotificationData;

  /**
   * Optional: Configuration for enabling user panel functionality (User Icon).
   *
   * See 'User Panel Component' for more details about the data.
   */
  userPanelMenuItems?: IUserPanelItem[];

  /**
   * Optional: The logo displayed in the header.
   */
  logo?: React.ReactElement;

  /**
   * Optional: Extra configuration options for:
   * - Managing the header logo position. If centralLogo=true, the logo will be centered.
   * - Managing the User Panel dropdown configuration.
   */
  configuration: {
    centralLogo?: boolean;
    dropDownConfiguration?: IDropDownConfiguration | undefined;
  };
}

export interface UserPanelProps {
  title: ApplicationTitle;
  router?: any;
  userPanelMenuItems: IUserPanelItem[];
  logo?: React.ReactElement;
  configuration: {
    centralLogo?: boolean;
    dropDownConfiguration?: IDropDownConfiguration | undefined;
  };
  onLogout: () => void;
}

export interface ILink {
  href: string;
  text: string;
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
