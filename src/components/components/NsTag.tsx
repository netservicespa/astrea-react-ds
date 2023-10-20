import React from 'react';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import { lighten } from '@mui/system';

type NsTagProps = {
    label: string;
    color: 'primary' | 'secondary' | 'error' | 'info' | 'warning' | 'success';
    variant: 'filled' | 'outlined';
};

const StyledChip = styled(Chip)<{ colorValue: NsTagProps['color'], variant: NsTagProps['variant'] }>(
    ({ theme, colorValue, variant }) => ({
        ...(variant === 'filled' ? {
            backgroundColor: lighten(theme.palette[colorValue].main, 0.8),
            borderColor: theme.palette[colorValue].main,
            borderWidth: '1px',
            borderStyle: 'solid',
            color: theme.palette[colorValue].main,
            height: '25px'
        } : {})
    })
);

export const NsTag: React.FC<NsTagProps> = ({ label, color, variant }) => {
  return (
    <StyledChip
        label={label}
        colorValue={color}
        variant={variant}
    />
  );
};