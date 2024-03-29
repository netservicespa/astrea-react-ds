import { Select } from '@mui/material';
import * as React from 'react';
import { useCallback, useMemo } from 'react';
import { SelectProps } from '@mui/material/Select/Select';
import { NsLabelInput } from '../../NsLabelInput';
import { composeValidators, NsInput } from '../validators';
import uniqueId from '../../../../util/uniqueId';
import { useFormField } from 'relay-forms';

export type NsSelectProps = NsInput<Omit<SelectProps, 'value'>, string>;

/*const SelectStyled = styled(Select)(({ theme }) => ({
	// stile qui
}));*/

/**
 * Componente select integrato con relay-forms.
 * Supporta la validazione tramite i campi validate
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
      const { value } = event.target;

      setValue(value);

      if (changed) {
        changed(event);
      }
    },
    [setValue, changed]
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
        placeholder={placeholder}
        onChange={setValueCallback}
        disabled={disabled}
      >
        {children}
      </Select>
    </NsLabelInput>
  );
};
