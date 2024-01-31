import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import SkipLink, { SkipLinkProps } from '../../components/components/NsSkipLink';
import { Box } from '@mui/material';

export default {
  title: 'Components/SkipLink',
  component: SkipLink,
} as Meta;

const Template: StoryFn<SkipLinkProps> = (args) => {
  return (
    <Box>
      <SkipLink {...args} />
      <Box sx={{ mt: 4 }}>
        <h1 id="main">Page title</h1>
      </Box>
    </Box>
  );
};
export const Default = Template.bind({});
Default.args = {
  href: "#main",
  children: 'Skip to main content',
};