import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
	INotificationData,
	NotificationComponent,
} from "../../../components/components/notification/NotificationComponent";
import {StoryFn} from "@storybook/react";
import {Header} from "../../../components/patterns/navigation/Header";

const meta: Meta<typeof NotificationComponent> = {
	title: 'Patterns/Notification panel',
	component: NotificationComponent
};

export default meta;
type Story = StoryObj<typeof NotificationComponent>;

/**
 * Notification Component's Stories
 * @author vadim.chilinciuc
 */



const Template: StoryFn<typeof NotificationComponent> = (args:INotificationData) => {
	const title= {
		bold: 'Application',
		thin: 'title',
		subtitle: 'version 1.0.0',
	}
	return(
		<Header title={title} notificationData={args.notificationData} configuration={{centralLogo:false}}/>
	);
};
export const INotificationComponent = Template.bind({});


INotificationComponent.args = {
	notificationData: {
		unread: [
			{ id: 1,  status:'valid', text: 'Search "TCP" save successfully' },
			{ id: 2,  status:'invalid', text: 'ghgjgfsdf.pcap' },
			{ id: 2,  status:'invalid', text: 'new_123aaaa8.pcap' },
			{ id: 2,  status:'valid', text: 'ghgjgfsdfyui.pcap' },
		],
		read:[
			{ id: 1,  status:'valid', text: 'sdganhbasddd.pcap' },
			{ id: 2,  status:'invalid', text: 'ghgjgfsdf.pcap' },
			{ id: 2,  status:'valid', text: 'new_123aaaa8.pcap' },
			{ id: 2,  status:'valid', text: 'fsdfsfsfsfsfsdssssssyui.pcap' },
			{ id: 1,  status:'valid', text: 'nerver_123_new.pcap' },
			{ id: 2,  status:'valid', text: 'Changes discarded.pcap' },
			{ id: 2,  status:'invalid',text: 'new_123aaaa8.pcap' },
		]
	},
};

