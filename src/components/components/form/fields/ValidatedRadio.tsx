import { Radio, RadioProps, FormControlLabel } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useFormField } from 'relay-forms';
import uniqueId from '../../../../util/uniqueId';
import { composeValidators, ValidatedInput } from '../validators';

interface AdditionalProps {
  label: string;
  labelPlacement?: 'bottom' | 'end' | 'start' | 'top';
}

export type ValidatedRadioProps = ValidatedInput<
  Omit<RadioProps, 'value'> & AdditionalProps,
  boolean
>;

export const ValidatedRadio: React.FC<ValidatedRadioProps> = ({
  name,
  defaultChecked,
  validate,
  label,
  labelPlacement,
  errorMessage,
  disabled,
  ...rest
}) => {
  const key = useMemo(() => name || uniqueId('v_txt-'), [name]);

  const validateCallback = useCallback(
    (v: boolean) => composeValidators(validate, errorMessage)(v),
    [validate, errorMessage]
  );

  const [{ value }, setValue] = useFormField({
    key,
    initialValue: defaultChecked || false,
    validate: validateCallback,
  });

  const setValueCallback = useCallback(
    (event: any) => {
      const value = event.target.checked;
      setValue(value);
    },
    [setValue]
  );

  React.useEffect(() => {
    if (disabled) {
      setValue(defaultChecked || false);
    }
  }, [disabled]);

  return (
    <FormControlLabel
      control={
        <Radio
          {...rest}
          value={value}
          onChange={setValueCallback}
        />
      }
      labelPlacement={labelPlacement || 'end'}
      label={label}
      disabled={disabled}
    />
  );
};
