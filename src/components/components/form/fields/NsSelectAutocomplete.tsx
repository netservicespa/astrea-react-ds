import { Autocomplete, AutocompleteProps, AutocompleteRenderInputParams, TextField } from '@mui/material';
import * as React from 'react';
import { useCallback, useMemo } from 'react';
import { SelectProps } from '@mui/material/Select/Select';
import { NsLabelInput } from '../../NsLabelInput';
import { composeValidators, NsInput } from '../validators';
import uniqueId from '../../../../util/uniqueId';
import { useFormField } from 'relay-forms';

export interface SelectItem {
    label: string;
    value: any;
    groupDescrizione?: string;
    descrizione?: string;
}

export type NsSelectAutocompleteProps = NsInput<
    Omit<SelectProps & Partial<AutocompleteProps<SelectItem, boolean, boolean, boolean>>, 'value'>,
    SelectItem | string | SelectItem[]
> & {
    multiple?: boolean;
    options?: SelectItem[];
    groupBy?: (option: SelectItem) => string;
    getOptionLabel?: (option: SelectItem) => string;
    onChange?: (event: React.ChangeEvent<{}>, value: SelectItem | SelectItem[] | null) => void;
    disableCloseOnSelect?: boolean;
    renderOption?: (
        props: React.HTMLAttributes<HTMLLIElement>,
        option: SelectItem,
        state: { selected: boolean },
    ) => React.ReactNode;
    renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
};

const defaultOptionValueEqualityCheck = (option: SelectItem, value: SelectItem) => option.value === value.value;

export function NsSelectAutocomplete({
    name,
    label,
    children,
    defaultValue,
    validate,
    errorMessage,
    disabled,
    placeholder,
    isOptionEqualToValue = defaultOptionValueEqualityCheck,
    // changed,
    multiple = false,
    options,
    groupBy,
    getOptionLabel,
    onChange,
    disableCloseOnSelect,
    renderOption,
    renderInput = (params) => <TextField {...params} variant="outlined" label="" />,
    ...rest
}: NsSelectAutocompleteProps): JSX.Element {
    const key = useMemo(() => name ?? uniqueId('v_selectac-'), [name]);

    const validateCallback = useCallback(
        (v: SelectItem | string | SelectItem[]) => composeValidators(validate, errorMessage)(v),
        [validate, errorMessage],
    );

    const [{ value, error }, setValue] = useFormField<SelectItem | string | SelectItem[]>({
        key,
        initialValue: (defaultValue || null) as string,
        validate: validateCallback,
    });

    const setValueCallback = useCallback(
        (event: SelectItem | SelectItem[]) => {
            setValue(event);
            // if (changed) {
            //     changed(event);
            // }
            if (onChange) {
                onchange;
            }
        },
        // [setValue, changed],
        [setValue, onChange],
    );

    React.useEffect(() => {
        if (disabled) {
            setValue((defaultValue || null) as string);
        }
    }, [disabled]);

    const items: SelectItem[] = React.useMemo(
        () =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            React.Children.map(children, (c: any) => ({
                label: c.props.children,
                value: c.props.value,
            })) || [],
        [children],
    );

    React.useEffect(() => {
        setValue((defaultValue || null) as string);
    }, [items]);

    return (
        <NsLabelInput nameHtml={key} label={label as string}>
            <Autocomplete<SelectItem, boolean, boolean, boolean>
                multiple={multiple}
                isOptionEqualToValue={isOptionEqualToValue}
                onChange={(_event, value) => setValueCallback(value as SelectItem | SelectItem[])}
                groupBy={groupBy}
                getOptionLabel={getOptionLabel}
                disableCloseOnSelect={disableCloseOnSelect}
                options={options ? options : items}
                disableClearable={!multiple}
                handleHomeEndKeys
                fullWidth
                disablePortal
                autoComplete
                value={value || []}
                disabled={disabled}
                renderOption={renderOption}
                renderInput={(props: AutocompleteRenderInputParams) => (
                    <TextField name={name} error={!!error} {...props} disabled={disabled} placeholder={placeholder} />
                )}
                {...rest}
            />
        </NsLabelInput>
    );
}
