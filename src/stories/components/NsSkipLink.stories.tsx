import React from 'react';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import { NsSkipLink, SkipLinkProps } from '@/components/components/NsSkipLink';
import { Box } from '@mui/material';

const meta: Meta = {
    title: 'Components/SkipLink',
    component: NsSkipLink,
};

export default meta;

const Template: StoryFn<SkipLinkProps> = (args) => {
    return (
        <Box>
            <NsSkipLink {...args} />
            <Box sx={{ mt: 4 }}>
                <h1 id="main">Page title</h1>
            </Box>
        </Box>
    );
};

export const Default = {
    render: Template,

    args: {
        href: '#main',
        children: 'Skip to main content',
    },
};
