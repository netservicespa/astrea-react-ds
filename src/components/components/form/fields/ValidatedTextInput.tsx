import { TextField, TextFieldProps } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useFormField } from 'relay-forms';
import uniqueId from '../../../../util/uniqueId';
import { LabelInput } from '../../LabelInput';
import { ValidatedInput, composeValidators } from '../validators';

export type ValidatedTextInputProps = ValidatedInput<
  Omit<TextFieldProps, 'value'>,
  string
>;

/**
 * Campo di testo integrato con relay-forms.
 * Supporta la validazione tramite i campi validate
 */
export const ValidatedTextInput: React.FC<ValidatedTextInputProps> = ({
  name,
  label,
  defaultValue,
  validate,
  errorMessage,
  disabled,
  onChange,
  ...rest
}) => {
  const key = useMemo(() => name || uniqueId('v_txt-'), [name]);

  const validateCallback = useCallback(
    (v: string) => composeValidators(validate, errorMessage)(v),
    [validate, errorMessage]
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
      setValue(value);

      if (onChange) {
        onChange(event);
      }
    },
    [setValue, onChange]
  );

  return (
    <LabelInput nameHtml={key} label={label as string}>
      <TextField
        {...rest}
        fullWidth
        value={value}
        error={!!error}
        onChange={setValueCallback}
        disabled={disabled}
      />
    </LabelInput>
  );
};
