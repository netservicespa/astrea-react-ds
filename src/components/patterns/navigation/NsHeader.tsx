import React from 'react';
import VerticalHeader from './headers/VerticalHeader';
import HorizontalHeader from './headers/HorizontalHeader';
import MegamenuHeader from './headers/MegamenuHeader';
import { INotificationData } from 'src/components/components/notification/NsNotification';
import { IDropDownConfiguration, IDropdownItems } from 'src/components/components/dropdown/NsDropDown';

export type ApplicationTitle = {
    bold: string;
    thin: string;
    subtitle: string;
};
export interface IUserPanelItem {
    name: string;
    path: string;
    icon: React.ReactElement;
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
    menuItems?: IDropdownItems[];

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
     * Optional: The info displayed in the header.
     */
    infoBox?: React.ReactElement;

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
export const NsHeader = ({
    type = 'horizontal',
    onLogout = undefined,
    menuItems,
    router,
    notificationData,
    userPanelMenuItems,
    logo,
    configuration,
    columns,
    infoBox,
}: HeaderProps) => {
    if (type === 'vertical') {
        return (
            <VerticalHeader
                type={type}
                menuItems={menuItems}
                router={router}
                logo={logo}
                notificationData={notificationData}
                onLogout={onLogout}
                configuration={configuration}
            />
        );
    }
    if (type === 'megamenu') {
        return (
            <MegamenuHeader
                type={type}
                columns={columns}
                router={router}
                logo={logo}
                notificationData={notificationData}
                userPanelMenuItems={userPanelMenuItems}
                onLogout={onLogout}
                configuration={configuration}
            />
        );
    }
    return (
        <HorizontalHeader
            type={type}
            menuItems={menuItems}
            columns={columns}
            router={router}
            logo={logo}
            notificationData={notificationData}
            userPanelMenuItems={userPanelMenuItems}
            configuration={configuration}
            onLogout={onLogout}
            infoBox={infoBox}
        />
    );
};
