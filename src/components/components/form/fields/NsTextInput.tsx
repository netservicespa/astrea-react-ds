import { TextField, TextFieldProps } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useFormField } from 'relay-forms';
import uniqueId from '../../../../util/uniqueId';
import { NsLabelInput } from '../../NsLabelInput';
import { NsInput, composeValidators } from '../validators';

export type NsTextInputProps = NsInput<Omit<TextFieldProps, 'value'>, string>;

/**
 * Campo di testo integrato con relay-forms.
 * Supporta la validazione tramite i campi validate
 */
export const NsTextInput: React.FC<NsTextInputProps> = ({
    name,
    label,
    defaultValue,
    validate,
    errorMessage,
    disabled,
    type,
    onChange,
    ...rest
}) => {
    const key = useMemo(() => name || uniqueId('v_txt-'), [name]);

    const validateCallback = useCallback(
        (v: string) => composeValidators(validate, errorMessage)(v),
        [validate, errorMessage],
    );

    const [{ value, error }, setValue] = useFormField({
        key,
        initialValue: (defaultValue || '') as string,
        validate: validateCallback,
    });

    React.useEffect(() => {
        if (disabled) {
            setValue((defaultValue || '') as string);
        }
    }, [disabled]);

    const setValueCallback = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            if (type === 'number' && !isNaN(Number(value))) {
                setValue(Number(value) as unknown as string);
            } else {
                setValue(value);
            }

            if (onChange) {
                onChange(event);
            }
        },
        [setValue, onChange],
    );

    return (
        <NsLabelInput nameHtml={key} label={label as string}>
            <TextField
                {...rest}
                fullWidth
                value={value}
                error={!!error}
                onChange={setValueCallback}
                disabled={disabled}
                type={type}
            />
        </NsLabelInput>
    );
};
