import DataObjectSharp from '@mui/icons-material/DataObjectSharp';
import EditIcon from '@mui/icons-material/Edit';
import SummarizeIcon from '@mui/icons-material/Summarize';
import {
  Container,
  Grid,
  MenuItem,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ValidatedCheckbox } from '../../components/components/form/fields/ValidatedCheckbox';
import {
  SelectItem,
  ValidatedSelectAutocomplete,
} from '../../components/components/form/fields/ValidatedSelectAutocomplete';
import { ValidatedTextInput } from '../../components/components/form/fields/ValidatedTextInput';
import { required } from '../../components/components/form/validators';
import { GridLayout } from '../../components/layout/GridLayout';
import { WizardStepperProps } from '../../components/wizard/Stepper';
import {
  Wizard,
  WizardFormStep,
  WizardProgressButtons,
  WizardStep,
} from '../../components/wizard/Wizard';
import { useWizard } from '../../components/wizard/WizardContext';

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
  field4?: SelectItem;
  field5?: string;
  check1?: boolean;
}

const Template: StoryFn<typeof Wizard> = ({ sx, StepperSlot }) => {
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
    console.log(sx, StepperSlot);
    return (
      <Wizard
        sx={sx}
        StepperSlot={StepperSlot}
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
            <ValidatedCheckbox
              name="check1"
              label={t('Check 1')}
              defaultChecked={data?.check1}
            />
          </GridLayout>
        </WizardFormStep>
        <WizardFormStep name="Second Step" icon={DataObjectSharp}>
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
        <WizardStep name="Summary" icon={SummarizeIcon}>
          <SummaryStep />
        </WizardStep>
      </Wizard>
    );
  }
};

const SummaryStep: React.FC = () => {
  const { next, previous, state } = useWizard<FormContents>();

  return (
    <Container maxWidth={false}>
      <Typography mx={1} my={2}>
        Summary
      </Typography>
      <GridLayout rowSize={1}>
        <Typography>Field1={state.data?.field1}</Typography>
        <Typography>Field2={state.data?.field2}</Typography>
        <Typography>Field3={state.data?.field3}</Typography>
        <Typography>Field4={state.data?.field4?.label}</Typography>
      </GridLayout>
      <WizardProgressButtons onNext={() => next()} onPrev={() => previous()} />
    </Container>
  );
};

const CustomStepper: React.FC<WizardStepperProps> = ({
  steps,
  activeStep,
  icons,
}) => {
  const iconElements = React.useMemo(
    () => icons.map((i) => React.createElement(i)),
    [icons]
  );

  return (
    <Grid item xs={12}>
      <Stepper
        alternativeLabel
        connector={<StepConnector />}
        activeStep={activeStep}
      >
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel icon={iconElements[index]}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Grid>
  );
};

export const DefaultWizard = Template.bind({});
DefaultWizard.args = { StepperSlot: true };

export const CustomizedWizard = Template.bind({});
CustomizedWizard.args = {
  sx: { borderRadius: '1em', border: '2px solid black' },
  StepperSlot: CustomStepper,
};

export const NoStepperWizard = Template.bind({});
NoStepperWizard.args = {
  StepperSlot: false,
};
