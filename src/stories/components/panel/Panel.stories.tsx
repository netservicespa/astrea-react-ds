import { Meta, StoryObj } from '@storybook/react';

import { NsPanel } from '../../../components/components/panel/NsPanel';

const meta: Meta<typeof NsPanel> = {
  title: 'Components/Panel',
  component: NsPanel,
};

export const INsPanel: Story = {
  args: {
    type: 'primary',
    title: 'Basic NsPanel',
    subtitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus justo tellus, laoreet vel massa et, ornare luctus tellus. Aenean ultricies massa augue. Suspendisse a vestibulum tortor. In hac habitasse platea dictumst.',
  },
};

export default meta;
type Story = StoryObj<typeof NsPanel>;
