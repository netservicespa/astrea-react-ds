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
import { NsCheckbox } from '../../components/components/form/fields/NsCheckbox';
import {
  SelectItem,
  NsSelectAutocomplete,
} from '../../components/components/form/fields/NsSelectAutocomplete';
import { NsTextInput } from '../../components/components/form/fields/NsTextInput';
import { required } from '../../components/components/form/validators';
import { NsGridLayout } from '../../components/layout/NsGridLayout';
import { NsWizardStepperProps } from '../../components/wizard/NsStepper';
import {
  NsWizard,
  NsWizardFormStep,
  NsWizardProgressButtons,
  NsWizardStep,
} from '../../components/wizard/NsWizard';
import { useWizard } from '../../components/wizard/WizardContext';
import { NsFileUpload } from '../../components/components/form/fields/NsFileUpload';

export default {
  title: 'Patterns/Wizard',
  component: NsWizard,
  parameters: {
    docs: { source: { type: 'code' } },
  },
  argTypes: {
    rowSize: {
      label: 'Row Size',
      type: 'number',
    },
  },
} as Meta<typeof NsWizard>;

interface FormContents {
  name: string;
  field1?: string;
  field2?: string;
  field3?: string;
  field4?: SelectItem;
  field5?: string;
  check1?: boolean;
  fileUpload?: any;
}

const Template: StoryFn<typeof NsWizard> = ({ sx, StepperSlot }) => {
  const { t } = useTranslation();
  const [data, setData] = React.useState<Partial<FormContents> | undefined>();
  const [finished, setFinished] = React.useState(false);
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
      <NsWizard
        sx={sx}
        StepperSlot={StepperSlot}
        initialData={{ name: 'test' }}
        onStep={(result) => setData(result)}
        onCommit={(_) => {
          setFinished(true);
        }}
        onAbort={() => window.location.reload()}
      >
        <NsWizardFormStep name="First Step" icon={EditIcon}>
          <Typography mx={1} my={2}>
            Please insert the following information:
          </Typography>
          <NsGridLayout rowSize={1}>
            <NsTextInput
              name="field1"
              label={t('Field 1')}
              defaultValue={data?.field1}
              validate={required}
              errorMessage={t('form.errors.required', {
                field: 'Field 1',
              })}
            />
            <NsTextInput
              name="field2"
              label={t('Field 2')}
              defaultValue={data?.field2}
              validate={required}
              errorMessage={t('form.errors.required', {
                field: 'Field 2',
              })}
            />
            <NsCheckbox
              name="check1"
              label={t('Check 1')}
              defaultChecked={data?.check1}
            />
            <NsFileUpload
              displayForm
              errorMessage="The 'File' field is required"
              name="fileUpload"
              defaultValue={data?.fileUpload}
              onChange={() => console.log('ciao')}
              validate={required}
            />
          </NsGridLayout>
        </NsWizardFormStep>
        <NsWizardFormStep name="Second Step" icon={DataObjectSharp}>
          <Typography mx={1} my={2}>
            Don't forget to fill this fields as well:
          </Typography>
          <NsGridLayout rowSize={1}>
            <NsTextInput
              name="field3"
              label={t('Field 3')}
              defaultValue={data?.field3}
            />
            <NsSelectAutocomplete
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
            </NsSelectAutocomplete>
          </NsGridLayout>
        </NsWizardFormStep>
        <NsWizardStep name="Summary" icon={SummarizeIcon}>
          <SummaryStep />
        </NsWizardStep>
      </NsWizard>
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
      <NsGridLayout rowSize={1}>
        <Typography>Field1={state.data?.field1}</Typography>
        <Typography>Field2={state.data?.field2}</Typography>
        <Typography>Field3={state.data?.field3}</Typography>
        <Typography>Field4={state.data?.field4?.label}</Typography>
      </NsGridLayout>
      <NsWizardProgressButtons
        onNext={() => next()}
        onPrev={() => previous()}
      />
    </Container>
  );
};

const CustomStepper: React.FC<NsWizardStepperProps> = ({
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
  sx: { borderRadius: '1em', border: '2px solid #e4e4e4' },
  StepperSlot: CustomStepper,
};

export const NoStepperWizard = Template.bind({});
NoStepperWizard.args = {
  StepperSlot: false,
};
