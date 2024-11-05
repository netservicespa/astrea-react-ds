import { TextField, TextFieldProps } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useFormField } from 'relay-forms';
import uniqueId from '../../../../util/uniqueId';
import { NsLabelInput } from '../../NsLabelInput';
import { NsInput, composeValidators } from '../validators';

export type NsNumberInputProps = NsInput<Omit<TextFieldProps, 'value'>, string> & {
    pattern?: string; // Permette di personalizzare il pattern
};

/**
 * Campo di input numerico integrato con relay-forms.
 * Utilizza un <input type="text" inputmode="numeric" pattern="[0-9]*">
 * per una migliore accessibilità e compatibilità con tastiere numeriche sui dispositivi mobili.
 */
export const NsNumberInput: React.FC<NsNumberInputProps> = ({
    name,
    label,
    defaultValue,
    validate,
    errorMessage,
    disabled,
    onChange,
    pattern = '[0-9]*',
    ...rest
}) => {
    const key = useMemo(() => name || uniqueId('v_num-'), [name]);

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
            if (/^[0-9]*$/.test(value)) {
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
                type="text"
                inputProps={{
                    inputMode: 'numeric',
                    pattern: pattern,
                }}
            />
        </NsLabelInput>
    );
};