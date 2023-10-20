import React, { useState, useEffect } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Box } from "@mui/material";
import { FullPageSpinner, FullPageSpinnerProps } from '../../components/FullPageSpinner';

export default {
  title: 'Components/Spinner',
  component: FullPageSpinner,
    argTypes: {
        color: {
            label: 'Color',
            control: { type: 'radio' },
            options: ['primary', 'secondary', 'success', 'error'],
            defaultValue:'secondary',
        },
        variant: {
            label: 'Variant',
            control: { type: 'radio' },
            options: ['indeterminate', 'determinate'],
            defaultValue:'indeterminate',
        },
    },
} as Meta<typeof FullPageSpinner>;

const Template: StoryFn<FullPageSpinnerProps> = (args) => {
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
      <FullPageSpinner {...args} value={progress} />
    </Box>
  );
};

export const LoadingSpinner = Template.bind({});
LoadingSpinner.args = {
  isOpen: true,
  value: 50,
  variant: 'determinate',
  color: 'secondary',
};


const IndeterminateLoadingTemplate: StoryFn<FullPageSpinnerProps> = (args) => {
  const { value, variant } = args;
  const [progress, setProgress] = useState(value);

  useEffect(() => {
    if (variant === 'determinate') {
      setProgress(value);
    } else {
      const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
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
      <FullPageSpinner {...args} value={progress} />
    </Box>
  );
};

export const SpinnerWithProgressLabel = IndeterminateLoadingTemplate.bind({});
SpinnerWithProgressLabel.args = {
  isOpen: true,
  value: 50,
  variant: 'indeterminate',
  color: 'secondary',
};