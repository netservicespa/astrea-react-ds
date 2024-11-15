import React from 'react';
import { FormControlLabel, styled, Switch } from '@mui/material';
export interface NsSwitchProps {
    label: string;
    name: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    color?: 'default' | 'primary' | 'secondary';
}

const CustomSwitch = styled(Switch)(({ theme }) => ({
    width: 44,
    height: 25,
    padding: 0,
    display: 'flex',
    marginRight: 16,
    marginLeft: 16,
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 20,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(14px)',
        },
    },
    '&:hover': {
        '& .MuiSwitch-switchBase': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
        '& .MuiSwitch-track': {
            opacity: 0.8,
        },
    },
    '&:focus': {
        '& .MuiSwitch-switchBase': {
            boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.2)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 4,
        '&.Mui-checked': {
            transform: 'translateX(18px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 18,
        height: 18,
        borderRadius: 9,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 24 / 2,
        opacity: 1,
        backgroundColor: 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
    '& .MuiSwitch-icon': {
        fontSize: 18,
    },
    '& .MuiSwitch-iconChecked': {
        fontSize: 18,
    },
}));

export const NsSwitch: React.FC<NsSwitchProps> = ({ label, name, checked, onChange, color = 'default' }) => {
    return (
        <FormControlLabel
            control={<CustomSwitch checked={checked} onChange={onChange} color={color} />}
            label={label}
            name={name}
        />
    );
};
