import { Grid, MenuItem, TextField } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import { NsForm } from 'src/components/components/form/NsForm';
import { NsSelectAutocomplete, SelectItem } from 'src/components/components/form/fields/NsSelectAutocomplete';
import { required } from 'src/components/components/form/validators';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Box } from '@mui/system';

export default {
    title: 'Components/Form/AutoCompleteSelect',
    component: NsSelectAutocomplete,
    argTypes: { label: { type: 'string' }, placeholder: { type: 'string' } },
} as Meta<typeof NsSelectAutocomplete>;

const data = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

const SingleSelectTemplate: StoryFn<typeof NsSelectAutocomplete> = (args) => {
    const { t } = useTranslation();
    const { placeholder } = args;

    return (
        <NsForm onSubmit={() => {}} buttonsSlot={false}>
            <Grid container>
                <Grid item xs={3}>
                    <NsSelectAutocomplete
                        name="select-single"
                        defaultValue=""
                        label="Autocomplete Select"
                        validate={required}
                        placeholder={placeholder}
                        errorMessage={t('form.errors.required', {
                            field: 'Select Autocomplete',
                        })}
                    >
                        {data.map((item) => (
                            <MenuItem key={item} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </NsSelectAutocomplete>
                </Grid>
            </Grid>
        </NsForm>
    );
};

const products: SelectItem[] = [
    { label: 'Laptop', value: 'laptop', groupDescrizione: 'Electronics', descrizione: 'High-performance laptop' },
    {
        label: 'Smartphone',
        value: 'smartphone',
        groupDescrizione: 'Electronics',
        descrizione: 'Latest model smartphone',
    },
    { label: 'T-shirt', value: 'tshirt', groupDescrizione: 'Clothing', descrizione: 'Comfortable cotton t-shirt' },
    { label: 'Jeans', value: 'jeans', groupDescrizione: 'Clothing', descrizione: 'Stylish denim jeans' },
];

const GroupedSelectTemplate: StoryFn<typeof NsSelectAutocomplete> = (args) => {
    const [selectedProducts, setSelectedProducts] = useState<SelectItem | SelectItem[]>([]);

    const handleChange = (event: React.ChangeEvent<{}>, value: SelectItem | SelectItem[] | null) => {
        setSelectedProducts(event);
        console.log(event);
    };
    useEffect(() => {
        console.log('products', selectedProducts);
    }, [selectedProducts]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <NsForm onSubmit={() => {}} buttonsSlot={false}>
                <Grid container>
                    <Grid item xs={6}>
                        <NsSelectAutocomplete
                            multiple
                            options={products}
                            groupBy={(option: SelectItem) => option.groupDescrizione || ''}
                            getOptionLabel={(option: SelectItem) => option.descrizione || ''}
                            // onChange={handleChange}
                            changed={handleChange}
                            disableCloseOnSelect
                            renderOption={(props, option: SelectItem, { selected }) => (
                                <li {...props}>{option.descrizione}</li>
                            )}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" label="Select Products" />
                            )}
                            {...args}
                        />
                    </Grid>
                </Grid>
            </NsForm>
            <ul>
                {selectedProducts.map((product: SelectItem) => (
                    <li key={product.value}>{product.descrizione}</li>
                ))}
            </ul>
        </Box>
    );
};

const CheckboxSelectTemplate: StoryFn<typeof NsSelectAutocomplete> = (args) => {
    const [selectedProducts, setSelectedProducts] = useState<SelectItem[]>([]);

    const handleChange = (event: React.ChangeEvent<{}>, value: SelectItem | SelectItem[] | null) => {
        setSelectedProducts(value as SelectItem[]);
    };

    const handleCheckboxChange = (option: SelectItem) => {
        setSelectedProducts((prevSelected) =>
            prevSelected.some((item) => item.value === option.value)
                ? prevSelected.filter((item) => item.value !== option.value)
                : [...prevSelected, option],
        );
    };

    return (
        <NsForm onSubmit={() => {}} buttonsSlot={false}>
            <Grid container>
                <Grid item xs={6}>
                    <NsSelectAutocomplete
                        multiple
                        options={products}
                        groupBy={(option: SelectItem) => option.groupDescrizione || ''}
                        getOptionLabel={(option: SelectItem) => option.descrizione || ''}
                        onChange={handleChange}
                        disableCloseOnSelect
                        renderOption={(props, option: SelectItem, { selected }) => (
                            <li {...props}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selected}
                                        onChange={() => handleCheckboxChange(option)}
                                    />
                                    {option.descrizione}
                                </label>
                            </li>
                        )}
                        renderInput={(params) => <TextField {...params} variant="outlined" label="Select Products" />}
                        {...args}
                    />
                </Grid>
            </Grid>
        </NsForm>
    );
};

export const SingleSelect = SingleSelectTemplate.bind({});
SingleSelect.args = {
    label: 'Single Select',
    placeholder: 'Select an option',
};

export const GroupedSelect = GroupedSelectTemplate.bind({});
GroupedSelect.args = {
    label: 'Grouped Select',
    placeholder: 'Select products',
};

export const CheckboxSelect = CheckboxSelectTemplate.bind({});
CheckboxSelect.args = {
    label: 'Checkbox Select',
    placeholder: 'Select products',
};
