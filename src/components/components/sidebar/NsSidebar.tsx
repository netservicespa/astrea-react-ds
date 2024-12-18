import React from 'react';
import { Drawer, useTheme } from '@mui/material';
import { SxProps, Theme } from '@mui/system';

interface SidebarProps {
    open: boolean;
    onClose: () => void;
    drawerWidth: string | number;
    miniDrawerWidth: string | number;
    children?: React.ReactNode;
    sx?: SxProps<Theme>;
}

export const NsSidebar: React.FC<SidebarProps> = ({
    open,
    drawerWidth = '268px',
    miniDrawerWidth = '80px',
    onClose,
    children,
    sx,
}) => {
    const theme = useTheme();

    console.log('sidebar', open);
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            open={open}
            onClose={onClose}
            sx={{
                width: open ? drawerWidth : miniDrawerWidth,
                flexShrink: 0,
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                '& .MuiPaper-root': {
                    margin: 0,
                },
                '& .MuiDrawer-paper': {
                    width: open ? drawerWidth : miniDrawerWidth,
                    boxSizing: 'border-box',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    border: 'none',
                    borderColor: 'transparent',
                },
                '& .MuiDrawer-paper::-webkit-scrollbar': {
                    width: '8px',
                    background: 'transparent',
                },
                '& .MuiDrawer-paper::-webkit-scrollbar-thumb': {
                    backgroundColor: 'transparent',
                },
                '& .MuiDrawer-paper:hover::-webkit-scrollbar-thumb': {
                    backgroundColor: '#888',
                    borderRadius: '10px',
                },
                '& .MuiDrawer-paper:hover::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: theme.palette.primary.main,
                },
                ...sx,
            }}
        >
            {children}
        </Drawer>
    );
};
