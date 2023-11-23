import React from 'react';
import VerticalHeader from './headers/VerticalHeader';
import HorizontalHeader from './headers/HorizontalHeader';
import {HeaderProps} from 'src/util/types';

export const Header = ({
						   type = 'horizontal',
						   title,
						   onLogout,
						   menuItems,
						   router,
						   notificationData,
						   userPanelMenuItems,
						   logo,
						   configuration,
					   }: HeaderProps) => {
	if (type === 'vertical') {
		return (
			<VerticalHeader
				type={type}
				menuItems={menuItems}
				router={router}
				title={title}
				logo={logo}
				notificationData={notificationData}
				onLogout={onLogout}
				configuration={configuration}/>
		);
	}
	return (
		<HorizontalHeader
			type={type}
			menuItems={menuItems}
			router={router}
			title={title}
			logo={logo}
			notificationData={notificationData}
			userPanelMenuItems={userPanelMenuItems}
			configuration={configuration}
			onLogout={onLogout}
		/>
	);
};