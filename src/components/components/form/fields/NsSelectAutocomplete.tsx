import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';
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
}

export type NsSelectAutocompleteProps = NsInput<
  Omit<
    SelectProps &
      Partial<AutocompleteProps<SelectItem, boolean, boolean, boolean>>,
    'value'
  >,
  SelectItem | string
>;

export function NsSelectAutocomplete({
  name,
  label,
  children,
  defaultValue,
  validate,
  errorMessage,
  disabled,
  placeholder,
  changed,
  ...rest
}: NsSelectAutocompleteProps): JSX.Element {
  const key = useMemo(() => name ?? uniqueId('v_selectac-'), [name]);

  const validateCallback = useCallback(
    (v: SelectItem | string) => composeValidators(validate, errorMessage)(v),
    [validate, errorMessage]
  );

  const [{ value, error }, setValue] = useFormField<SelectItem | string>({
    key,
    initialValue: (defaultValue || null) as string,
    validate: validateCallback,
  });

  const setValueCallback = useCallback(
    (event: SelectItem) => {
      setValue(event);
      if (changed) {
        changed!(event);
      }
    },
    [setValue]
  );

  React.useEffect(() => {
    if (disabled) {
      setValue((defaultValue || null) as string);
    }
  }, [disabled]);

  const items: SelectItem[] = React.useMemo(
    () =>
      React.Children.map(children, (c: any) => ({
        label: c.props.children,
        value: c.props.value,
      })) || [],
    [children]
  );

  React.useEffect(() => {
    setValue((defaultValue || null) as string);
  }, [items]);

  return (
    <NsLabelInput nameHtml={key} label={label as string}>
      <Autocomplete<SelectItem, boolean, boolean, boolean>
        {...rest}
        onChange={(_event, value) => setValueCallback(value as SelectItem)}
        options={items}
        disableClearable
        handleHomeEndKeys
        fullWidth
        disablePortal
        autoComplete
        value={value}
        disabled={disabled}
        renderInput={(props: any) => (
          <TextField
            name={name}
            error={!!error}
            {...props}
            disabled={disabled}
            placeholder={placeholder}
          />
        )}
      />
    </NsLabelInput>
  );
}
