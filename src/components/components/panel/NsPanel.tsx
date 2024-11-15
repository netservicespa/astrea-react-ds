import React, { useState } from 'react';
import { Card, CardContent, Typography, SxProps, Theme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

export interface PanelProps {
    /**
     * Defines the type of the panel.
     *
     * - `'primary'`: Default panel styling.
     * - `'secondary'`: Alternative styling for the panel.
     *
     * Default is `'primary'`.
     */
    type?: 'primary' | 'secondary';

    /**
     * The title displayed at the top of the panel.
     * This is required.
     */
    title: string;

    /**
     * A subtitle displayed below the title, providing additional context or description.
     */
    subtitle: string;

    /**
     * The content to be displayed inside the panel.
     * Accepts any valid React node (components, elements, etc.).
     */
    children: React.ReactNode;

    /**
     * If true, a side menu will be displayed with controls to open or close the panel.
     *
     * Default is `false`, meaning no menu will be shown.
     */
    menu?: boolean;

    /**
     * Controls whether the panel is open or closed.
     *
     * - `true`: The panel is open and visible.
     * - `false`: The panel is closed.
     *
     * Default is `true`.
     */
    isOpen?: boolean;

    /**
     * A function that is triggered when the panel is opened or closed.
     *
     * This callback is useful for managing the panel's open/close state.
     */
    handleOpen: () => any;

    /**
     * Allows you to customize the styles of the panel using the MUI `sx` prop.
     * You can pass any valid `SxProps<Theme>` object to apply custom styling to the `StyledCard`.
     */
    sx?: SxProps<Theme>;

    /**
     * If true, a close button will be displayed in the panel title.
     * You can also pass a custom string or React node to replace the default button.
     *
     * - `true`: Displays the default close button.
     * - `string`: Displays a custom text as the close button.
     * - `ReactNode`: Allows the rendering of a custom React component.
     *
     * Default is `false`, meaning no close button will be shown.
     */
    button?: boolean | string | React.ReactNode;
}

export const NsPanel = ({
    menu = false,
    type = 'primary',
    title,
    subtitle,
    children,
    handleOpen,
    button,
    isOpen = true,
    ...rest
}: PanelProps) => {
    const { t } = useTranslation();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                border: '1px solid',
                borderColor: '#b1b4b6',
                margin: '0px !important',
                boxSizing: 'border-box',
                boxShadow: 'none',
                borderRadius: '0px',
                display: 'flex',
                flexDirection: 'row',
                ...rest,
            }}
        >
            {menu && (
                <Box
                    sx={{
                        flexGrow: 1,
                        flexDirection: 'column',
                        background: isHovered ? '#9c9fa1' : '#b1b4b6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        maxWidth: '40px',
                        minWidth: '40px',
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={handleOpen}
                >
                    <Typography fontWeight={isHovered ? 'bold' : 'normal'}>
                        {isOpen ? (
                            <>
                                {typeof button !== 'boolean' ? (
                                    <CloseIcon fontWeight={isHovered ? 'bold' : 'normal'} />
                                ) : (
                                    button
                                )}
                            </>
                        ) : (
                            <>
                                {typeof button !== 'boolean' ? (
                                    <ArrowLeftIcon fontWeight={isHovered ? 'bold' : 'normal'} />
                                ) : (
                                    button
                                )}
                            </>
                        )}
                    </Typography>
                </Box>
            )}
            {isOpen && (
                <Box
                    sx={{
                        borderRadius: '0px',
                        margin: 0,
                        backgroundColor: type === 'secondary' ? '#2e5a6019' : undefined,
                    }}
                >
                    <CardContent>
                        {title && (
                            <Typography variant={'h3'} fontWeight={900} gutterBottom>
                                {title}
                            </Typography>
                        )}
                        {subtitle && (
                            <Typography variant={'h4'} fontWeight={400}>
                                {subtitle}
                            </Typography>
                        )}
                        <Box component="div" mt={title || subtitle ? 3 : 0}>
                            {children}
                        </Box>
                    </CardContent>
                </Box>
            )}
        </Box>
    );
};
