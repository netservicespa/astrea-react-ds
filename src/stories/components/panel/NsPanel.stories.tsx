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

const TemplateTest: StoryFn<typeof NsPanel> = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                border: 'solid 1px black',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px',
                margin: '10px',
                width: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '400px',
                    width: '100%',
                }}
            >
                <NsPanel title="NsPanel" subtitle="subtitle NsPanel">
                    <Box>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus justo tellus, laoreet vel massa
                        et, ornare luctus tellus. Aenean ultricies massa augue. Suspendisse a vestibulum tortor. In hac
                        habitasse platea dictumst.
                    </Box>
                </NsPanel>
                <Box sx={{ height: '100%', width: isOpen ? '100%' : '50%' }}>
                    <NsPanel
                        title="NsPanel menu"
                        subtitle="subtitle NsPanel"
                        menu={true}
                        isOpen={isOpen}
                        handleOpen={() => setIsOpen(!isOpen)}
                    >
                        <Box sx={{ overflowY: 'scroll', maxHeight: '300px' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus justo tellus, laoreet vel
                            massa et, ornare luctus tellus. Aenean ultricies massa augue. Suspendisse a vestibulum
                            tortor. In hac habitasse platea dictumst.
                            <ul>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                <li>Vivamus justo tellus, laoreet vel massa et, ornare luctus tellus.</li>
                                <li>Aenean ultricies massa augue.</li>
                                <li>Suspendisse a vestibulum tortor.</li>
                                <li>In hac habitasse platea dictumst.</li>
                            </ul>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus justo tellus, laoreet vel
                            massa et, ornare luctus tellus. Aenean ultricies massa augue. Suspendisse a vestibulum
                            tortor. In hac habitasse platea dictumst.
                        </Box>
                    </NsPanel>
                </Box>
            </Box>
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
export const examplePanel = TemplateTest.bind({});
