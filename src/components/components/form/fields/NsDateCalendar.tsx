import { TextFieldProps } from '@mui/material';
import * as React from 'react';
import { useCallback, useMemo } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { composeValidators, NsInput } from '../validators';
import { NsLabelInput } from '../../NsLabelInput';
import uniqueId from '../../../../util/uniqueId';
import { useFormField } from 'relay-forms';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment, { Moment } from 'moment';
import { PickersInputComponentLocaleText } from '@mui/x-date-pickers/locales';
import { useTranslation } from 'react-i18next';

const FMT = 'DD/MM/YYYY';

export type NsDateCalendarProps = NsInput<
  Omit<TextFieldProps, 'value'>,
  string
> & {
  localeText?: PickersInputComponentLocaleText<moment.Moment>;
};

export const NsDateCalendar: React.FC<NsDateCalendarProps> = ({
  name,
  label,
  defaultValue,
  validate,
  errorMessage,
  disabled,
  dependsOn,
  onChange,
  localeText,
  ...rest
}) => {
  const key = useMemo(() => name || uniqueId('v_picker-'), [name]);
  const deps = useMemo(() => dependsOn, []);
  const { i18n } = useTranslation();

  const validateCallback = useCallback(
    (v: string, deps: any) =>
      composeValidators(validate, errorMessage)(v, deps),
    [validate, errorMessage]
  );

  const [{ value, error }, setValue] = useFormField<string>({
    key,
    initialValue: defaultValue as string,
    validate: validateCallback,
    dependsOn: deps,
  });

  const setPickerValueCallback = useCallback(
    (date: Moment | null) => {
      const formattedDate = date ? date.format(FMT) : '';
      setValue(formattedDate);

      if (onChange) {
        const fakeEvent = {
          target: { value: formattedDate, name: name },
          currentTarget: { value: formattedDate, name: name },
          preventDefault: () => {},
          stopPropagation: () => {},
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        onChange(fakeEvent);
      }
    },
    [setValue, onChange]
  );

  React.useEffect(() => {
    if (disabled) {
      setValue(defaultValue as string);
    }
  }, [disabled]);

  return (
    <NsLabelInput nameHtml={key} label={label as string}>
      <LocalizationProvider
        dateAdapter={AdapterMoment}
        adapterLocale={i18n.language}
      >
        <DatePicker
          format={FMT}
          value={moment(value, FMT)}
          onChange={setPickerValueCallback}
          disabled={disabled}
          slotProps={{
            textField: { error: !!error, fullWidth: true, ...rest },
          }}
          localeText={localeText}
        />
      </LocalizationProvider>
    </NsLabelInput>
  );
};
