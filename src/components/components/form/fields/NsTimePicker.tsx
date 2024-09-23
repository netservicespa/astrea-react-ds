import { TextFieldProps } from '@mui/material';
import * as React from 'react';
import { useCallback, useMemo } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { composeValidators, NsInput } from '../validators';
import { NsLabelInput } from '../../NsLabelInput';
import uniqueId from '../../../../util/uniqueId';
import { useFormField } from 'relay-forms';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment, { Moment } from 'moment';
import { PickersInputComponentLocaleText } from '@mui/x-date-pickers/locales';
import { useTranslation } from 'react-i18next';
import { TimePicker } from '@mui/x-date-pickers';

const FMT = 'HH:mm';

export type NsTimePickerProps = NsInput<Omit<TextFieldProps, 'value'>, string> & {
    localeText?: PickersInputComponentLocaleText<moment.Moment>;
    format?: string;
    ampm?: boolean;
};

export const NsTimePicker: React.FC<NsTimePickerProps> = ({
    name,
    label,
    defaultValue,
    validate,
    errorMessage,
    disabled,
    dependsOn,
    onChange,
    ampm = false,
    format = FMT,
    localeText,
    ...rest
}) => {
    const key = useMemo(() => name || uniqueId('v_picker-'), [name]);
    const deps = useMemo(() => dependsOn, []);
    const { i18n } = useTranslation();

    const validateCallback = useCallback(
        (v: string, deps: any) => composeValidators(validate, errorMessage)(v, deps),
        [validate, errorMessage],
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
        [setValue, onChange],
    );

    React.useEffect(() => {
        if (disabled) {
            setValue(defaultValue as string);
        }
    }, [disabled]);

    return (
        <NsLabelInput nameHtml={key} label={label as string}>
            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={i18n.language}>
                <TimePicker
                    format={format}
                    ampm={ampm}
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
