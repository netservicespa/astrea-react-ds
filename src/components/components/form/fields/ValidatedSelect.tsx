import { Select } from '@mui/material';
import * as React from 'react';
import { useCallback, useMemo } from 'react';
import { SelectProps } from '@mui/material/Select/Select';
import { LabelInput } from '../../../components/LabelInput';
import { composeValidators, ValidatedInput } from '../validators';
import uniqueId from '../../../../util/uniqueId';
import { useFormField } from 'relay-forms';

export type ValidatedSelectProps = ValidatedInput<
  Omit<SelectProps, 'value'>,
  string
>;

/**
 * Componente select integrato con relay-forms.
 * Supporta la validazione tramite i campi validate
 */
export const ValidatedSelect: React.FC<ValidatedSelectProps> = ({
  name,
  /** Etichetta della select */
  label,
  children,
  size,
  defaultValue,
  validate,
  errorMessage,
  changed,
  disabled,
  ...rest
}) => {
  const key = useMemo(() => name || uniqueId('v_select-'), [name]);
  const validateCallback = useCallback(
    (v: string) => composeValidators(validate, errorMessage)(v),
    [validate, errorMessage]
  );

  const [{ value, error }, setValue] = useFormField({
    key,
    initialValue: (defaultValue || '') as string,
    validate: validateCallback,
  });

  const setValueCallback = useCallback(
    (event: any) => {
      if (changed) {
        changed(event);
      }
      const value = event.target.value;
      setValue(value);
    },
    [setValue]
  );

  React.useEffect(() => {
    if (disabled) {
      setValue((defaultValue || '') as string);
    }
  }, [disabled]);

  return (
    <LabelInput nameHtml={key} label={label as string}>
      <Select
        {...rest}
        name={name}
        error={!!error}
        value={value}
        defaultValue={defaultValue}
        fullWidth
        size={size}
        onChange={setValueCallback}
        disabled={disabled}
      >
        {children}
      </Select>
    </LabelInput>
  );
};
