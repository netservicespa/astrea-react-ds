import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import {DropdownComponent} from "../../../components/components/Dropdown/DropDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const meta: Meta<typeof DropdownComponent> = {
	title: 'Components/DropDown',
	component: DropdownComponent
};

export default meta;
type Story = StoryObj<typeof DropdownComponent>;

export const IDropDownComponent: Story = {
	args: {
		children: <AccountCircleIcon  />,
		dropdownItems: [
			{ name: 'Profile', path: '/', icon: <PersonIcon /> },
			{ name: 'User Managment', path: '/link2', icon: <SettingsIcon /> },
		],
		onLogout:()=>{} ,
		dropDownConfiguration:{
			anchorOrigin:{
				vertical: "top",
				horizontal: "left",
			},
			transformOrigin:{
				vertical: "top",
				horizontal: "left",
			}
		}
	},
};


