import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Box, Button as NsButton } from '@mui/material';
import { NsSidebarLegacy } from '../../components/components/sidebar/NsSidebarLegacy';
import { Button } from '@mui/material';
import { IconButton } from '@mui/material';
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import { Typography } from '@mui/material';
import { List } from '@mui/icons-material';
import { ListItem } from '@mui/material';

export default {
    title: 'Deprecated/NsSidebarLegacy',
    component: NsSidebarLegacy,
    argTypes: {
        open: {
            control: { type: 'boolean' },
            defaultValue: true,
        },
        onClose: { action: 'onClose' },
    },
} as Meta;

const Template: StoryFn = (args) => {
    const [open, setOpen] = useState(args.open);

    const handleToggle = () => setOpen(!open);

    return (
        <>
            <NsButton variant="contained" onClick={handleToggle} sx={{ marginLeft: '500px' }}>
                Toggle Sidebar
            </NsButton>
            <NsSidebarLegacy
                {...args}
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        backgroundColor: 'lightgray', // change background color
                    },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        marginTop: '80px',
                        paddingLeft: '8px',
                    }}
                >
                    <Box sx={{ p: 4 }}>
                        {open ? (
                            <Button variant="contained" color="primary" onClick={() => { }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>Download</Box>
                            </Button>
                        ) : (
                            <IconButton size="small" onClick={() => { }}>
                                <GetAppOutlinedIcon />
                            </IconButton>
                        )}
                    </Box>
                    <Box>
                        {open && (
                            <Box sx={{ px: 4 }}>
                                <Typography variant="caption" gutterBottom>
                                    Recent documents
                                </Typography>
                            </Box>
                        )}
                        <List>
                            <ListItem> element 1</ListItem>
                            <ListItem> element 2</ListItem>
                            <ListItem> element 3</ListItem>
                        </List>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box>
                        <List>
                            <ListItem> element A</ListItem>
                            <ListItem> element B</ListItem>
                        </List>
                    </Box>
                </Box>
            </NsSidebarLegacy>
        </>
    );
};

export const Default = Template.bind({});
Default.args = {
    open: true,
};
