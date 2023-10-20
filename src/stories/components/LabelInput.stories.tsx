import { Grid, MenuItem, Select, TextField } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { LabelInput } from '../../components/components/LabelInput';

export default {
  title: 'Components/LabelInput',
  component: LabelInput,
  argTypes: { label: { type: 'string' } },
} as Meta<typeof LabelInput>;

const Template: StoryFn<typeof LabelInput> = (args) => {
  return <LabelInput label={args.label}>{args.children}</LabelInput>;
};

export const Text = Template.bind({});
Text.args = {
  label: 'Label:',
  children: <TextField onChange={() => {}} />,
};

export const Combo = Template.bind({});
Combo.args = {
  label: 'Label:',
  children: (
    <Grid container>
      <Grid xs={12} md={6} item>
        <Select fullWidth>
          <MenuItem value={1}>Valore Uno</MenuItem>
          <MenuItem value={2}>Valore Due</MenuItem>
        </Select>
      </Grid>
    </Grid>
  ),
};
