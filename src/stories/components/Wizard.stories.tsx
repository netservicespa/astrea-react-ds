import EditIcon from '@mui/icons-material/Edit';
import { Container, MenuItem, Typography } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ValidatedTextInput } from '../../components/components/form/fields/ValidatedTextInput';
import { ValidatedSelectAutocomplete } from '../../components/components/form/fields/ValidatedSelectAutocomplete';
import { required } from '../../components/components/form/validators';
import { GridLayout } from '../../components/layout/GridLayout';
import { Wizard, WizardFormStep } from '../../components/wizard/Wizard';

export default {
  title: 'Patterns/Wizard',
  component: Wizard,
  parameters: {
    docs: { source: { type: 'code' } },
  },
  argTypes: {
    rowSize: {
      label: 'Row Size',
      type: 'number',
    },
  },
} as Meta<typeof Wizard>;

interface FormContents {
  name: string;
  field1?: string;
  field2?: string;
  field3?: string;
  field4?: string;
  field5?: string;
}

const Template: StoryFn<typeof Wizard> = (args) => {
  const { t } = useTranslation();
  const [data, setData] = React.useState<Partial<FormContents> | undefined>();
  const [finished, setFinished] = React.useState(false);
  console.log(data);
  if (finished) {
    return (
      <Container maxWidth={false}>
        <Typography>This is the result of the wizard:</Typography>
        <Typography component="pre">{JSON.stringify(data)}</Typography>
      </Container>
    );
  } else {
    return (
      <Wizard
        initialData={{ name: 'test' }}
        onStep={(result) => setData(result)}
        onCommit={(_) => {
          setFinished(true);
        }}
        onAbort={() => window.location.reload()}
      >
        <WizardFormStep name="First Step" icon={EditIcon}>
          <Typography mx={1} my={2}>
            Please insert the following information:
          </Typography>
          <GridLayout rowSize={1}>
            <ValidatedTextInput
              name="field1"
              label={t('Field 1')}
              defaultValue={data?.field1}
              validate={required}
              errorMessage={t('form.errors.required', {
                field: 'Field 1',
              })}
            />
            <ValidatedTextInput
              name="field2"
              label={t('Field 2')}
              defaultValue={data?.field2}
              validate={required}
              errorMessage={t('form.errors.required', {
                field: 'Field 2',
              })}
            />
          </GridLayout>
        </WizardFormStep>
        <WizardFormStep name="Second Step" icon={EditIcon}>
          <Typography mx={1} my={2}>
            Don't forget to fill this fields as well:
          </Typography>
          <GridLayout rowSize={1}>
            <ValidatedTextInput
              name="field3"
              label={t('Field 3')}
              defaultValue={data?.field3}
            />
            <ValidatedSelectAutocomplete
              name="field4"
              defaultValue={data?.field4}
              label={t('Field 4')}
              validate={required}
              errorMessage={t('form.errors.required', {
                field: 'Field 4',
              })}
            >
              <MenuItem value="first">First Item</MenuItem>
              <MenuItem value="second">Second Item</MenuItem>
              <MenuItem value="third">Third Item</MenuItem>
            </ValidatedSelectAutocomplete>
          </GridLayout>
        </WizardFormStep>
      </Wizard>
    );
  }
};

export const Grid = Template.bind({});
