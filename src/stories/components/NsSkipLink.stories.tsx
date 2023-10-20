import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import SkipLink, { SkipLinkProps } from '../../components/components/NsSkipLink';

export default {
  title: 'Components/SkipLink',
  component: SkipLink,
} as Meta;

const Template: StoryFn<SkipLinkProps> = (args) => <SkipLink {...args} />;

export const Default = Template.bind({});
Default.args = {
  href: "#main",
  children: 'Skip to main content',
};