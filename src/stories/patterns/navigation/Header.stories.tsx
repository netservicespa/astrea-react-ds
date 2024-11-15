import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { NsHeader } from 'src/components/patterns/navigation/NsHeader';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button } from '@mui/material';

/**
 * Headers are containers attached to the top of a page that allow the user to navigate through the application.
 *
 */
const meta: Meta<typeof NsHeader> = {
    title: 'Patterns/Header',
    component: NsHeader,
    parameters: {
        layout: 'fullscreen',
        viewport: {
            viewports: INITIAL_VIEWPORTS,
        },
    },
};

export default meta;
type Story = StoryObj<typeof NsHeader>;
const InfoBox = () => {
    return (
        <Box
            sx={{
                width: '500px !important',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
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
                <div>example: "EXAMPLE"</div>
                <div>text: "Text"</div>
            </Box>
        </Box>
    );
};
export const UserPanelHeaderLogo: Story = {
    args: {
        type: 'horizontal',
        logo: <Box component="img" src="./images/logo-light.png" alt="logo" sx={{ maxHeight: '45px' }} />,
        menuItems: [
            { name: 'Link 1', path: '#' },
            { name: 'Link 2', path: '#' },
            { name: 'Link 3', path: '#' },
            { name: 'Link 4', path: '#' },
            {
                name: 'Link 5',
                path: [
                    { name: 'SubLink 1', path: '#' },
                    { name: 'SubLink 2', path: '#' },
                    { name: 'SubLink 3', path: '#' },
                    { name: 'SubLink 4', path: '#' },
                ],
            },
        ],
        infoBox: <InfoBox />,

        userPanelMenuItems: [
            { name: 'Profile', path: '/', icon: <PersonIcon /> },
            { name: 'User Managment', path: '/link2', icon: <SettingsIcon /> },
        ],
        // userPanelMenuItems: <Button>Logout</Button>,
        configuration: {
            centralLogo: false,
            dropDownConfiguration: {
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                transformOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            },
        },
        router: null,
        onLogout: () => {},
    },
};
export const UserPanelHeaderLogoTitle: Story = {
    args: {
        type: 'horizontal',
        logo: (
            <div className="titles">
                <h1>
                    <strong>Astrea</strong>
                </h1>
                <p className="subtitle">DESIGN SYSTEM</p>
            </div>
        ),
        menuItems: [
            { name: 'Link 1', path: '#' },
            { name: 'Link 2', path: '#' },
            { name: 'Link 3', path: '#' },
            { name: 'Link 4', path: '#' },
            {
                name: 'Link 5',
                path: [
                    { name: 'SubLink 1', path: '#' },
                    { name: 'SubLink 2', path: '#' },
                    { name: 'SubLink 3', path: '#' },
                    { name: 'SubLink 4', path: '#' },
                ],
            },
        ],
        userPanelMenuItems: [
            { name: 'Profile', path: '#', icon: <PersonIcon /> },
            { name: 'User Managment', path: '#', icon: <SettingsIcon /> },
        ],
        configuration: {
            centralLogo: false,
            dropDownConfiguration: {
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                transformOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            },
        },
        router: null,
        onLogout: () => {},
    },
};
export const UserPanelHeaderTitle: Story = {
    args: {
        type: 'horizontal',
        logo: (
            <div className="titles">
                <h1>
                    <strong>Astrea</strong>
                </h1>
                <p className="subtitle">DESIGN SYSTEM</p>
            </div>
        ),
        menuItems: [
            { name: 'Link 1', path: '#' },
            { name: 'Link 2', path: '#' },
            { name: 'Link 3', path: '#' },
            { name: 'Link 4', path: '#' },
        ],
        userPanelMenuItems: [
            { name: 'Profile', path: '/', icon: <PersonIcon /> },
            { name: 'User Managment', path: '/link2', icon: <SettingsIcon /> },
        ],
        configuration: {
            centralLogo: false,
            dropDownConfiguration: {
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                transformOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            },
        },
        router: null,
        onLogout: () => {},
    },
};
export const UserPanelHeaderEmpty: Story = {
    args: {
        type: 'horizontal',
        menuItems: [
            { name: 'Link 1', path: '#' },
            { name: 'Link 2', path: '#' },
            { name: 'Link 3', path: '#' },
            { name: 'Link 4', path: '#' },
        ],
        userPanelMenuItems: [
            { name: 'Profile', path: '/', icon: <PersonIcon /> },
            { name: 'User Managment', path: '/link2', icon: <SettingsIcon /> },
        ],
        configuration: {
            centralLogo: false,
            dropDownConfiguration: {
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                transformOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            },
        },
        router: null,
        onLogout: () => {},
    },
};

export const LoggedIn: Story = {
    args: {
        logo: (
            <div className="titles">
                <h1>
                    <strong>Astrea</strong>
                </h1>
                <p className="subtitle">DESIGN SYSTEM</p>
            </div>
        ),
        menuItems: [
            { name: 'Link 1', path: '#' },
            { name: 'Link 2', path: '#' },
            { name: 'Link 3', path: '#' },
            { name: 'Link 4', path: '#' },
        ],
    },
};

export const Mobile: Story = {
    args: {
        // logo: (
        //     <div className="titles">
        //         <h1>
        //             <strong>Astrea</strong>
        //         </h1>
        //         <p className="subtitle">DESIGN SYSTEM</p>
        //     </div>
        // ),
        logo: <Box component="img" src="./images/logo-light.png" alt="logo" sx={{ maxHeight: '45px' }} />,
        menuItems: [
            { name: 'Link 1', path: '#' },
            { name: 'Link 2', path: '#' },
            { name: 'Link 3', path: '#' },
            { name: 'Link 4', path: '#' },
        ],
        userPanelMenuItems: [
            { name: 'Profile', path: '/', icon: <PersonIcon /> },
            { name: 'User Managment', path: '/link2', icon: <SettingsIcon /> },
        ],
    },
    parameters: {
        viewport: {
            defaultViewport: 'iphone6',
        },
    },
};

export const VerticalHeader: Story = {
    args: {
        type: 'vertical',
        menuItems: [
            { name: 'Link 1', path: '#' },
            { name: 'Link 2', path: '#' },
            { name: 'Link 3', path: '#' },
            { name: 'Link 4', path: '#' },
        ],
    },
};

export const MegamenuHeader: Story = {
    args: {
        type: 'megamenu',
        logo: (
            <div className="titles">
                <h1>
                    <strong>Astrea</strong>
                </h1>
                <p className="subtitle">DESIGN SYSTEM</p>
            </div>
        ),
        // logo: <Box component="img" src="./images/logo-light.png" alt="logo" sx={{ maxHeight: '45px' }} />,
        // menuItems: [{ name: 'Menu', path: '#' }],
        userPanelMenuItems: [
            { name: 'Profile', path: '/', icon: <PersonIcon /> },
            { name: 'User Managment', path: '/link2', icon: <SettingsIcon /> },
        ],
        columns: [
            {
                title: 'Column 1',
                links: [
                    { href: '#', text: 'Navigation item 1' },
                    { href: '#', text: 'Navigation item 2' },
                    { href: '#', text: 'Navigation item 3' },
                    { href: '#', text: 'Navigation item 4' },
                    { href: '#', text: 'Navigation item 5' },
                    { href: '#', text: 'Navigation item 6' },
                    { href: '#', text: 'Navigation item 7' },
                    { href: '#', text: 'Navigation item 8' },
                ],
            },
            {
                title: 'Column 2',
                links: [
                    { href: '#', text: 'Navigation item 1' },
                    { href: '#', text: 'Navigation item 2' },
                    { href: '#', text: 'Navigation item 3' },
                ],
            },
            {
                title: 'Column 3',
                links: [
                    { href: '#', text: 'Navigation item 1' },
                    { href: '#', text: 'Navigation item 2' },
                    { href: '#', text: 'Navigation item 3' },
                    { href: '#', text: 'Navigation item 4' },
                    { href: '#', text: 'Navigation item 5' },
                ],
            },
        ],
        configuration: {
            centralLogo: false,
            dropDownConfiguration: {
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                transformOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            },
        },
        router: null,
        onLogout: () => {},
    },
};
