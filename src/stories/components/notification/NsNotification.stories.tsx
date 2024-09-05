import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  INotificationData,
  NsNotification,
} from 'src/components/components/notification/NsNotification';
import { StoryFn } from '@storybook/react';
import { NsHeader } from 'src/components/patterns/navigation/NsHeader';
import { Typography } from '@mui/material';

const meta: Meta<typeof NsNotification> = {
  title: 'Patterns/Notification panel',
  component: NsNotification,
};

export default meta;
type Story = StoryObj<typeof NsNotification>;

/**
 * Notification Component's Stories
 * @author vadim.chilinciuc
 */

const Template: StoryFn<typeof NsNotification> = (args: INotificationData) => {
  const title = {
    bold: 'Application',
    thin: 'title',
    subtitle: 'version 1.0.0',
  };
  return (
    <NsHeader
      title={title}
      notificationData={args}
      configuration={{ centralLogo: false }}
      type={'horizontal'}
      router={null}
    />
  );
};
export const INsNotification = Template.bind({});

INsNotification.args = {
  unread: {
    notifications: [
      {
        id: 1,
        status: 'valid',
        text: 'Search "TCP" save successfully',
      },
      { id: 2, status: 'invalid', text: 'ghgjgfsdf.pcap' },
      { id: 2, status: 'invalid', text: 'new_123aaaa8.pcap' },
      { id: 2, status: 'valid', text: 'ghgjgfsdfyui.pcap' },
    ],
    showMore: {
      router: null,
      to: '/',
      children: <Typography sx={{ color: 'red' }}>Show more</Typography>,
    },
    totalCount: 4,
  },
  read: {
    notifications: [
      { id: 1, status: 'valid', text: 'sdganhbasddd.pcap' },
      { id: 2, status: 'invalid', text: 'ghgjgfsdf.pcap' },
      { id: 2, status: 'valid', text: 'new_123aaaa8.pcap' },
      { id: 2, status: 'valid', text: 'fsdfsfsfsfsfsdssssssyui.pcap' },
      { id: 1, status: 'valid', text: 'nerver_123_new.pcap' },
      { id: 2, status: 'valid', text: 'Changes discarded.pcap' },
      { id: 2, status: 'invalid', text: 'new_123aaaa8.pcap' },
    ],
    totalCount: 4,
  },
};
