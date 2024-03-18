import { InputProps, TextareaAutosize } from '@mui/material';
import { styled } from '@mui/system';
import React, { useCallback, useMemo } from 'react';
import { useFormField } from 'relay-forms';
import uniqueId from '../../../../util/uniqueId';
import { NsLabelInput } from '../../NsLabelInput';
import { NsInput, composeValidators } from '../validators';

export type NsTextAreaProps = NsInput<Omit<InputProps, 'value'>, string>;

const TextareaAutosizeStyled = styled(TextareaAutosize)(
  ({ theme, error }: { theme: any; error: boolean }) => ({
    fontFamily: `${theme.typography.fontFamily}`,
    display: 'block',
    padding: 8,
    minHeight: '90px',
    width: '100%',
    borderColor: error ? 'red' : '#B1B4B6',
    outline: '0',
    borderRadius: '0',
    '&:focus': {
      boxShadow: `0 0 0 3px ${theme.palette.focus.main}`,
      borderWidth: '3px',
    },
    '&:hover': {
      borderColor: error ? 'red' : '#0B0C0C',
    },
  })
);

/**
 * Campo di testo integrato con relay-forms.
 * Supporta la validazione tramite i campi validate
 */
export const NsTextArea: React.FC<any> = ({
  name,
  label,
  defaultValue,
  validate,
  errorMessage,
  disabled,
  placeholder,
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
    <NsLabelInput nameHtml={key} label={label as string}>
      <TextareaAutosizeStyled
        {...rest}
        fullWidth
        value={value}
        error={!!error}
        onChange={setValueCallback}
        disabled={disabled}
        multiline
        placeholder={placeholder}
      />
    </NsLabelInput>
  );
};
