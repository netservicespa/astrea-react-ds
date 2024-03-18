import { Grid, MenuItem } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { NsForm } from '../../../../components/components/form/NsForm';
import { NsSelectAutocomplete } from '../../../../components/components/form/fields/NsSelectAutocomplete';
import { required } from '../../../../components/components/form/validators';
import { useTranslation } from 'react-i18next';

export default {
  title: 'Components/Form/AutoCompleteSelect',
  component: NsSelectAutocomplete,
  argTypes: { label: { type: 'string' }, placeholder: { type: 'string' } },
} as Meta<typeof NsSelectAutocomplete>;

const data = ['1', '2'];
const Template: StoryFn<typeof NsSelectAutocomplete> = (args) => {
  const { t } = useTranslation();
  const { placeholder } = args;

  return (
    <NsForm onSubmit={() => {}} buttonsSlot={false}>
      <Grid container>
        <Grid item xs={3}>
          <NsSelectAutocomplete
            name="select"
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

export const AutoCompleteSelect = Template.bind({});
