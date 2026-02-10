import React, { useEffect } from 'react';
import { Accordion, AccordionSummary, Box, BoxProps, Drawer, Link, LinkProps, styled } from '@mui/material';
import { IDropdownItems, isActivePath, resolveCurrentPath } from '../../dropdown/NsDropDown';
import { useTheme } from '@mui/material/styles';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { Button as NsButton } from '@mui/material';
import { NsAccordionDetails } from '../../NsAccordion';

export interface NsHeaderHamburgerProps extends BoxProps {
    menuItemsTop?: IDropdownItems[][];
    menuItemsBottom?: IDropdownItems[][];
    isMobile?: boolean;
    menuGap?: string;
    hover?: boolean;
    closeButton?: boolean;
    closeButtonTxt?: string | React.ReactNode;
    closeButtonIcon?: string | React.ReactNode;
    side?: 'top' | 'left' | 'bottom' | 'right';
    router?: any;
    dropDownIcon?: boolean;
    icon?: React.ReactNode;
}

export interface HeaderLinkProps extends LinkProps {
    menuItem: IDropdownItems;
    onClick?: () => void;
    active?: boolean;
    router?: any;
    'aria-current'?: React.AriaAttributes['aria-current'];
}

export const HeaderLink: React.FC<HeaderLinkProps> = ({ menuItem, onClick, active = false, sx, router, ...props }) => {
    const { name, path, icon } = menuItem;
    const href = typeof path === 'string' ? path : '#';
    const handleClick = (e: React.MouseEvent) => {
        if (typeof path !== 'string' || path === '#') {
            e.preventDefault();
            onClick?.();
            return;
        }

        const isReactRouter = typeof router?.history?.push === 'function';
        const isNextRouter = typeof router?.push === 'function' && !isReactRouter;

        if (isReactRouter) {
            e.preventDefault();
            router.history.push(path);
            onClick?.();
            return;
        }
        if (isNextRouter) {
            e.preventDefault();
            router.push(path);
            onClick?.();
            return;
        }

        onClick?.();
    };
    return (
        <Link
            href={href}
            onClick={handleClick}
            underline="none"
            sx={{
                px: '4px',
                gap: '4px',
                alignItems: 'center',
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                padding: '10px',
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': {
                    backgroundColor: 'action.hover',
                },
                ...(active && {
                    backgroundColor: 'action.selected',
                }),
                ...sx,
            }}
            {...props}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                {icon && React.cloneElement(icon, { sx: { mr: '4px' } })}
                {name}
            </Box>
        </Link>
    );
};

export const NsHeaderHamburger: React.FC<NsHeaderHamburgerProps> = ({
    menuItemsTop = [],
    menuItemsBottom = [],
    isMobile = false,
    side = 'left',
    menuGap = '20px',
    hover = true,
    closeButton = true,
    closeButtonTxt = 'Chiudi',
    closeButtonIcon = <CloseOutlinedIcon />,
    router = null,
    dropDownIcon = true,
    sx,
    icon,
    ...props
}) => {
    const theme = useTheme();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const currentPath = resolveCurrentPath(router);

    const toggleDrawer = (anchor: typeof side, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const renderMenu = (menuItems: IDropdownItems[][]) => {
        return menuItems.map((element: any[], i: any) => (
            <Box
                key={`hamb-${i}`}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {element.map((menu, j) =>
                    typeof menu.path === 'string' ? (
                        <HeaderLink
                            router={router}
                            menuItem={menu}
                            key={`${j}-${menu.name}`}
                            active={isActivePath(currentPath, menu.path)}
                            aria-current={isActivePath(currentPath, menu.path) ? 'page' : undefined}
                            onClick={() => setState((prev) => ({ ...prev, [side]: false }))}
                        />
                    ) : (
                        Array.isArray(menu.path) && (
                            <Accordion
                                expanded={expanded === menu.name}
                                onChange={handleChange(menu.name)}
                                sx={{
                                    padding: 0,
                                    margin: 0,
                                    '& .MuiAccordionDetails-root': {
                                        padding: 0,
                                        border: 'none',
                                    },
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={
                                        <ExpandMoreOutlinedIcon sx={{ color: `${theme.palette.primary.main}` }} />
                                    }
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    sx={{
                                        color: `${theme.palette.primary.main}`,
                                        '&:hover': {
                                            backgroundColor: theme.palette.primary.main,
                                            color: '#fff',
                                        },
                                    }}
                                >
                                    {menu.name}
                                </AccordionSummary>
                                <NsAccordionDetails>
                                    {menu.path.map((item: IDropdownItems, k: any) => {
                                        const childActive =
                                            typeof item.path === 'string' && isActivePath(currentPath, item.path);
                                        return (
                                            <HeaderLink
                                                router={router}
                                                menuItem={item}
                                                key={`${k}-${item.name}`}
                                                active={childActive}
                                                aria-current={childActive ? 'page' : undefined}
                                                onClick={() => setState((prev) => ({ ...prev, [side]: false }))}
                                            />
                                        );
                                    })}
                                </NsAccordionDetails>
                            </Accordion>
                        )
                    ),
                )}
            </Box>
        ));
    };

    return (
        <Box
            sx={{
                display: 'flex',
                margin: 0,
                padding: 0,
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                    color: '#fff',
                },
                '&:hover a': {
                    color: '#fff',
                },
                '&:hover svg': {
                    color: '#fff',
                },
                ...sx,
            }}
            {...props}
        >
            <Box onClick={toggleDrawer(side, true)} sx={{ cursor: 'pointer' }}>
                {icon ? (
                    icon
                ) : (
                    <MenuOutlinedIcon
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    />
                )}
            </Box>
            <Drawer
                anchor={side}
                open={state[side]}
                onClose={toggleDrawer(side, false)}
                sx={{
                    '& .MuiPaper-root': {
                        margin: 0,
                    },
                    // width: '90%',
                    height: '100%',
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', margin: 0, gap: menuGap, ...sx, height: '100%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'flex-start', height: '100%' }}>
                        {closeButton && (
                            <NsButton startIcon={closeButtonIcon} onClick={toggleDrawer(side, false)}>
                                {closeButtonTxt}
                            </NsButton>
                        )}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '100%',
                            }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: menuGap }}>
                                {renderMenu(menuItemsTop)}
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: menuGap }}>
                                {renderMenu(menuItemsBottom)}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
};
