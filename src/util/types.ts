import React from 'react';
import { INotificationData } from '../components/components/notification/NsNotification';
import { DialogActionsProps, DialogContentProps, DialogProps, DialogTitleProps } from '@mui/material';

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
    type: 'vertical' | 'horizontal' | 'megamenu';

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
    userPanelMenuItems?: IUserPanelItem[] | React.ReactNode;

    /**
     * Optional: The logo displayed in the header.
     */
    logo?: React.ReactElement;

    /**
     * An array of columns used to display multiple columns .
     */
    columns?: {
        title: string;
        links: { href: string; text: string }[];
    }[];

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
    userPanelMenuItems: IUserPanelItem[] | React.ReactNode;
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

/**
 * Props for the NsDialogTitle component, extending MUI's DialogTitleProps.
 */
export interface NsDialogTitleProps extends DialogTitleProps {
    /**
     * If true, a close button will be displayed in the dialog title.
     * You can also pass a custom string or React node to replace the default button.
     *
     * - `true`: Displays the default close button.
     * - `string`: Displays a custom text as the close button.
     * - `ReactNode`: Allows the rendering of a custom React component.
     *
     * Default is `false`, meaning no close button will be shown.
     */
    closeButton?: boolean | string | React.ReactNode;
    /**
     * Function to control the open/close state of the dialog.
     *
     * It takes a boolean argument:
     * - `true`: Opens the dialog.
     * - `false`: Closes the dialog.
     */
    setOpen: (arg0: boolean) => void;
}

/**
 * Props for the NsDialogContent component, extending MUI's DialogContentProps.
 * This interface inherits all properties from MUI's DialogContentProps without additional custom props.
 */
export interface NsDialogContentProps extends DialogContentProps {}

/**
 * Props for the NsDialogTitle component, extending MUI's DialogTitleProps.
 */
export interface NsDialogTitleProps extends DialogTitleProps {
    /**
     * If true, a close button will be displayed in the dialog title.
     * You can also pass a custom string or React node to replace the default button.
     *
     * - `true`: Displays the default close button.
     * - `string`: Displays a custom text as the close button.
     * - `ReactNode`: Allows the rendering of a custom React component.
     *
     * Default is `false`, meaning no close button will be shown.
     */
    closeButton?: boolean | string | React.ReactNode;

    /**
     * Function to control the open/close state of the dialog.
     *
     * It takes a boolean argument:
     * - `true`: Opens the dialog.
     * - `false`: Closes the dialog.
     */
    setOpen: (arg0: boolean) => void;
}

/**
 * Props for the NsdialogActions component, extending MUI's DialogActionsProps.
 */
export interface NsDialogActionsProps extends DialogActionsProps {
    /**
     * Determines if a cancel button should be displayed in the dialog actions.
     * You can pass:
     * - `true`: Displays the default cancel button.
     * - `string`: Displays a custom label as the cancel button.
     * - `ReactNode`: Allows rendering of a custom React component as the cancel button.
     *
     * Default is `false`, meaning no cancel button will be shown.
     */
    showCancelButton?: boolean | string | React.ReactNode;

    /**
     * Determines if a submit button should be displayed in the dialog actions.
     * You can pass:
     * - `true`: Displays the default submit button.
     * - `string`: Displays a custom label as the submit button.
     * - `ReactNode`: Allows rendering of a custom React component as the submit button.
     *
     * Default is `false`, meaning no submit button will be shown.
     */
    showSubmitButton?: boolean | string | React.ReactNode;

    /**
     * Function to control the open/close state of the dialog.
     *
     * It takes a boolean argument:
     * - `true`: Opens the dialog.
     * - `false`: Closes the dialog.
     */
    setOpen: (arg0: boolean) => void;
}
/**
 * Props for the NsdialogV3 component, extending MUI's DialogProps.
 */
export interface NsDialogProps extends DialogProps {
    /**
     * If true, a close button will be displayed in the dialog title.
     * You can also pass a custom string or React node to replace the default button.
     *
     * - `true`: Displays the default close button.
     * - `string`: Displays a custom text as the close button.
     * - `ReactNode`: Allows the rendering of a custom React component.
     *
     * Default is `false`, meaning no close button will be shown.
     */
    closeButton?: boolean | string | React.ReactNode;

    /**
     * Function to control the open/close state of the dialog.
     *
     * It takes a boolean argument:
     * - `true`: Opens the dialog.
     * - `false`: Closes the dialog.
     */
    setOpen: (open: boolean) => void;
}
