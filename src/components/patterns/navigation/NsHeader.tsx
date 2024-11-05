import React from 'react';
import VerticalHeader from './headers/VerticalHeader';
import HorizontalHeader from './headers/HorizontalHeader';
import { HeaderProps } from '../../../util/types';
import MegamenuHeader from './headers/MegamenuHeader';

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
