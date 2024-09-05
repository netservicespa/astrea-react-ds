import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import { useSnackbar } from 'notistack';
import { NsNotifier } from 'src/components/notifier/NsNotifier';

export default {
  title: 'Components/Notifier',
  component: NsNotifier,
  parameters: {
    docs: { source: { type: 'code' } },
  },
  argTypes: {
    message: {
      label: 'Messaggio',
      type: 'string',
    },
    type: {
      label: 'Tipologia',
      control: { type: 'radio' },
      options: ['info', 'success', 'warning', 'error'],
    },
  },
} as Meta<typeof NsNotifier>;

const Template: StoryFn<typeof NsNotifier> = (args) => {
  const Content = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    return (
      <Container>
        <Typography component="p">
          Clicca il pulsante per mostrare la notifica.
        </Typography>
        <Box mt={4} textAlign="center">
          <Button
            variant="contained"
            onClick={() =>
              enqueueSnackbar(args.message, { variant: args.type })
            }
          >
            Invia notifica!
          </Button>
        </Box>
      </Container>
    );
  };

  return (
    <NsNotifier {...args}>
      <Content />
    </NsNotifier>
  );
};

export const Notifiche = Template.bind({});
Notifiche.args = {
  message: 'Prova!',
  type: 'warning',
  variant: 'filled',
};
