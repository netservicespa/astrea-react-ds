import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { IDropDownConfiguration, IDropdownItems, NsDropDown } from '../../dropdown/NsDropDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export interface NsHeaderUserMenuProps extends BoxProps {
    menuItems: IDropdownItems[];
    userName?: string | React.ReactNode;
    userNameSide?: 'left' | 'right';
    router?: any;
    hover?: boolean;
    dropDownConfiguration?: IDropDownConfiguration;
    onLogout?: () => void;
    isMobile?: boolean;
}
export const NsHeaderUserMenu: React.FC<NsHeaderUserMenuProps> = ({
    menuItems,
    userName,
    userNameSide = 'right',
    router,
    onLogout,
    hover = true,
    isMobile = false,
    dropDownConfiguration = {
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        },
        transformOrigin: {
            vertical: 'top',
            horizontal: 'right',
        },
    },
    sx,
    ...props
}) => {
    return (
        <NsDropDown
            dropdownItems={menuItems}
            router={router}
            onLogout={onLogout}
            dropDownConfiguration={dropDownConfiguration}
            overlay={false}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    margin: 0,
                    paddingX: 0,
                    alignItems: 'center',
                    ...sx,
                }}
                {...props}
            >
                {isMobile ? (
                    <AccountCircleIcon
                        sx={{
                            alignItems: 'center',
                            height: '100%',
                        }}
                    />
                ) : (
                    <>
                        {userNameSide === 'right' && userName}
                        <AccountCircleIcon
                            sx={{
                                alignItems: 'center',
                                height: '100%',
                            }}
                        />
                        {userNameSide === 'left' && userName}
                    </>
                )}
            </Box>
        </NsDropDown>
    );
};
