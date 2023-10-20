import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { NsButton } from '../../components/components/NsButton';
import { ButtonProps } from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

const ICONS_MAP = {
  Delete: <DeleteIcon />,
  Edit: <EditIcon />,
  Save: <SaveIcon />,
};

export default {
  title: 'Components/Button',
  component: NsButton,
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: '<NsButton {...args} />',
      },
    },
  },
  argTypes: {
    variant: {
      label: 'Variant',
      control: { type: 'radio' },
      options: ['text', 'outlined', 'contained'],
    },
    color: {
      label: 'Color',
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'success', 'error'],
    },
    disabled: {
      label: 'Disabled',
      control: { type: 'boolean' },
      defaultValue: false,
    },
    size: {
      label: 'Size',
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
    },
  },
} as Meta<ButtonProps>;

const Template: StoryFn<ButtonProps> = (args) => {
  return (
    <Box>
      <Typography variant="h4" mb={2}>Filled</Typography>
      <Grid container spacing={3}>
        <Grid item xs={6} md={3}>
          <NsButton {...args} size="large" variant="contained" />
        </Grid>
        <Grid item xs={6} md={3}>
          <NsButton {...args} size="medium" variant="contained" />
        </Grid>
        <Grid item xs={6} md={3}>
          <NsButton {...args} size="small" variant="contained" />
        </Grid>
      </Grid>

      <Typography variant="h4" mt={4} mb={2}>Outlined</Typography>
      <Grid container spacing={3}>
        <Grid item xs={6} md={3}>
          <NsButton {...args} size="large" variant="outlined" />
        </Grid>
        <Grid item xs={6} md={3}>
          <NsButton {...args} size="medium" variant="outlined" />
        </Grid>
        <Grid item xs={6} md={3}>
          <NsButton {...args} size="small" variant="outlined" />
        </Grid>
      </Grid>
    </Box>
  );
};

export const DefaultButton = Template.bind({});
DefaultButton.args = {
  color: 'primary',
  children: 'Click me',
};

export const SecondaryButton = Template.bind({});
SecondaryButton.args = {
  color: 'secondary',
  children: 'Click me',
};

export const ErrorButton = Template.bind({});
ErrorButton.args = {
  color: 'error',
  children: 'Click me',
};

export const DisabledButton = Template.bind({});
DisabledButton.args = {
  color: 'primary',
  children: 'Click me',
  disabled: true
};

