import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { NsDialog, NsDialogTitle, NsDialogContent, NsDialogActions } from 'src/components/components/dialog/NsDialog';
import { Box, Container } from '@mui/system';
import { Button, TextField, Typography } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const meta: Meta<typeof NsDialog> = {
    title: 'Components/Dialog',
    component: NsDialog,
    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },
    },
    argTypes: {
        open: {
            description:
                'Controls whether the dialog is open or closed. For more information, visit [MUI Dialog API](https://mui.com/material-ui/api/dialog/).',
            control: 'boolean',
            table: {
                type: {
                    summary: 'true | false',
                },
                defaultValue: {
                    summary: 'false',
                },
            },
        },
        maxWidth: {
            description:
                'Defines the maximum width of the dialog. For more information, visit [MUI Dialog API](https://mui.com/material-ui/api/dialog/).',
            control: {
                type: 'radio',
                options: ['xs', 'sm', 'md', 'lg', 'xl', false],
            },
            table: {
                type: {
                    summary: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | false`,
                },
                defaultValue: {
                    summary: 'xs',
                },
            },
        },
        fullWidth: {
            description:
                'If true, the dialog stretches to the full width of the viewport. For more information, visit [MUI Dialog API](https://mui.com/material-ui/api/dialog/).',
            control: 'boolean',
            table: {
                type: {
                    summary: 'true | false',
                },
                defaultValue: {
                    summary: 'true',
                },
            },
        },
        scroll: {
            description:
                'Determines the scroll behavior of the dialog. For more information, visit [MUI Dialog API](https://mui.com/material-ui/api/dialog/).',
            control: {
                type: 'select',
                options: ['body', 'paper'],
            },
            table: {
                type: {
                    summary: `'body' | 'paper'`,
                },
                defaultValue: {
                    summary: `'body'`,
                },
            },
        },
        fullScreen: {
            description:
                'If true, the dialog will be full-screen. For more information, visit [MUI Dialog API](https://mui.com/material-ui/api/dialog/).',
            table: {
                type: {
                    summary: 'true | false',
                },
                defaultValue: {
                    summary: 'false',
                },
            },
        },
        showCancelButton: {
            description:
                'Determines if a cancel button should be displayed in the dialog actions. You can pass: `true`: Displays the default cancel button. `string`: Displays a custom label as the cancel button. `ReactNode`: Allows rendering of a custom React component as the cancel button.  Default is `false`, meaning no cancel button will be shown.',
            table: {
                type: {
                    summary: 'boolean | string | React.ReactNode',
                },
                defaultValue: {
                    summary: 'false',
                },
            },
        },
        showSubmitButton: {
            description:
                'Determines if a submit button should be displayed in the dialog actions. You can pass: `true`: Displays the default submit button. `string`: Displays a custom label as the submit button. `ReactNode`: Allows rendering of a custom React component as the submit button. Default is `false`, meaning no submit button will be shown.',
            table: {
                type: {
                    summary: 'boolean | string | React.ReactNode',
                },
                defaultValue: {
                    summary: 'false',
                },
            },
        },
        title: {
            description:
                "`<NsDialogTitle/>` Defines the dialog's title. It can accept a React component, a string, or remain empty if no title is required. For more information, visit [MUI DialogTitle API](https://mui.com/material-ui/api/dialog-title/).",
            control: 'text',
            table: {
                type: { summary: 'ReactNode | string | undefined' },
            },
        },
        content: {
            description:
                '`<NsDialogContent/>` Represents the main content area of the dialog. Accepts a React component, a string, or can be left empty. For more information, visit [MUI DialogContent API](https://mui.com/material-ui/api/dialog-content/).',
            control: 'text',
            table: {
                type: { summary: 'ReactNode | string | undefined' },
            },
        },
        actions: {
            description:
                '`<NsDialogActions/>` Specifies the action buttons or elements at the bottom of the dialog. Accepts a React component, a string, or can be left empty. For more information, visit [MUI DialogActions API](https://mui.com/material-ui/api/dialog-actions/).',
            control: 'text',
            table: {
                type: { summary: 'ReactNode | string | undefined' },
            },
        },
    },
};
export default meta;

const StoryContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <Container
            fixed
            sx={{
                height: '200px',
                display: 'flex',
                maxWidth: '300px',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: 4,
                border: 'solid 1px black',
            }}
        >
            {children}
        </Container>
    );
};

const TemplateAction: StoryFn<typeof NsDialog> = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [value, setValue] = React.useState<string | undefined>();

    const handleClose = (val: any) => {
        if (val !== undefined) {
            setIsOpen(false);
        }
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log('Button Confirm:', event);
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        const email = formJson.email;
        setValue(email);
        handleClose(email);
    };

    return (
        <StoryContainer>
            <Button onClick={() => setIsOpen(true)} variant="contained">
                Open modal
            </Button>
            <Typography>Submitted value: {value}</Typography>
            <NsDialog
                open={isOpen}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit,
                }}
            >
                <NsDialogTitle closeButton={false}>Actions modal</NsDialogTitle>
                <NsDialogContent>
                    <Box sx={{ width: '100%', padding: 2 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Insert your mail
                        </Typography>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                    </Box>
                </NsDialogContent>
                <NsDialogActions
                    showCancelButton={true}
                    showSubmitButton={true}
                    setOpen={() => setIsOpen(false)}
                ></NsDialogActions>
            </NsDialog>
        </StoryContainer>
    );
};

const TemplateCustomizable: StoryFn<typeof NsDialog> = (args) => {
    const [isOpen, setIsOpen] = React.useState(args.open);
    return (
        <StoryContainer>
            <Button onClick={() => setIsOpen(true)} variant="contained">
                Open modal
            </Button>
            <NsDialog
                open={isOpen}
                setOpen={() => setIsOpen(false)}
                fullScreen={args.fullScreen}
                scroll={args.scroll}
                maxWidth={args.maxWidth}
                fullWidth={args.fullWidth}
                PaperProps={args.PaperProps}
            >
                <NsDialogTitle closeButton={args.closeButton} setOpen={() => setIsOpen(false)}>
                    {args.title}
                </NsDialogTitle>
                <NsDialogContent>{args.content}</NsDialogContent>
                <NsDialogActions
                    showCancelButton={args.showCancelButton}
                    showSubmitButton={args.showSubmitButton}
                    setOpen={() => setIsOpen(false)}
                    onConfirm={args.onConfirm}
                >
                    {args.actions}
                </NsDialogActions>
            </NsDialog>
        </StoryContainer>
    );
};

export const ActionsModal = TemplateAction.bind({});
ActionsModal.args = {};

export const BasicModal = TemplateCustomizable.bind({});
BasicModal.args = {
    open: false,
    title: 'Basic modal',
    content: 'This is a basic modal with custom width.',
    actions: null,
    closeButton: <CloseOutlinedIcon />,
    showCancelButton: true,
    showSubmitButton: false,
    maxWidth: 'xl',
    scroll: 'body',
};

export const FullscreenModal = TemplateCustomizable.bind({});
FullscreenModal.args = {
    open: false,
    title: 'Full screen modal',
    content: 'Contenuto della modal a schermo intero.',
    fullScreen: true,
    showCancelButton: true,
    showSubmitButton: false,
};

export const NoActionsModal = TemplateCustomizable.bind({});
NoActionsModal.args = {
    open: true,
    title: 'No action modal',
    content: 'This modal automatically open itself',
    closeButton: <CloseOutlinedIcon />,
    showCancelButton: true,
    showSubmitButton: false,
};
