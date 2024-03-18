import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { NsPageHeader } from '../../../components/components/PageHeader/NsPageHeader';
import { NsButton } from '../../../components/components/NsButton';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const meta: Meta<typeof NsPageHeader> = {
  title: 'Patterns/Page Header',
  component: NsPageHeader,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
};

export const IPageHeader: Story = {
  args: {
    pageData: {
      title: 'TITLE',
      logoPath: './images/u11.png',
      subtitle: 'This is the subtitle',
      pageHeaderButton: [
        {
          childComponent: <NsButton>Button</NsButton>,
          handleFunction: () => {
            console.log('Button Clicked!');
          },
        },
      ],
    },
    configuration: {
      backgroundColor: '#E5EDEEFC',
      color: '#282727',
    },
  },
};

export default meta;
type Story = StoryObj<typeof NsPageHeader>;
