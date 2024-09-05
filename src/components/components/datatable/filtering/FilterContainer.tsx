import React from 'react';
import { DefaultButtons, NsForm } from '../../form/NsForm';
import { NsGridLayout } from '../../../layout/NsGridLayout';
import { NsTextInput } from '../../form/fields/NsTextInput';
import { NsDateCalendar } from '../../form/fields/NsDateCalendar';
import { Container, MenuItem } from '@mui/material';
import { NsSelectAutocomplete, SelectItem } from '../../form/fields/NsSelectAutocomplete';
import { useTranslation } from 'react-i18next';
export type TableFilters<T> = Partial<Record<keyof T, any>>;

export interface FilterContainerProps<T = {}> {
    activeFilters: TableFilters<T>;
    onFilterChange: (filters: TableFilters<T>) => void;
}

export interface FilterFieldDefinition<FilterType = {}> {
    key: keyof FilterType;
    label: string;
    type: 'text' | 'select' | 'date' | 'number';
    options?: SelectItem[];
}

export interface FilterFormProps<FilterType = {}> extends FilterContainerProps<FilterType> {
    fieldDefs: FilterFieldDefinition<FilterType>[];
}

export function NsDynamicFilterForm<FilterType = {}>({
    activeFilters,
    onFilterChange,
    fieldDefs: fields,
}: Readonly<FilterFormProps<FilterType>>) {
    const { t } = useTranslation();
    const [preloadedFilters, setPreloadedFilters] = React.useState(activeFilters);
    return (
        <Container maxWidth={false} sx={{ padding: '0 !important' }}>
            <NsForm
                buttonsSlot={
                    <DefaultButtons submitText={t('table.filters.apply')} resetText={t('table.filters.clear')} />
                }
                onReset={() => setPreloadedFilters({})}
                onSubmit={(data) => {
                    const filterValues = Object.fromEntries(
                        Object.entries(data).map(([k, v]) => {
                            let finalValue = v;
                            if (v && v['value'] !== undefined) {
                                finalValue = v['value'];
                            }
                            if (finalValue === '') {
                                finalValue = undefined;
                            }
                            return [k, finalValue];
                        }),
                    );
                    onFilterChange(filterValues as any);
                }}
            >
                <NsGridLayout rowSize={2}>
                    {fields.map((field) => (
                        <span key={field.key as string}>
                            {(field.type === 'text' || field.type === 'number') && (
                                <NsTextInput
                                    key={field.key as string}
                                    name={field.key as string}
                                    defaultValue={preloadedFilters[field.key] as string}
                                    label={field.label}
                                    type={field.type}
                                />
                            )}
                            {field.type === 'date' && (
                                <NsDateCalendar
                                    key={field.key as string}
                                    defaultValue={preloadedFilters[field.key] as string}
                                    name={field.key as string}
                                    label={field.label}
                                />
                            )}
                            {field.type === 'select' && (
                                <SelectField
                                    key={field.key as string}
                                    name={field.key as string}
                                    defaultValue={preloadedFilters[field.key]}
                                    label={field.label}
                                    options={field.options}
                                />
                            )}
                        </span>
                    ))}
                </NsGridLayout>
            </NsForm>
        </Container>
    );
}

interface SelectFieldProps {
    name: string;
    label: string;
    defaultValue?: SelectItem;
    options?: SelectItem[];
}

function SelectField({ name, label, options, defaultValue }: Readonly<SelectFieldProps>) {
    const { t } = useTranslation();
    const allOptionsLabel = t('table.filters.selectAll');
    const emptyOption = { label: allOptionsLabel, value: '' };
    const allOptions = React.useMemo(() => (options ? [emptyOption, ...options] : []), [options, defaultValue]);
    return (
        <NsSelectAutocomplete defaultValue={defaultValue ?? emptyOption} name={name} label={label}>
            {allOptions?.map(({ label, value }) => (
                <MenuItem key={label} value={value}>
                    {label}
                </MenuItem>
            ))}
        </NsSelectAutocomplete>
    );
}
