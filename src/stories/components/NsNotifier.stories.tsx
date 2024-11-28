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
                <Typography component="p">Clicca il pulsante per mostrare la notifica.</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100px' }} textAlign="center">
                    <Button
                        variant="contained"
                        onClick={() => enqueueSnackbar('success message', { variant: 'success' })}
                    >
                        success
                    </Button>
                    <Button variant="contained" onClick={() => enqueueSnackbar('info message', { variant: 'info' })}>
                        info
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => enqueueSnackbar('warning message', { variant: 'warning' })}
                    >
                        warning
                    </Button>
                    <Button variant="contained" onClick={() => enqueueSnackbar('error message', { variant: 'error' })}>
                        error
                    </Button>
                </Box>
            </Container>
        );
    };

    return (
        <>
            <NsNotifier {...args}>
                <Content />
            </NsNotifier>
        </>
    );
};

export const Notifiche = Template.bind({});
Notifiche.args = {
    variant: 'filled',
};
export const NotificheOutlined = Template.bind({});
NotificheOutlined.args = {
    variant: 'outlined',
    anchorOrigin: { horizontal: 'left', vertical: 'top' },
};
