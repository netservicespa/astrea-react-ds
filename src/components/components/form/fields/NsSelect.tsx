import { NsLabelInput } from '@/components/components/NsLabelInput';
import { composeValidators, NsInput } from '@/components/components/form/validators';
import uniqueId from '@/util/uniqueId';
import { Select, SelectChangeEvent, SelectProps } from '@mui/material';
import * as React from 'react';
import { useCallback, useMemo } from 'react';
import { useFormField } from 'relay-forms';

export type NsSelectProps = NsInput<Omit<SelectProps, 'value'> & { placeholder?: string }, string | string[]>;

/**
 * Select component integrated with relay-forms.
 * Supports validation through the validate fields.
 */
export const NsSelect: React.FC<NsSelectProps> = ({
    name,
    /** Etichetta della select */
    label,
    children,
    size,
    defaultValue,
    validate,
    errorMessage,
    placeholder,
    changed,
    disabled,
    multiple = false,
    ...rest
}) => {
    const key = useMemo(() => name ?? uniqueId('v_select-'), [name]);
    const validateCallback = useCallback(
        (v: string) => composeValidators(validate, errorMessage)(v),
        [validate, errorMessage],
    );

    const [{ value, error }, setValue] = useFormField({
        key,
        initialValue: (defaultValue || '') as string,
        validate: validateCallback,
    });

    const setValueCallback = useCallback(
        (event: SelectChangeEvent<unknown>) => {
            const { value } = event.target;

            setValue(value as string);

            if (changed) {
                changed(event as unknown as string);
            }
        },
        [setValue, changed],
    );

    React.useEffect(() => {
        if (disabled) {
            setValue((defaultValue || '') as string);
        }
    }, [disabled]);

    return (
        <NsLabelInput nameHtml={key} label={label as string}>
            <Select
                {...rest}
                name={name}
                error={!!error}
                value={value}
                defaultValue={defaultValue}
                fullWidth
                size={size}
                inputProps={{ placeholder }}
                onChange={setValueCallback}
                disabled={disabled}
                multiple={multiple}
            >
                {children}
            </Select>
        </NsLabelInput>
    );
};
