import React from 'react';

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
   * Defines the type of the header (vertical or horizontal).
   */
  type: 'vertical' | 'horizontal';
  /**
   * The title displayed in the header.
   */
  title?: ApplicationTitle;
  /**
   *
   * Optional callback, invoked when ,logout is clicked.
   */
  onLogout?: () => void;
  /**
   * Router object required for enabling routing functionality.
   */
  router?: any;
  /**
   * An array of header menu items that redirect to specific paths when clicked.
   */
  menuItems?: MenuItem[];
  /**
   * Configuration for enabling notification functionality
   *
   * (Bell Icon ).
   *
   * Consult 'Notification Panel Component' for More Info about the data .
   */
  notificationData?: {
    read: IReadWrite[];
    unread: IReadWrite[];
  };
  /**
   * Configuration for enabling user panel functionality
   *
   * ( User Icon ).
   *
   * Consult 'User Panel Component' for More Info about the data .
   */
  userPanelMenuItems?: IUserPanelItem[];
  /**
   *
   * The logo displayed in the header.
   */
  logo?: React.ReactElement;
  /**
   *
   * Extra configuration options for:
   * - Managing the header logo position. If centralLogo=true, the logo will be centered.
   * - Managing the User Panel dropdown configuration.
   */
  configuration: {
    centralLogo: boolean;
    dropDownConfiguration?: IDropDownConfiguration | undefined;
  };
}

export interface UserPanelProps {
  title: ApplicationTitle;
  user: any;
  menuItems: MenuItem[];
  router?: any;
  userPanelMenuItems: IUserPanelItem[];
  logo?: React.ReactElement;
  configuration: {
    centralLogo: boolean;
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

  userPanelMenuItems?: any;

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

export interface IReadWrite {
  id: number;
  status: string;
  text: string;
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
