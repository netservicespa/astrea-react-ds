import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { NsButton } from '../../../components/components/NsButton';
import { TabsComponent } from '../../../components/components/tabs/Tabs';

const meta: Meta<typeof TabsComponent> = {
  title: 'Components/Tabs',
  component: TabsComponent,
};

export const ITabsComponent: Story = {
  args: {
    tabs: [
      { id: '0', label: 'Tab 1 ', children: <NsButton>Some Text</NsButton> },
      { id: '1', label: 'Tab 2', children: 'Tab 2' },
      { id: '2', label: 'Tab 3', children: <NsButton>Some Text</NsButton> },
      { id: '3', label: 'Tab 4', children: 'Tab 4' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof TabsComponent>;
