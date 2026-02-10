import React, { useMemo } from 'react';
import { Box, BoxProps } from '@mui/material';
import { IDropdownItems, NsDropDown, isActivePath, resolveCurrentPath } from '../../dropdown/NsDropDown';
import { HeaderLink, NsHeaderHamburger } from './NsHeaderHamburger';

export interface NsHeaderMenuProps extends BoxProps {
    menuItems: IDropdownItems[];
    router?: any;
    hover?: boolean;
    dropDownIcon?: boolean;
    isMobile?: boolean;
    closeOnMenuItemClick?: boolean;
}

export const NsHeaderMenu: React.FC<NsHeaderMenuProps> = ({
    menuItems,
    sx,
    router = null,
    hover = true,
    dropDownIcon = true,
    isMobile = false,
    closeOnMenuItemClick = false,
    ...props
}) => {
    const currentPath = resolveCurrentPath(router);
    const menuKey = useMemo(() => menuItems.map((m) => m.name).join('|'), [menuItems]);

    return isMobile ? (
        <Box
            key={menuKey}
            sx={{
                display: 'flex',
                margin: 0,
                padding: 0,
                alignItems: 'center',
                ...sx,
            }}
            {...props}
        >
            <NsHeaderHamburger router={router} menuItemsTop={[menuItems]} />
        </Box>
    ) : (
        <Box
            key={menuKey}
            sx={{
                display: 'flex',
                margin: 0,
                padding: 0,
                ...sx,
            }}
            {...props}
        >
            {menuItems.map((item, i) =>
                typeof item.path === 'string' ? (
                    <HeaderLink
                        router={router}
                        menuItem={item}
                        key={`${i}-${item.name}`}
                        active={isActivePath(currentPath, item.path)}
                        aria-current={isActivePath(currentPath, item.path) ? 'page' : undefined}
                    />
                ) : (
                    Array.isArray(item.path) && (
                        // parent is active if any child is active
                        (() => {
                            const groupActive = item.path.some(
                                (child) => typeof child.path === 'string' && isActivePath(currentPath, child.path),
                            );
                            return (
                        <NsDropDown
                            key={item.name}
                            dropdownItems={item.path}
                            router={router}
                            dropDownConfiguration={{
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                },
                                transformOrigin: {
                                    vertical: 'top',
                                    horizontal: 'center',
                                },
                                hover: hover,
                                dropDownIcon: dropDownIcon,
                            }}
                            overlay={false}
                            icon={dropDownIcon}
                            closeOnMenuItemClick={closeOnMenuItemClick}
                        >
                            <HeaderLink
                                menuItem={item}
                                key={`${item.name}`}
                                active={groupActive}
                                aria-current={groupActive ? 'page' : undefined}
                            />
                        </NsDropDown>
                            );
                        })()
                    )
                ),
            )}
        </Box>
    );
};
