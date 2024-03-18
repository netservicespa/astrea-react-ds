import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import { SnackbarProvider } from 'notistack';
import { useNotifier } from '../../components/notifier/NotificationContext';
import { NsNotifier } from '../../components/notifier/NsNotifier';

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
    const { notify, dismiss, remove } = useNotifier();
    return (
      <Container>
        <Typography component="p">
          Clicca il pulsante per mostrare la notifica.
        </Typography>
        <Box mt={4} textAlign="center">
          <Button
            variant="contained"
            onClick={() => notify({ type: args.type, message: args.message })}
          >
            Invia notifica!
          </Button>
        </Box>
      </Container>
    );
  };

  return (
    <SnackbarProvider
      maxSnack={20}
      preventDuplicate
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <NsNotifier>
        <Content />
      </NsNotifier>
    </SnackbarProvider>
  );
};

export const Notifiche = Template.bind({});
Notifiche.args = {
  message: 'Prova!',
  type: 'warning',
};
