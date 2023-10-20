import { Grid, MenuItem } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { ValidatedForm } from '../../../../components/components/form/ValidatedForm';
import { ValidatedSelectAutocomplete } from '../../../../components/components/form/fields/ValidatedSelectAutocomplete';
import {required} from "../../../../components/components/form/validators";
import {useTranslation} from "react-i18next";

export default {
  title: 'Components/Form/AutoCompleteSelect',
  component: ValidatedSelectAutocomplete,
  argTypes: { label: { type: 'string' } },
} as Meta<typeof ValidatedSelectAutocomplete>;

const data = ['1', '2'];
const Template: StoryFn<typeof ValidatedSelectAutocomplete> = (args) => {
  const { t } = useTranslation();

  return (
    <ValidatedForm onSubmit={() => {}} showButtons={false}>
      <Grid container>
        <Grid item xs={3}>
          <ValidatedSelectAutocomplete
            name="select"
            defaultValue=""
            label="Autocomplete Select"
            validate={required}
            errorMessage={t('form.errors.required', { field: 'Select Autocomplete' })}
          >
            {data.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </ValidatedSelectAutocomplete>
        </Grid>
      </Grid>
    </ValidatedForm>
  );
};

export const AutoCompleteSelect = Template.bind({});
