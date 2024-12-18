import { Grid, MenuItem, SelectChangeEvent } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { NsForm } from 'src/components/components/form/NsForm';
import { NsSelect } from 'src/components/components/form/fields/NsSelect';
import { useTranslation } from 'react-i18next';
import { required } from 'src/components/components/form/validators';

export default {
    title: 'Components/Form/Select',
    component: NsSelect,
    argTypes: { label: { type: 'string' } },
} as Meta<typeof NsSelect>;

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

const Template: StoryFn<typeof NsSelect> = (args) => {
    const { t } = useTranslation();
    return (
        <NsForm onSubmit={() => {
        }} buttonsSlot={false}>
            <Grid container>
                <Grid item xs={3}>
                    <NsSelect
                        name="select"
                        defaultValue={args.multiple ? [] : ''}
                        label="Select"
                        validate={required}
                        errorMessage={t('form.errors.required', { field: 'Select' })}
                        multiple={args.multiple}
                    >
                        {args.children}
                    </NsSelect>
                </Grid>
            </Grid>
        </NsForm>
    );
};

export const Select = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Select.args = {
    children: [
        <MenuItem key={1} value="1">
            1
        </MenuItem>,
        <MenuItem key={2} value="2">
            2
        </MenuItem>,
        <MenuItem key={3} value="3">
            3
        </MenuItem>,
    ],
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
    multiple: true,
    value: names,
    children: names.map((name, index) => (
        <MenuItem key={index} value={name}>
            {name}
        </MenuItem>
    )),
};
