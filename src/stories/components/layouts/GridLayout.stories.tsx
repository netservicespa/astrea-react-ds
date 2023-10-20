import { Container, Divider, Typography } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { ValidatedForm } from '../../../components/components/form/ValidatedForm';
import { ValidatedTextInput } from '../../../components/components/form/fields/ValidatedTextInput';
import { ValidatedDateCalendar } from '../../../components/components/form/fields/ValidatedDateCalendar';
import { required } from '../../../components/components/form/validators';
import { GridLayout } from '../../../components/layout/GridLayout';
import { useTranslation } from 'react-i18next';

export default {
  title: 'Layouts/GridLayout',
  component: GridLayout,
  parameters: {
    docs: { source: { type: 'code' } },
  },
  argTypes: {
    rowSize: {
      label: 'Row Size',
      type: 'number',
    },
  },
} as Meta<typeof GridLayout>;

interface FormContents {
  field1?: string;
  field2?: string;
  field3?: string;
  field4?: string;
  field5?: string;
}

const Template: StoryFn<typeof GridLayout> = (args) => {
  const { t } = useTranslation();
  const [data, setData] = React.useState<FormContents>({});
  return (
    <>
      <ValidatedForm onSubmit={setData} onReset={() => setData({})}>
        <GridLayout rowSize={args.rowSize}>
          <ValidatedTextInput
            name="field1"
            label="Field 1*"
            validate={required}
            errorMessage={t('form.errors.required', { field: 'Field 1' })}
          />
          <ValidatedTextInput name="field2" label="Field 2" />
          <ValidatedTextInput name="field3" label="Field 3" />
          <ValidatedDateCalendar name="field4" label="Field 4" />
          <ValidatedTextInput name="field5" label="Field 5" />
        </GridLayout>
      </ValidatedForm>
      <Container maxWidth={false}>
        <Divider sx={{ my: 4 }} />
        <Typography>Form Data:</Typography>
        <Typography component="pre">{JSON.stringify(data, null, 2)}</Typography>
      </Container>
    </>
  );
};

export const Grid = Template.bind({});

Grid.args = {
  rowSize: 2,
};
