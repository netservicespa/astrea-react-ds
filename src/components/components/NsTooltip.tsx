import React from 'react';
import { SxProps, styled } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { Theme } from '@mui/system';
import InfoIcon from '@mui/icons-material/Info';
import Typography from '@mui/material/Typography';

export interface NsTooltipProps {
    placement?:
        | 'bottom'
        | 'left'
        | 'right'
        | 'top'
        | 'bottom-end'
        | 'bottom-start'
        | 'left-end'
        | 'left-start'
        | 'right-end'
        | 'right-start'
        | 'top-end'
        | 'top-start'
        | undefined;
    title?: string | React.ReactNode;
    className?: string;
    text?: string | any;
    sx?: SxProps<Theme>;
    theme?: any;
    colorIcon?: any;
    icon?: any;
}

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    border: 'none',
    [`& .${tooltipClasses.arrow}`]: {
        color: `${theme.palette.common.black}`,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: `${theme.palette.common.black}`,
    },
}));

export const NsTooltip = ({
    title = 'I am a tooltip, wich is a tool to show tips',
    placement = 'right',
    sx,
    children,
    colorIcon,
    icon,
    ...otherProps
}: React.PropsWithChildren<NsTooltipProps>) => {
    const actualChildren = React.useMemo(() => {
        if (typeof children === 'string') {
            return <Typography component='p' variant='body1'>{children}</Typography>;
        } else if (!children) {
            return icon ?? <InfoIcon style={{ color: '#000', ...colorIcon }} />;
        } else {
            return children;
        }
    }, [children]);

    return (
        <CustomTooltip sx={sx} title={title} placement={placement} {...otherProps}>
            {actualChildren}
        </CustomTooltip>
    );
};
