import { Radio, RadioProps, FormControlLabel } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useFormField } from 'relay-forms';
import uniqueId from '../../../../util/uniqueId';
import { composeValidators, NsInput } from '../validators';

interface AdditionalProps {
  label: string;
  labelPlacement?: 'bottom' | 'end' | 'start' | 'top';
  value: string; // Aggiungi questa prop per il valore di ogni radio button
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Handler per cambiamenti
  checked: boolean; // Determina se il radio è selezionato
}

export type NsRadioProps = NsInput<
  Omit<RadioProps, 'value'> & AdditionalProps,
  boolean
>;

export const NsRadio: React.FC<NsRadioProps> = ({
  name,
  defaultChecked,
  validate,
  label,
  labelPlacement,
  errorMessage,
  disabled,
  value, // Usa questa prop per il valore del radio
  onChange, // Usa questa prop per gestire i cambiamenti
  checked, // Determina se il radio è selezionato
  ...rest
}) => {
  const key = useMemo(() => name || uniqueId('v_txt-'), [name]);

  const validateCallback = useCallback(
    (v: boolean) => composeValidators(validate, errorMessage)(v),
    [validate, errorMessage]
  );

  const [{ value: fieldValue }, setFieldValue] = useFormField({
    key,
    initialValue: defaultChecked || false,
    validate: validateCallback,
  });

  const setValueCallback = useCallback(
    (event: any) => {
      const value = event.target.checked;
      setFieldValue(value);
    },
    [setFieldValue]
  );

  React.useEffect(() => {
    if (disabled) {
      setFieldValue(defaultChecked || false);
    }
  }, [disabled, defaultChecked, setFieldValue]);

  return (
    <FormControlLabel
      control={
        <Radio {...rest} checked={checked} onChange={onChange} value={value} />
      }
      labelPlacement={labelPlacement || 'end'}
      label={label}
      disabled={disabled}
    />
  );
};
