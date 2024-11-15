import * as React from 'react';
import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import { NsNotificationList } from 'src/components/components/NsNotificationList';

export default {
    title: 'Components/NotificationList',
    component: NsNotificationList,
    argTypes: {
        typeNotification: {
            control: {
                type: 'select',
                options: ['basic', 'classic'],
            },
        },
        actionButtons: {
            control: 'boolean',
        },
        pagination: {
            control: 'boolean',
        },
    },
} as Meta<typeof NsNotificationList>;

const Template: StoryFn<typeof NsNotificationList> = (args) => <NsNotificationList {...args} />;

export const Default = Template.bind({});
Default.args = {
    notifications: [
        {
            id: '1',
            date: '2024-11-10',
            title: 'Notification 1',
            description: 'This is the description for notification 1.',
            readNotification: false,
        },
        {
            id: '2',
            date: '2024-11-11',
            title: 'Notification 2',
            description: 'This is the description for notification 2.',
            readNotification: true,
        },
        {
            id: '3',
            date: '2024-11-12',
            title: 'Notification 3',
            description: 'This is the description for notification 3.',
            readNotification: false,
        },
    ],
    typeNotification: 'classic',
    actionButtons: true,
    pagination: true,
    handleView: () => alert('View button clicked'),
    handleAction: () => alert('Action button clicked'),
};
