import {Meta, StoryObj} from '@storybook/react';
import React from 'react';
import {PageHeader} from "../../../components/components/PageHeader/PageHeader";
import {NsButton} from "../../../components/components/NsButton";
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';



const meta: Meta<typeof PageHeader> = {
	title: 'Patterns/Page Header',
	component: PageHeader,
	parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
};

export const IPageHeader: Story = {
	args: {
		onClose: () => {
		},
		pageData: {
			title: 'TITLE',
			logoPath: './images/u11.png',
			subtitle: 'This is the subtitle',
			pageHeaderButton: [
				{
					childComponent: <NsButton>Button</NsButton>,
					handleFunction: () => {
						console.log("Button Clicked!")
					}
				}
			]
		},
		configuration: {
			backgroundColor: '#E5EDEEFC',
			color: '#282727',
		},
	}
}

export default meta;
type Story = StoryObj<typeof PageHeader>;
