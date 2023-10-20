import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';
import * as React from 'react';
import { useCallback, useMemo } from 'react';
import { SelectProps } from '@mui/material/Select/Select';
import { LabelInput } from '../../../components/LabelInput';
import { composeValidators, ValidatedInput } from '../validators';
import uniqueId from '../../../../util/uniqueId';
import { useFormField } from 'relay-forms';

export interface SelectItem {
  label: string;
  value: any;
}

export type ValidatedSelectAutocompleteProps = ValidatedInput<
  Omit<
    SelectProps &
      Partial<AutocompleteProps<SelectItem, boolean, boolean, boolean>>,
    'value'
  >,
  SelectItem | string
>;

export function ValidatedSelectAutocomplete({
  name,
  label,
  children,
  defaultValue,
  validate,
  errorMessage,
  disabled,
  changed,
  ...rest
}: ValidatedSelectAutocompleteProps): React.JSX.Element {
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

  return (
    <LabelInput nameHtml={key} label={label as string}>
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
        renderInput={(props) => (
          <TextField name={name} error={!!error} {...props} />
        )}
      />
    </LabelInput>
  );
}
