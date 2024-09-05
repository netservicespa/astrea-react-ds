import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NsUserPanel } from 'src/components/components/userPanel/NsUserPanel';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { Button, Stack } from '@mui/material';

/**
 * Use the User panel component to display important options to the user.
 */
const meta: Meta<typeof NsUserPanel> = {
  title: 'Patterns/UserPanel',
  component: NsUserPanel,
};
export default meta;
type Story = StoryObj<typeof NsUserPanel>;

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
    configuration: {
      dropDownConfiguration: {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      },
    },
    router: null,
    onLogout: () => {},
  },
};

export const CustomComponentUserPanel: Story = {
  args: {
    title: {
      bold: 'Application',
      thin: 'title',
      subtitle: 'version 1.0.0',
    },
    userPanelMenuItems: (
      <Stack direction="column" spacing={2} alignItems="center" sx={{p: '10px'}}>
        <span>Componente</span>
        <Button color="primary" variant="contained">Submit</Button>
      </Stack>
    ),
    configuration: {
      dropDownConfiguration: {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      },
    },
    router: null,
    onLogout: () => {},
  },
};
