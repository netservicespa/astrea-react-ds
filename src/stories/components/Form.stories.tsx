import { Container, Divider, Grid, Typography } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ValidatedForm } from '../../components/components/form/ValidatedForm';
import { ValidatedTextInput } from '../../components/components/form/fields/ValidatedTextInput';
import { ValidatedDateCalendar } from '../../components/components/form/fields/ValidatedDateCalendar';
import { required } from '../../components/components/form/validators';

export default {
  title: 'Components/Forms',
  component: ValidatedForm,
  parameters: {
    docs: { source: { type: 'code' } },
  },
} as Meta<typeof ValidatedForm>;

interface FormContents {
  textField?: string;
  dateField?: string;
}

/**
 * Bello come il sole
 * @param args
 * @returns
 */
const Template: StoryFn<typeof ValidatedForm> = (args) => {
  const { t } = useTranslation();
  const [data, setData] = React.useState<FormContents>({});
  return (
    <>
      <ValidatedForm
        {...args}
        sx={{ width: '50%' }}
        onSubmit={(data: any) => setData(data)}
        onReset={() => setData({})}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ValidatedTextInput
              name="textField"
              label="Text Field"
              validate={required}
              errorMessage={t('form.errors.required', { field: 'Text Field' })}
              required={true}
            />
          </Grid>
          <Grid item xs={12}>
            <ValidatedDateCalendar
              name="dateField"
              label="Date Field"
              validate={required}
              errorMessage={t('form.errors.required', { field: 'Date Field' })}
              required={true}
            />
          </Grid>
        </Grid>
      </ValidatedForm>
      <Container maxWidth={false}>
        <Divider sx={{ my: 4 }} />
        <Typography>Form Data:</Typography>
        <Typography component="pre">{JSON.stringify(data, null, 2)}</Typography>
      </Container>
    </>
  );
};

export const Form = Template.bind({});