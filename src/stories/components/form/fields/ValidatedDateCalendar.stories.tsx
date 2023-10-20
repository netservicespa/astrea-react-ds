import { Grid } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ValidatedForm } from '../../../../components/components/form/ValidatedForm';
import { ValidatedDateCalendar } from '../../../../components/components/form/fields/ValidatedDateCalendar';
import { required } from '../../../../components/components/form/validators';

export default {
  title: 'Components/Form/Date Calendar',
  component: ValidatedDateCalendar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: { label: { type: 'string' } },
} as Meta<typeof ValidatedDateCalendar>;

const Template: StoryFn<typeof ValidatedDateCalendar> = (args) => {
  const [data, setData] = React.useState<any>({});
  const { t } = useTranslation();

  return (
    <ValidatedForm
      sx={{ width: '50%' }}
      onSubmit={(data: any) => setData(data)}
      onReset={() => setData({})}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ValidatedDateCalendar
            name="dateField"
            label="Date Field*"
            validate={required}
            errorMessage={t('form.errors.required', { field: 'Date Field' })}
          />
        </Grid>
      </Grid>
    </ValidatedForm>
  );
};

export const DateCalendars = Template.bind({});
