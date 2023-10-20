import { TextField, TextFieldProps } from '@mui/material';
import * as React from 'react';
import { useCallback, useMemo } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { composeValidators, ValidatedInput } from '../validators';
import { LabelInput } from '../../../components/LabelInput';
import uniqueId from '../../../../util/uniqueId';
import { useFormField } from 'relay-forms';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment, { Moment } from 'moment';

const FMT = 'DD/MM/YYYY';

export type ValidatedDateCalendarProps = ValidatedInput<
  Omit<TextFieldProps, 'value'>,
  string
>;


export const ValidatedDateCalendar: React.FC<ValidatedDateCalendarProps> = ({
  name,
  label,
  defaultValue,
  validate,
  errorMessage,
  disabled,
  ...rest
}) => {
  const key = useMemo(() => name || uniqueId('v_picker-'), [name]);

  const validateCallback = useCallback(
    (v: string) => composeValidators(validate, errorMessage)(v),
    [validate, errorMessage]
  );

  const [{ value, error }, setValue] = useFormField<string>({
    key,
    initialValue: defaultValue as string,
    validate: validateCallback,
  });

  const setPickerValueCallback = useCallback(
    (value: Moment | null) => {
      setValue(value ? value!.format(FMT) : '');
    },
    [setValue]
  );

  React.useEffect(() => {
    if (disabled) {
      setValue(defaultValue as string);
    }
  }, [disabled]);

  return (
    <LabelInput nameHtml={key} label={label as string}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          format={FMT}
          value={moment(value, FMT)}
          onChange={setPickerValueCallback}
          disabled={disabled}
          slotProps={{
            textField: { error: !!error, fullWidth: true, ...rest },
          }}
        />
      </LocalizationProvider>
    </LabelInput>
  );
};
