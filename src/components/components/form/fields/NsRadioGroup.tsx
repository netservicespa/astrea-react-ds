import { FormControlLabel, Radio, RadioGroup, RadioGroupProps } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useFormField } from 'relay-forms';
import uniqueId from '../../../../util/uniqueId';
import { composeValidators, NsInput } from '../validators';

export interface AdditionalProps {
    labelPlacement?: 'bottom' | 'end' | 'start' | 'top';
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Handler per cambiamenti
    children?: React.ReactElement<MyNsRadioProps>[] | React.ReactElement<MyNsRadioProps>;
}

export type NsRadioProps = NsInput<
    Omit<RadioGroupProps, 'value' | 'children'> & AdditionalProps,
    string
>;


export interface MyNsRadioProps {
    label: string,
    value: string
}

export function NsRadio({ label, value }: MyNsRadioProps) {
    return (
        <FormControlLabel value={value} control={<Radio />} label={label} />
    );
}


export const NsRadioGroup: React.FC<NsRadioProps> = ({
    name,
    defaultChecked,
    validate,
    errorMessage,
    disabled,
    onChange, // Usa questa prop per gestire i cambiamenti
    defaultValue,
    children,
    ...rest
}) => {
    const key = useMemo(() => name || uniqueId('v_radio-'), [name]);

    const validateCallback = useCallback(
        (v: string) => composeValidators(validate, errorMessage)(v),
        [validate, errorMessage],
    );

    // Error is not handled, as Radio Buttons should not have an error state (for now, at least)
    const [{ value }, setValue] = useFormField({
        key,
        initialValue: (defaultChecked || '') as string,
        validate: validateCallback,
    });

    const setValueCallback = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setValue(value);

            console.log('value', value);

            if (onChange) {
                onChange(event);
            }
        },
        [setValue, onChange],
    );

    React.useEffect(() => {
        if (disabled) {
            setValue((defaultValue || '') as string);
        }
    }, [disabled, defaultChecked, setValue]);

    return (

        <RadioGroup
            defaultValue={defaultValue}
            name={name}
            value={value}
            onChange={setValueCallback}
            {...rest}
        >
            {children}
        </RadioGroup>

    );
};
