import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { NsDrawer } from 'src/components/components/drawer/NsDrawer';
import { Button, Typography, Box } from '@mui/material';

const meta: Meta<typeof NsDrawer> = {
    title: 'Components/Drawer',
    component: NsDrawer,
    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },
    },
};
export default meta;

const Template: StoryFn<typeof NsDrawer> = (args) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <>
            <Button variant="contained" onClick={handleOpen}>
                Open
            </Button>
            <NsDrawer {...args} open={isOpen} onClose={handleClose} />
        </>
    );
};

export const AnchorDrawer = Template.bind({});
AnchorDrawer.args = {
    title: 'Anchor Drawer',
    content: 'This is the content of an anchor drawer.',
    drawerType: 'anchor',
    drawerPosition: 'right',
};

export const ResponsiveDrawer = Template.bind({});
ResponsiveDrawer.args = {
    title: 'Responsive Drawer',
    content: (
        <Box>
            <Typography>This is a responsive drawer.</Typography>
        </Box>
    ),
    drawerType: 'anchor',
    drawerPosition: 'left',
};
