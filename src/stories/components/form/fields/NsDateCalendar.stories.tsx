import { Grid } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NsForm } from 'src/components/components/form/NsForm';
import { NsDateCalendar } from 'src/components/components/form/fields/NsDateCalendar';
import {
  ValidatorFactoryType,
  required,
} from 'src/components/components/form/validators';
import { FormValueStateReturn } from 'relay-forms';
import moment from 'moment';

export default {
  title: 'Components/Form/Date Calendar',
  component: NsDateCalendar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: { label: { type: 'string' } },
} as Meta<typeof NsDateCalendar>;

function isRangeValid<ValueType>(message: React.ReactNode) {
  return (
    endDate: ValueType,
    deps?: { [key: string]: FormValueStateReturn<any> },
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

const Template: StoryFn<typeof NsDateCalendar> = (args) => {
  const [data, setData] = React.useState<any>({});
  const { t } = useTranslation();

  return (
    <NsForm
      sx={{ width: '50%' }}
      onSubmit={(data: any) => setData(data)}
      onReset={() => setData({})}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <NsDateCalendar
            name="birthdaydate"
            label="Birthday date"
            validate={required}
            errorMessage={t('form.errors.required', { field: 'Birthday date' })}
          />
        </Grid>
      </Grid>
    </NsForm>
  );
};

export const DateCalendars = Template.bind({});
