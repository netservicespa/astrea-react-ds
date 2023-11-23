import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {UserPanel} from "../../../components/components/userPanel/UserPanel";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";

/**
 * Use the User panel component to display important options to the user.
 */

const meta: Meta<typeof UserPanel> = {
	title: 'Patterns/UserPanel',
	component: UserPanel
};
export default meta;
type Story = StoryObj<typeof UserPanel>;

export const IUserPanel: Story = {
	args: {
		title: {
			bold: 'Application',
			thin: 'title',
			subtitle: 'version 1.0.0',
		},
		userPanelMenuItems: [
			{ name: 'Profile', path: '/', icon: <PersonIcon /> },
			{ name: 'User Managment', path: '/link2', icon: <SettingsIcon /> },
		],
		configuration:{
			dropDownConfiguration: {
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right',
				},
				transformOrigin: {
					vertical: 'top',
					horizontal: 'right',
				},
			}
		},
		router:	null,
		onLogout:()=>{} ,
	},
};


