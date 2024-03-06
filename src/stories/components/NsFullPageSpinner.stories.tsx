import React, { useState, useEffect } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Box } from '@mui/material';
import {
  NsFullPageSpinner,
  NsFullPageSpinnerProps,
} from '../../components/NsFullPageSpinner';

export default {
  title: 'Components/Loader',
  component: NsFullPageSpinner,
  argTypes: {
    variant: {
      label: 'Variant',
      control: { type: 'radio' },
      options: ['indeterminate', 'determinate'],
      defaultValue: 'indeterminate',
    },
  },
} as Meta<typeof NsFullPageSpinner>;

const Template: StoryFn<NsFullPageSpinnerProps> = (args) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box
      sx={{
        width: 200,
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <NsFullPageSpinner {...args} value={progress} />
    </Box>
  );
};

export const LoadingLoader = Template.bind({});
LoadingLoader.args = {
  isOpen: true,
  value: 50,
  variant: 'determinate',
};

const IndeterminateLoadingTemplate: StoryFn<NsFullPageSpinnerProps> = (
  args
) => {
  const { value, variant } = args;
  const [progress, setProgress] = useState(value);

  useEffect(() => {
    if (variant === 'determinate') {
      setProgress(value);
    } else {
      const timer = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 0 : prevProgress + 10
        );
      }, 800);
      return () => {
        clearInterval(timer);
      };
    }
  }, [value, variant]);

  return (
    <Box
      sx={{
        width: 200,
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <NsFullPageSpinner {...args} value={progress} />
    </Box>
  );
};

export const LoaderWithProgressLabel = IndeterminateLoadingTemplate.bind({});
LoaderWithProgressLabel.args = {
  isOpen: true,
  value: 50,
  variant: 'indeterminate',
};
