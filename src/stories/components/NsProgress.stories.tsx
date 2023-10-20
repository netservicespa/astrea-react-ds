import React from 'react';
import { NsProgress } from '../../components/components/NsProgress';
import { BatteryChargingFull } from '@mui/icons-material';
import StorageIcon from '@mui/icons-material/Storage';

export default {
  title: 'Components/Progress',
  component: NsProgress,
  argTypes: {
    icon: {
      options: ['Storage', 'BatteryChargingFull'],
      mapping: {
        Storage: StorageIcon,
        BatteryChargingFull: BatteryChargingFull,
      },
      control: { type: 'select' },
    },
    percent: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    percentSuffix: {
      control: 'text',
    },
    totalSize: {
      control: 'number',
    },
  },
};

const Template = (args) => <NsProgress {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: StorageIcon,
  percent: 16,
  percentSuffix: 'FULL',
  totalSize: 8,
};
