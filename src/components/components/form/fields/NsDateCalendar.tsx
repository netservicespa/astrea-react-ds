import { composeValidators, NsInput } from '@/components/components/form/validators';
import { NsLabelInput } from '@/components/components/NsLabelInput';
import uniqueId from '@/util/uniqueId';
import { TextFieldProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PickersInputComponentLocaleText } from '@mui/x-date-pickers/locales';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment, { Moment } from 'moment';
import * as React from 'react';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormField } from 'relay-forms';

const FMT = 'DD/MM/YYYY';

export type NsDateCalendarProps = NsInput<Omit<TextFieldProps, 'value'>, string> & {
    localeText?: PickersInputComponentLocaleText;
};

type RequiredProbeProps = {
    required?: boolean;
    id?: string;
};

const RequiredProbe: React.FC<RequiredProbeProps> = () => null;

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
    const theme = useTheme();

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
                    target: { value: formattedDate, name },
                    currentTarget: { value: formattedDate, name },
                    preventDefault: () => {},
                    stopPropagation: () => {},
                } as unknown as React.ChangeEvent<HTMLInputElement>;

                onChange(fakeEvent);
            }
        },
        [setValue, onChange, name],
    );

    React.useEffect(() => {
        if (disabled) {
            setValue(defaultValue as string);
        }
    }, [disabled, defaultValue, setValue]);

    return (
        <NsLabelInput nameHtml={key} label={label as string}>
            <RequiredProbe required={!!rest.required} />

            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={i18n.language}>
                <DatePicker
                    format={FMT}
                    value={value ? moment(value, FMT) : null}
                    onChange={setPickerValueCallback}
                    disabled={disabled}
                    slotProps={{
                        textField: {
                            id: key,
                            size: 'small',
                            error: !!error,
                            fullWidth: true,
                            ...rest,
                            sx: {
                                ...(error && {
                                    '& .MuiPickersInputBase-root': {
                                        color: theme.palette.error.main,
                                        WebkitTextFillColor: theme.palette.error.main,
                                        borderRadius: 0,
                                    },
                                    '& .MuiPickersInputBase-sectionsContainer': {
                                        color: theme.palette.error.main,
                                        WebkitTextFillColor: theme.palette.error.main,
                                        opacity: 1,
                                    },
                                    '& .MuiPickersSectionList-root': {
                                        color: theme.palette.error.main,
                                        WebkitTextFillColor: theme.palette.error.main,
                                        opacity: 1,
                                    },
                                    '& .MuiPickersSectionList-sectionContent': {
                                        color: theme.palette.error.main,
                                        WebkitTextFillColor: theme.palette.error.main,
                                        opacity: 1,
                                    },
                                    '& [data-placeholder="true"]': {
                                        color: theme.palette.error.main,
                                        WebkitTextFillColor: theme.palette.error.main,
                                        opacity: 1,
                                    },
                                    '& .MuiPickersOutlinedInput-root': {
                                        borderRadius: 0,
                                    },
                                    '& .MuiPickersOutlinedInput-notchedOutline': {
                                        borderRadius: 0,
                                    },
                                    '& fieldset': {
                                        borderRadius: 0,
                                    },
                                }),
                            },
                        },
                    }}
                    localeText={localeText}
                />
            </LocalizationProvider>
        </NsLabelInput>
    );
};
