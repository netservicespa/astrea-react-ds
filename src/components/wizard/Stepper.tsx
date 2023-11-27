import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { StepIconProps } from '@mui/material/StepIcon';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import { Grid, SvgIcon } from '@mui/material';

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: 'white',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundColor: '#3F6888',
  }),
  ...(ownerState.completed && {
    backgroundColor: '#3F6888',
  }),
}));

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#3F6888',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#3F6888',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

function ColorlibStepIcon({
  active,
  completed,
  className,
  icon,
}: Readonly<StepIconProps>) {
  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icon}
    </ColorlibStepIconRoot>
  );
}

export interface WizardStepperProps {
  steps: string[];
  activeStep: number;
  icons: (typeof SvgIcon)[];
}

export function WizardStepper({
  steps,
  activeStep,
  icons,
}: Readonly<WizardStepperProps>) {
  const iconElements = React.useMemo(
    () => icons.map((i) => React.createElement(i)),
    [icons]
  );

  return (
    <Grid item xs={12}>
      <Stepper
        alternativeLabel
        connector={<ColorlibConnector />}
        activeStep={activeStep}
        sx={{
          height: '130px',
          border: '1px solid #E8E8E8',
          mt: 2,
          paddingTop: '25px',
          paddingLeft: '15%',
          paddingRight: '15%',
        }}
      >
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel
                icon={iconElements[index]}
                StepIconComponent={ColorlibStepIcon}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Grid>
  );
}
