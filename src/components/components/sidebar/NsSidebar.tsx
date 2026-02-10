import React, { useEffect, ReactNode } from 'react';
import { Box, MenuItem, Tooltip, Typography, useTheme } from '@mui/material';
import { SxProps, Theme } from '@mui/system';
import { lighten } from '@mui/system';

export interface MenuItem {
    name: string;
    path: string;
    icon: ReactNode;
}

interface NsSidebarProps {
    open: boolean;
    hidden?: boolean;
    menuItems: MenuItem[];
    bottomMenuItems?: MenuItem[];
    content?: ReactNode;
    currentPath: string;
    onNavigate: (path: string) => void;
    onOpenChange?: (open: boolean) => void;
    headerHeight?: string | number;
    menuLabel?: string;
    autoCloseOnSmallScreen?: boolean;
    sx?: SxProps<Theme>;
}

export const NsSidebar: React.FC<NsSidebarProps> = ({
    open,
    hidden = false,
    menuItems = [],
    bottomMenuItems = [],
    content: content,
    currentPath,
    onNavigate,
    onOpenChange,
    headerHeight = '0px',
    menuLabel,
    autoCloseOnSmallScreen = true,
    sx,
}) => {
    const theme = useTheme();

    useEffect(() => {
        if (autoCloseOnSmallScreen && typeof window !== 'undefined') {
            const screenWidth = window.innerWidth;
            if (screenWidth <= 1280 && onOpenChange) {
                onOpenChange(false);
            }
        }
    }, [autoCloseOnSmallScreen, onOpenChange]);

    const RenderMenu = (list: MenuItem[]) => {
        return list.map((item) => {
            const isActive = item.path === '/' ? currentPath === '/' : currentPath.startsWith(item.path);

            return (
                <Box key={item.path}>
                    <Tooltip title={!open ? item.name : ''} placement="right" arrow>
                        <MenuItem
                            onClick={() => onNavigate(item.path)}
                            sx={{
                                color: isActive
                                    ? theme.palette.darkTextColor?.primary || '#000000'
                                    : theme.palette.darkTextColor?.secondary || '#3D3D3D',
                                gap: '16px',
                                paddingY: '8px',
                                paddingX: '8px',
                                borderRadius: '4px',
                                backgroundColor: isActive ? theme.palette.secondary?.main || '#cce2df' : 'transparent',
                                ':hover': {
                                    backgroundColor: lighten(theme.palette.secondary?.main || '#cce2df', 0.5),
                                },
                                ':active': {
                                    backgroundColor: theme.palette.secondary?.main || '#cce2df',
                                },
                            }}
                        >
                            {React.cloneElement(item.icon as React.ReactElement, {
                                sx: {
                                    color: isActive
                                        ? theme.palette.primary?.main || '#308A7D'
                                        : theme.palette.darkTextColor?.tertiary || '#595959',
                                },
                            })}

                            {open && <Typography variant={isActive ? 'subtitle1' : 'body1'}>{item.name}</Typography>}
                        </MenuItem>
                    </Tooltip>
                </Box>
            );
        });
    };

    if (hidden) {
        return null;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: `calc(100vh - ${headerHeight})`,
                width: open ? '280px' : '64px',
                alignItems: open ? 'right' : 'center',
                paddingX: '8px',
                paddingBottom: '8px',
                backgroundColor: '#FFFFFF',
                gap: '4px',
                borderRight: `1px solid ${theme.palette.borderColor?.main || '#B1B4B6'}`,
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.standard,
                }),
                ...sx,
            }}
        >
            {menuLabel && (
                <Typography
                    sx={{ paddingY: '12px', paddingX: '16px', marginTop: '8px' }}
                    color={theme.palette.darkTextColor?.tertiary || '#595959'}
                >
                    {menuLabel}
                </Typography>
            )}
            {RenderMenu(menuItems)}

            {!(open && content) && <Box sx={{ flexGrow: 1 }} />}

            {open && content && (
                <Box
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        paddingY: 2,
                    }}
                >
                    {content}
                </Box>
            )}
            {bottomMenuItems && bottomMenuItems.length > 0 && RenderMenu(bottomMenuItems)}
        </Box>
    );
};
