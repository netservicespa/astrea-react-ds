import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { NsDropDown } from 'src/components/components/dropdown/NsDropDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const meta: Meta<typeof NsDropDown> = {
    title: 'Components/Dropdown',
    component: NsDropDown,
};

export default meta;
type Story = StoryObj<typeof NsDropDown>;

export const INsDropDown: Story = {
    args: {
        children: <AccountCircleIcon />,
        dropdownItems: [
            { name: 'Profile', path: '/', icon: <PersonIcon /> },
            { name: 'User Managment', path: '/link2', icon: <SettingsIcon /> },
        ],
        overlay: true,
        onLogout: () => {},
        dropDownConfiguration: {
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'left',
            },
            transformOrigin: {
                vertical: 'top',
                horizontal: 'left',
            },
        },
    },
};
