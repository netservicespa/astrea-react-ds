import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Button, Container, Divider } from '@mui/material';
import { NsFeedback } from 'src/components/components/feedback/NsFeedback';

export default {
  title: 'Components/Feedback',
  component: NsFeedback,
  argTypes: {
    severity: {
      label: 'Notification Type',
      control: { type: 'radio' },
      options: ['error', 'warning', 'info', 'success'],
    },
    message: {
      type: 'string',
    },
    submessage: {
      type: 'string',
    },
    autoHideDuration: {
      type: 'number',
    },
    openNotifier: {
      type: 'boolean',
    },
  },
} as Meta<typeof NsFeedback>;

const Template: StoryFn<typeof NsFeedback> = (args) => {
  const [open, setIsOpen] = React.useState(args.openNotifier);
  function onCloseSnack() {
    setIsOpen(false);
  }
  return (
    <>
      <Container maxWidth={false}>
        Clicca il pulsante per mostrare la notifica.
        <Button
          style={{ marginLeft: '30%', marginTop: '3%', width: '40%' }}
          variant="outlined"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Invia Notifica
        </Button>
        <Divider sx={{ my: 4 }} />
        <NsFeedback
          openNotifier={open}
          onCloseSnack={onCloseSnack}
          message={args.message}
          title={args.title}
          severity={args.severity}
          autoHideDuration={args.autoHideDuration}
          variant={args.variant}
        />
      </Container>
    </>
  );
};

export const Feedback = Template.bind({});

Feedback.args = {
  severity: 'success',
  message: 'This is a success message!',
  submessage: 'This is text to show more information',
  autoHideDuration: 4000,
  openNotifier: false,
};
