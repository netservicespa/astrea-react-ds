import { Grid, MenuItem } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { ValidatedForm } from '../../../../components/components/form/ValidatedForm';
import { ValidatedSelect } from '../../../../components/components/form/fields/ValidatedSelect';
import {useTranslation} from "react-i18next";
import {required} from "../../../../components/components/form/validators";

export default {
  title: 'Components/Form/Select',
  component: ValidatedSelect,
  argTypes: { label: { type: 'string' } },
} as Meta<typeof ValidatedSelect>;

const Template: StoryFn<typeof ValidatedSelect> = (args) => {
  const { t } = useTranslation();

  return (
    <ValidatedForm onSubmit={() => {}} showButtons={false}>
      <Grid container>
        <Grid item xs={3}>
          <ValidatedSelect
              name="select"
              defaultValue=""
              label="Select"
              validate={required}
              errorMessage={t('form.errors.required', { field: 'Select' })}
          >
            {args.children}
          </ValidatedSelect>
        </Grid>
      </Grid>
    </ValidatedForm>
  );
};

export const Select = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Select.args = {
  children: (
    <MenuItem key={1} value="1">
      1
    </MenuItem>
  ),
};
