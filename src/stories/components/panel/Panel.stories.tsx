import {Meta, StoryFn, StoryObj} from '@storybook/react';
import React from 'react';

import {Panel} from "../../../components/components/panel/Panel";


const meta: Meta<typeof Panel> = {
	title: 'Components/Panel',
	component: Panel,
};

export const IPanel: Story = {
	args:{
		type:'primary',
		title:'Basic panel',
		subtitle:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus justo tellus, laoreet vel massa et, ornare luctus tellus. Aenean ultricies massa augue. Suspendisse a vestibulum tortor. In hac habitasse platea dictumst.'
	}
}

export default meta;
type Story = StoryObj<typeof Panel>;
