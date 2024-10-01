import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import NsDrawer, { NsDrawerProps } from 'src/components/components/drawer/NsDrawer';
import { Button, Typography, Box } from '@mui/material';

export default {
    title: 'Components/Drawer',
    component: NsDrawer,
} as Meta;

const Template: StoryFn<NsDrawerProps> = (args) => {
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
