import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { NsButton } from '../../../components/components/NsButton';
import { NsTabs } from '../../../components/components/tabs/NsTabs';

const meta: Meta<typeof NsTabs> = {
  title: 'Components/Tabs',
  component: NsTabs,
  parameters: {
    componentSubtitle: 'A customizable tabs component.',
    docs: {
      description: {
        component:
          '`NsTabs` is a component that renders a set of navigable tabs. Each tab can be individually labeled and contains customizable content.',
      },
    },
  },
  argTypes: {
    tabs: {
      description:
        'An array of tab objects each containing an id, a label to display on the tab and the children content to display when the tab is active.',
      control: 'object',
      table: {
        category: 'Content',
        type: {
          summary:
            'Array<{id: string; label: string; children: React.ReactNode;}>',
        },
        defaultValue: {
          summary: '[]',
        },
      },
    },
  },
};

const Template = (args) => <NsTabs {...args} />;

export const Tabs = Template.bind({});
Tabs.args = {
  tabs: [
    { id: '0', label: 'Tab 1 ', children: 'Tab 1' },
    {
      id: '1',
      label: 'Tab 2',
      children: 'Example of noPadding',
      noPadding: true,
    },
    { id: '2', label: 'Tab 3', children: <NsButton>Some Text</NsButton> },
    { id: '3', label: 'Tab 4', children: 'Tab 4' },
  ],
};

export default meta;
type Story = StoryObj<typeof NsTabs>;
