import React from 'react';
import Chip, { ChipProps } from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import { lighten } from '@mui/system';

type NsTagProps = {
    label: string;
    color: 'primary' | 'secondary' | 'error' | 'info' | 'warning' | 'success';
    variant: 'filled' | 'outlined';
    size?: 'small' | 'medium' | 'large';
    onDelete?: any;
};

interface StyledChipProps {
    colorValue: NsTagProps['color'];
    variant: NsTagProps['variant'];
}

const StyledChip = styled(
    ({ colorValue, variant, ...other }: StyledChipProps & ChipProps) => <Chip {...other} />
  )<StyledChipProps>(({ theme, colorValue, variant }) => {
    const commonStyles = {
        color: theme.palette[colorValue].main,
        borderColor: theme.palette[colorValue].main,
        borderWidth: '1px',
        borderStyle: 'solid',
        height: '25px'
    };

    return {
        ...(variant === 'filled' ? {
            backgroundColor: lighten(theme.palette[colorValue].main, 0.8),
            ...commonStyles,
        } : {}),
        ...(variant === 'outlined' ? {
            backgroundColor: 'transparent',
            ...commonStyles,
        } : {}),
    };
});

export const NsTag: React.FC<NsTagProps & Omit<ChipProps, 'color' | 'variant'>> = ({
    label,
    color,
    variant,
    onDelete,
    ...otherProps
}) => {  
    return (
        <StyledChip
            label={label}
            colorValue={color}
            variant={variant}
            onDelete={onDelete}
            {...otherProps}
        />
    );
};