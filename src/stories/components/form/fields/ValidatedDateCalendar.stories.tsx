import { Grid } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ValidatedForm } from '../../../../components/components/form/ValidatedForm';
import { ValidatedDateCalendar } from '../../../../components/components/form/fields/ValidatedDateCalendar';
import {
  ValidatorFactoryType,
  required,
} from '../../../../components/components/form/validators';
import { FormValueStateReturn } from 'relay-forms';
import moment from 'moment';

export default {
  title: 'Components/Form/Date Calendar',
  component: ValidatedDateCalendar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: { label: { type: 'string' } },
} as Meta<typeof ValidatedDateCalendar>;

function isRangeValid<ValueType>(message: React.ReactNode) {
  return (
    endDate: ValueType,
    deps?: { [key: string]: FormValueStateReturn<any> }
  ) => {
    if (deps && deps['dateFieldFrom']) {
      const { value } = deps['dateFieldFrom'];
      if (value && value.length > 0) {
        const start = moment(value, 'DD/MM/YYYY');
        const end = moment(endDate as string, 'DD/MM/YYYY');
        if (!start.isSameOrBefore(end)) {
          return message as string;
        }
      }
    }
    return undefined;
  };
}

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
            name="birthdaydate"
            label="Birthday date"
            validate={required}
            errorMessage={t('form.errors.required', { field: 'Birthday date' })}
          />
          
        </Grid>
      </Grid>
    </ValidatedForm>
  );
};

export const DateCalendars = Template.bind({});
