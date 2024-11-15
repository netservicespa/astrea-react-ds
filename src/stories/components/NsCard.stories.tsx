import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { CardProps } from '@mui/material/Card';
import GetAppIcon from '@mui/icons-material/GetApp';
import { NsCard, NsCardProps } from '../../components/components/card/NsCard';
import { Box } from '@mui/system';

const meta: Meta<typeof NsCard> = {
    title: 'Components/Card',
    component: NsCard,
};
export default meta;

const Template: StoryFn<typeof NsCard> = (args) => {
    return (
        <Box sx={{ maxWidth: '550px' }}>
            <NsCard {...args} />
        </Box>
    );
};

// Storia: Basic Card
export const BasicCard = Template.bind({});

BasicCard.args = {
    type: 'basic',
    title: 'New basic card',
    mediaImage: './images/ns-abstarct.jpg',
    children:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales mollis rhoncus. Aliquam erat volutpat. Donec odio diam, semper a nisi nec, eleifend feugiat enim. Aenean eu massa venenatis, feugiat eros sed, vulputate tortor.',
    buttons: [{ label: 'Link', onClick: () => console.log('Link clicked!') }],
    cardvariant: 'flag',
} as NsCardProps;

// Storia: Media Card
export const MediaCard = Template.bind({});
MediaCard.args = {
    type: 'media',
    mediaImage: './images/ns-abstarct.jpg',
    mediaAlt: 'Alt immagine',
    title: 'New media card',
    children:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales mollis rhoncus. Aliquam erat volutpat. Donec odio diam, semper a nisi nec, eleifend feugiat addonec sodales mollis',
    cardvariant: 'classic',
};

// Storia: Actions Card
export const ActionsCard = Template.bind({});
ActionsCard.args = {
    type: 'actions',
    mediaImage: './images/ns-abstarct.jpg',
    mediaAlt: 'Alt immagine',
    title: 'New actions card',
    children:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales mollis rhoncus. Aliquam erat volutpat. Donec odio diam, semper a nisi nec, eleifend feugiat addonec sodales mollis',
    cardvariant: 'classic',
    buttons: [
        {
            label: 'Primary action',
            onClick: () => console.log('Primary action clicked!'),
        },
        {
            label: 'Secondary action',
            color: 'secondary',
            onClick: () => console.log('Secondary action clicked!'),
        },
    ],
};

// Storia: Clickable Card
export const ClickableCard = Template.bind({});
ClickableCard.args = {
    type: 'clickable',
    icon: <GetAppIcon />,
    title: 'New',
    children: '3 pcaps',
    cardvariant: 'clickable',
};

export const CustomizedBasicCard = Template.bind({});
CustomizedBasicCard.args = {
    type: 'basic',
    title: 'New basic card',
    mediaImage: './images/ns-abstarct.jpg',
    children:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales mollis rhoncus. Aliquam erat volutpat. Donec odio diam, semper a nisi nec, eleifend feugiat enim. Aenean eu massa venenatis, feugiat eros sed, vulputate tortor.',
    buttons: [{ label: 'Link', onClick: () => console.log('Link clicked!') }],
    cardvariant: 'flag',
    sx: {
        width: '500px',
        backgroundColor: 'primary.main',
        color: 'white',
        '&:hover': {
            backgroundColor: 'primary.dark',
            // transition: 'transform 0.3s ease, background-color 0.3s ease',
        },
    },
} as NsCardProps;
