import { Grid, MenuItem } from '@mui/material';
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

const Template: StoryFn<typeof NsSelect> = (args) => {
  const { t } = useTranslation();

  return (
    <NsForm onSubmit={() => {}} buttonsSlot={false}>
      <Grid container>
        <Grid item xs={3}>
          <NsSelect
            name="select"
            defaultValue=""
            label="Select"
            validate={required}
            errorMessage={t('form.errors.required', { field: 'Select' })}
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
  children: (
    <MenuItem key={1} value="1">
      1
    </MenuItem>
  ),
};
