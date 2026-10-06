import { Box, Checkbox, CheckboxProps, FormControlLabel } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useFormField } from 'relay-forms';
import uniqueId from '@/util/uniqueId';
import { composeValidators, NsInput } from '@/components/components/form/validators';

export interface AdditionalProps {
    label: string | React.ReactNode;
    labelPlacement?: 'bottom' | 'end' | 'start' | 'top';
}

export type NsCheckboxProps = NsInput<Omit<CheckboxProps, 'value'> & AdditionalProps, boolean>;

export const NsCheckbox: React.FC<NsCheckboxProps> = ({
    name,
    defaultChecked,
    validate,
    label,
    labelPlacement,
    errorMessage,
    disabled,
    onChange,
    sx,
    ...rest
}) => {
    const key = useMemo(() => name ?? uniqueId('v_txt-'), [name]);

    const validateCallback = useCallback(
        (v: boolean) => composeValidators(validate, errorMessage)(v),
        [validate, errorMessage],
    );

    const [{ value }, setValue] = useFormField({
        key,
        initialValue: !!defaultChecked,
        validate: validateCallback,
    });

    const setValueCallback = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
            setValue(checked);

            if (onChange) {
                onChange(event, checked);
            }
        },
        [setValue, onChange],
    );

    React.useEffect(() => {
        if (disabled) {
            setValue(!!defaultChecked);
        }
    }, [disabled, defaultChecked, setValue]);

    return (
        <Box
            component="span"
            sx={{
                display: 'inline-block',
                width: 'fit-content',
                maxWidth: '100%',
                verticalAlign: 'top',
            }}
        >
            <FormControlLabel
                sx={{
                    display: 'inline-flex',
                    width: 'fit-content',
                    maxWidth: '100%',
                    margin: 0,
                    verticalAlign: 'top',
                    '& .MuiFormControlLabel-label': {
                        width: 'auto',
                    },
                }}
                control={<Checkbox sx={sx} {...rest} checked={value} onChange={setValueCallback} disabled={disabled} />}
                labelPlacement={labelPlacement ?? 'end'}
                label={label}
            />
        </Box>
    );
};
