import { Grid, MenuItem } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { NsForm } from 'src/components/components/form/NsForm';
import { NsSelectAutocomplete } from 'src/components/components/form/fields/NsSelectAutocomplete';
import { required } from 'src/components/components/form/validators';
import { useTranslation } from 'react-i18next';

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

const MultiSelectTemplate: StoryFn<typeof NsSelectAutocomplete> = (args) => {
  const { t } = useTranslation();
  const { placeholder } = args;

  return (
    <NsForm onSubmit={() => {}} buttonsSlot={false}>
      <Grid container>
        <Grid item xs={3}>
          <NsSelectAutocomplete
            name="select-multiple"
            defaultValue={[]}
            label="Autocomplete MultiSelect"
            validate={required}
            placeholder={placeholder}
            multiple={true}
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

export const AutoCompleteSelect = SingleSelectTemplate.bind({});
AutoCompleteSelect.args = {
  label: 'Select One Option',
  placeholder: 'Choose an option',
};

export const AutoCompleteMultiSelect = MultiSelectTemplate.bind({});
AutoCompleteMultiSelect.args = {
  label: 'Select Multiple Options',
  placeholder: 'Choose multiple options',
};