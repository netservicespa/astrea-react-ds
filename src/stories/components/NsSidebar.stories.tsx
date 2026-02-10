import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Box, Button } from '@mui/material';
import { NsSidebar } from '../../components/components/sidebar/NsSidebar';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import SettingsIcon from '@mui/icons-material/Settings';

export default {
  title: 'Components/NsSidebar',
  component: NsSidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A vertical navigation sidebar with collapsible menu system, icon-based navigation, and responsive behavior. Perfect for application-wide navigation with support for active state highlighting.',
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls whether the sidebar is expanded or collapsed',
      defaultValue: true,
    },
    hidden: {
      control: 'boolean',
      description: 'Completely hides the sidebar when set to true',
      defaultValue: false,
    },
    currentPath: {
      control: 'text',
      description: 'Current route path used to highlight the active menu item',
      defaultValue: '/dashboard',
    },
    menuLabel: {
      control: 'text',
      description: 'Label text displayed at the top of the menu section',
      defaultValue: 'Menu',
    },
    autoCloseOnSmallScreen: {
      control: 'boolean',
      description: 'Automatically collapses sidebar on small screens (≤1280px)',
      defaultValue: true,
    },
    headerHeight: {
      control: 'text',
      description: 'Header height used to calculate sidebar height (e.g., "64px")',
      defaultValue: '64px',
    },
  },
} as Meta<typeof NsSidebar>;

const Template: StoryFn<typeof NsSidebar> = (args) => {
  const [open, setOpen] = useState(args.open);
  const [currentPath, setCurrentPath] = useState(args.currentPath);

  const handleToggle = () => setOpen(!open);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    console.log('Navigate to:', path);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <NsSidebar
        {...args}
        open={open}
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onOpenChange={setOpen}
      />
      <Box sx={{ flex: 1, p: 3 }}>
        <Button variant="contained" onClick={handleToggle} sx={{ mb: 2 }}>
          Toggle Sidebar
        </Button>
        <Box>
          <h1>Main Content</h1>
          <p>Current path: {currentPath}</p>
          <p>Sidebar: {open ? 'Open' : 'Closed'}</p>
        </Box>
      </Box>
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  open: true,
  hidden: false,
  currentPath: '/dashboard',
  menuLabel: 'Menu',
  headerHeight: '64px',
  autoCloseOnSmallScreen: true,
  menuItems: [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <SpaceDashboardOutlinedIcon />,
    },
    {
      name: 'Eventi',
      path: '/events',
      icon: <CalendarMonthOutlinedIcon />,
    },
    {
      name: 'Aziende',
      path: '/company',
      icon: <BusinessRoundedIcon />,
    },
  ],
  bottomMenuItems: [
    {
      name: 'Support',
      path: '/support',
      icon: <HelpOutlineOutlinedIcon />,
    },
    {
      name: 'Impostazioni',
      path: '/settings',
      icon: <SettingsIcon />,
    },
  ],
};


export const WithBottomContent = Template.bind({});
WithBottomContent.args = {
  ...Default.args,
  open: true,
  content: (
    <Box
      sx={{
        p: 2,
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        textAlign: 'center',
      }}
    >
      <p>Additional content</p>
    </Box>
  ),
};

export const MinimalMenu = Template.bind({});
MinimalMenu.args = {
  open: true,
  hidden: false,
  currentPath: '/dashboard',
  // menuLabel: 'Navigation',
  headerHeight: '64px',
  autoCloseOnSmallScreen: true,
  menuItems: [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <SpaceDashboardOutlinedIcon />,
    },
    {
      name: 'Eventi',
      path: '/events',
      icon: <CalendarMonthOutlinedIcon />,
    },
    {
      name: 'Aziende',
      path: '/company',
      icon: <BusinessRoundedIcon />,
    },
  ],
};
