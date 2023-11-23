import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { Header } from '../../../components/patterns/navigation/Header';
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
/**
 * Headers are containers attached to the top of a page that allow the user to navigate through the application.
 *
 */
const meta: Meta<typeof Header> = {
  title: 'Patterns/Navigation/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const UserPanelHeader: Story = {
  args: {
    type: 'horizontal',
    title: {
      bold: 'Application',
      thin: 'title',
      subtitle: 'version 1.0.0',
    },
    menuItems: [
      { name: 'Link 1', path: '#' },
      { name: 'Link 2', path: '#' },
      { name: 'Link 3', path: '#' },
      { name: 'Link 4', path: '#' },
    ],
    userPanelMenuItems: [
      { name: 'Profile', path: '/', icon: <PersonIcon /> },
      { name: 'User Managment', path: '/link2', icon: <SettingsIcon /> },
    ],
    configuration:{
      centralLogo:false,
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

export const LoggedIn: Story = {
  args: {
    title: {
      bold: 'Application',
      thin: 'title',
      subtitle: 'version 1.0.0',
    },
    menuItems: [
      { name: 'Link 1', path: '#' },
      { name: 'Link 2', path: '#' },
      { name: 'Link 3', path: '#' },
      { name: 'Link 4', path: '#' },
    ],
  },
};

export const Mobile: Story = {
  args: {
    title: {
      bold: 'Application', 
      thin: 'title',
      subtitle: 'version 1.0.0',
    },
    menuItems: [
      { name: 'Link 1', path: '#' },
      { name: 'Link 2', path: '#' },
      { name: 'Link 3', path: '#' },
      { name: 'Link 4', path: '#' },
    ],
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphone6',
    },
  },
};

export const VerticalHeader: Story = {
  args: {
    type: 'vertical',
    title: {
      bold: 'Application', 
      thin: 'title',
      subtitle: 'version 1.0.0',
    },
    menuItems: [
      { name: 'Link 1', path: '#' },
      { name: 'Link 2', path: '#' },
      { name: 'Link 3', path: '#' },
      { name: 'Link 4', path: '#' },
    ],
  },
};



