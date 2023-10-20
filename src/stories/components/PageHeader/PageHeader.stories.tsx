import {Meta, StoryObj} from '@storybook/react';
import React from 'react';
import {PageHeader} from "../../../components/components/PageHeader/PageHeader";
import {NsButton} from "../../../components/components/NsButton";

/**
 * Page Header Stories
 * @author vadim.chilinciuc
 */


const meta: Meta<typeof PageHeader> = {
	title: 'Patterns/Page Header',
	component: PageHeader,
};

export const IPageHeader: Story = {
	args: {
		onClose: () => {
		},
		pageData: {
			title: 'EDIT MODE',
			logoPath: './images/u11.png',
			subtitle: 'Forensic_challenge_4.pcap',
			pageHeaderButton: [
				{
					childComponent: <NsButton>Some Text</NsButton>,
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
