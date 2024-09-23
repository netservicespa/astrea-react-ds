import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Box, minHeight } from '@mui/system';
import { NsPanel } from 'src/components/components/panel/NsPanel';

const meta: Meta<typeof NsPanel> = {
    title: 'Components/Panel',
    component: NsPanel,
    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },
    },
};
export default meta;

const Template: StoryFn<typeof NsPanel> = (args) => {
    const [isOpen, setIsOpen] = React.useState(args.open);

    return (
        <Box
            sx={{
                justifyContent: 'center',
                padding: '10px',
                margin: '10px',
                border: 'solid 1px black',
            }}
        >
            <NsPanel
                menu={args.menu}
                type={args.type}
                title={args.title}
                subtitle={args.subtitle}
                handleOpen={() => setIsOpen(!isOpen)}
                isOpen={isOpen}
                sx={{ ...args.sx }}
            >
                {args.children}
            </NsPanel>
        </Box>
    );
};

export const BasicPanel = Template.bind({});
BasicPanel.args = {
    menu: false,
    type: 'primary',
    title: 'Basic NsPanel',
    subtitle:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus justo tellus, laoreet vel massa et, ornare luctus tellus. Aenean ultricies massa augue. Suspendisse a vestibulum tortor. In hac habitasse platea dictumst.',
    children: <Box> This is a Box passed as children </Box>,
    sx: {},
};
export const BasicPanelSecondary = Template.bind({});
BasicPanelSecondary.args = {
    menu: false,
    type: 'secondary',
    title: 'Basic NsPanel',
    subtitle:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus justo tellus, laoreet vel massa et, ornare luctus tellus. Aenean ultricies massa augue. Suspendisse a vestibulum tortor. In hac habitasse platea dictumst.',
    children: <Box> This is a Box passed as children </Box>,
    sx: {},
};
export const MenuPanel = Template.bind({});
MenuPanel.args = {
    menu: true,
    type: 'primary',
    title: 'Menu NsPanel',
    subtitle:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus justo tellus, laoreet vel massa et, ornare luctus tellus. Aenean ultricies massa augue. Suspendisse a vestibulum tortor. In hac habitasse platea dictumst.',
    children: <Box> This is a Box passed as children </Box>,
    sx: {
        maxWidth: '50%',
    },
};
