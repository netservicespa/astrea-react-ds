import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { NsHeader2, NsHeaderLevel } from '../../../components/components/header2/NsHeader2';
import { NsHeaderLogo } from '../../../components/components/header2/components/NsHeaderLogo';
import { NsHeaderMenu } from '../../../components/components/header2/components/NsHeaderMenu';
import { NsHeaderUserMenu } from '../../../components/components/header2/components/NsHeaderUserMenu';
import { NsHeaderNotification } from '../../../components/components/header2/components/NsHeaderNotification';
import { NsHeaderBox } from '../../../components/components/header2/components/NsHeaderBox';
import { NsHeaderHamburger } from '../../../components/components/header2/components/NsHeaderHamburger';

import { Box, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { minWidth } from '@mui/system';

const meta: Meta<typeof NsHeader2> = {
    title: 'Patterns/Header',
    component: NsHeader2,
    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },
    },
    argTypes: {
        sx: {
            description: 'Styles applied to the header component.',
            control: 'object',
            table: {
                type: { summary: 'SxProps' },
            },
        },
        mainBarProps: {
            description: 'Props for customizing the main bar.',
            control: 'object',
            table: {
                type: { summary: 'object' },
            },
        },
        contentProps: {
            description: 'Props for customizing the content section.',
            control: 'object',
            table: {
                type: { summary: 'object' },
            },
        },
    },
};

export default meta;

const menuItems = [
    { name: 'Link 1', path: 'https://www.google.com/' },
    {
        name: 'Link 2',
        path: [
            { name: 'SubLink 21', path: '#' },
            { name: 'SubLink 22', path: 'https://www.google.com/' },
            { name: 'SubLink 23', path: '#' },
            { name: 'SubLink 24', path: '#' },
        ],
    },
    {
        name: 'Link 3',
        path: [
            { name: 'SubLink 31', path: '#' },
            { name: 'SubLink 32', path: '#' },
            { name: 'SubLink 33', path: '#' },
            { name: 'SubLink 34', path: '#' },
        ],
        icon: <PersonIcon />,
    },
    { name: 'Link 4', path: '#', icon: <PersonIcon /> },
];
const userPanelMenuItems = [
    { name: 'Profile', path: '/', icon: <PersonIcon /> },
    { name: 'User Managment', path: '/link2', icon: <SettingsIcon /> },
];

const unread = {
    notifications: [
        {
            id: 1,
            status: 'valid',
            text: 'Search "TCP" save successfully',
            link: {
                router: null,
                to: '#',
            },
        },
        { id: 2, status: 'invalid', text: 'ghgjgfsdf.pcap' },
        { id: 2, status: 'invalid', text: 'new_123aaaa8.pcap' },
        { id: 2, status: 'valid', text: 'ghgjgfsdfyui.pcap' },
    ],
    showMore: {
        router: null,
        to: '#',
        children: <Typography sx={{ color: 'red' }}>Show more</Typography>,
    },
    totalCount: 4,
};
const read = {
    notifications: [
        {
            id: 1,
            status: 'valid',
            text: 'sdganhbasddd.pcap',
            link: {
                router: null,
                to: '#',
            },
        },
        {
            id: 2,
            status: 'invalid',
            text: 'ghgjgfsdf.pcap',
            link: {
                router: null,
                to: '#',
            },
        },
        { id: 2, status: 'valid', text: 'new_123aaaa8.pcap' },
        { id: 2, status: 'valid', text: 'fsdfsfsfsfsfsdssssssyui.pcap' },
        { id: 1, status: 'valid', text: 'nerver_123_new.pcap' },
        { id: 2, status: 'valid', text: 'Changes discarded.pcap' },
        { id: 2, status: 'invalid', text: 'new_123aaaa8.pcap' },
    ],
    totalCount: 4,
};

const InfoBox = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#aaa',
                height: '60px',
                margin: '10px',
                pagging: '10px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '10px',
                    borderRight: '1px solid black',
                }}
            >
                Example Text
            </Box>
            <Box
                sx={{
                    borderRight: '1px solid black',
                }}
            ></Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '10px',
                }}
            >
                <div>example: &quot;EXAMPLE&quot;</div>
                <div>text: &quot;Text&quot;</div>
            </Box>
        </Box>
    );
};

const Template: StoryFn<typeof NsHeader2> = (args) => (
    <NsHeader2 {...args}>
        <NsHeaderBox
            nsPosition={{
                desktop: { level: NsHeaderLevel.NONE, position: 'left' },
                mobile: { level: NsHeaderLevel.MAIN_BAR, position: 'left' },
            }}
        >
            <NsHeaderHamburger menuItemsTop={[menuItems, menuItems]} menuItemsBottom={[userPanelMenuItems]} sx={{
                '& .MuiPaper-root': {
                    margin: 0,
                    minWidth: '300px', // Larghezza minima del drawer
                    width: '30vw', // Larghezza relativa alla viewport
                    maxWidth: '500px', // Larghezza massima opzionale
                },
                height: '100%',
            }} />
        </NsHeaderBox>
        <NsHeaderBox
            nsPosition={{
                desktop: { level: NsHeaderLevel.MAIN_BAR, position: 'left' },
                mobile: { level: NsHeaderLevel.MAIN_BAR, position: 'center' },
            }}
        >
            <NsHeaderLogo component="img" src="./images/logo-light.png" alt="logo" />
        </NsHeaderBox>
        <NsHeaderBox
            nsPosition={{
                desktop: { level: NsHeaderLevel.MAIN_BAR, position: 'center' },
                mobile: { level: NsHeaderLevel.NONE, position: 'left' },
            }}
        >
            <InfoBox />
        </NsHeaderBox>
        <NsHeaderBox
            nsPosition={{
                desktop: { level: NsHeaderLevel.MAIN_BAR, position: 'right' },
                mobile: { level: NsHeaderLevel.NONE, position: 'right' },
            }}
        >
            <NsHeaderUserMenu menuItems={userPanelMenuItems} userName={'name.surname'} />
        </NsHeaderBox>
        <NsHeaderBox
            sx={{ display: 'flex', flexDirection: 'row' }}
            nsPosition={{
                desktop: { level: NsHeaderLevel.SUB_BAR, position: 'right' },
                mobile: { level: NsHeaderLevel.NONE, position: 'left' },
            }}
        >
            <NsHeaderNotification
                sx={{ paddingX: '10px' }}
                read={read}
                unread={unread}
                markAsRead={() => {
                    console.log('markAsRead');
                }}
            />
            <NsHeaderUserMenu menuItems={userPanelMenuItems} onLogout={() => { }} sx={{ paddingX: '10px' }} />
        </NsHeaderBox>
        <NsHeaderBox
            nsPosition={{
                desktop: { level: NsHeaderLevel.SUB_BAR, position: 'left' },
                mobile: { level: NsHeaderLevel.NONE, position: 'right' },
            }}
        >
            <NsHeaderMenu menuItems={menuItems} />
        </NsHeaderBox>
    </NsHeader2>
);

export const BaseExample = Template.bind({});
BaseExample.args = {};

// <NsHeader2 {...args}>
//     <NsHeaderLogo
//         nsPosition={{
//             desktop: { level: NsHeaderLevel.MAIN_BAR, position: 'right' },
//             mobile: { level: NsHeaderLevel.MAIN_BAR, position: 'center' },
//         }}
//     >
//         <Box sx={{ height: '80px', minWidth: '80px', border: 'solid 1px black', backgroundColor: 'blue' }}>
//             1R 1C
//         </Box>{' '}
//     </NsHeaderLogo>
//     <NsHeaderLogo
//         nsPosition={{
//             desktop: { level: NsHeaderLevel.MAIN_BAR, position: 'right' },
//             mobile: { level: NsHeaderLevel.MAIN_BAR, position: 'center' },
//         }}
//     >
//         <Box sx={{ height: '80px', minWidth: '80px', border: 'solid 1px black', backgroundColor: 'blue' }}>
//             1R 1C 2
//         </Box>{' '}
//     </NsHeaderLogo>
//     <NsHeaderLogo
//         nsPosition={{
//             desktop: { level: NsHeaderLevel.SUB_BAR, position: 'center' },
//             mobile: { level: NsHeaderLevel.MAIN_BAR, position: 'right' },
//         }}
//     >
//         <Box sx={{ height: '80px', minWidth: '80px', border: 'solid 1px black', backgroundColor: 'red' }}>
//             2C 1R
//         </Box>{' '}
//     </NsHeaderLogo>
//     <NsHeaderLogo
//         nsPosition={{
//             desktop: { level: NsHeaderLevel.MAIN_BAR, position: 'left' },
//             mobile: { level: NsHeaderLevel.MAIN_BAR, position: 'left' },
//         }}
//     >
//         <Box sx={{ height: '80px', minWidth: '80px', border: 'solid 1px black', backgroundColor: 'green' }}>
//             1L 1L
//         </Box>{' '}
//     </NsHeaderLogo>
// </NsHeader2>
