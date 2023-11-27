import { Box, Container, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon/SvgIcon';
import { BoxProps } from '@mui/system';
import React, { ReactElement, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'relay-forms';
import { Errors } from '../components/Errors';
import { NsModal } from '../components/NsModal';
import { ValidatedFormWrapper } from '../components/form/ValidatedFormWrapper';
import { WizardStepperProps, WizardStepper } from './Stepper';
import { IWizardContext, WizardContext, useWizard } from './WizardContext';
import { WizardActionKind, wizardReducer } from './WizardReducer';

/**
 * Wizard component
 * @author eduardo.santarelli
 */

/**
 * Props del Wizard
 */
export interface WizardProps<T = unknown> {
  /**
   * The Wizard's children should always be some implementation of WizardSteps
   */
  children: WizardStepType | WizardStepType[] | any;
  /**
   * The Wizard's stepper component, or false if no stepper is required
   * @todo Expose all of MUI's stepper properties to the user
   */
  StepperSlot?: React.ElementType<WizardStepperProps> | boolean;
  /**
   * Optionally use this prop to pass data to the first step of the wizard
   */
  initialData?: Partial<T>;
  /**
   * Optional callback, invoked each time the wizard steps forwards or backwards.
   */
  onStep?: (data: Partial<T>) => void;
  /**
   * Optional callback, invoked when the final step of the wizard is confirmed.
   */
  onCommit?: (data: Partial<T>) => void;
  /**
   * Optional callback, invoked when the wizard is canceled.
   */
  onAbort?: () => void;
}

/**
 * The Wizard root element.
 *
 * All wizard step **must** be contained inside a `Wizard` element to work properly
 */
export function Wizard<T = unknown>({
  children,
  initialData,
  StepperSlot = true,
  onStep,
  onCommit,
  onAbort,
  ...boxProps
}: WizardProps<T> & BoxProps) {
  const theme = useTheme();

  // Fetch all children steps' icons
  const icons = React.Children.map(
    children,
    (c: WizardStepType) => c.props.icon
  );

  // Fetch all children steps' labels
  const stepsLabels = React.Children.map(
    children,
    (c: WizardStepType) => c.props.name
  );

  // This reducer will manage the state of the wizard across transitions
  const [state, dispatch] = useReducer(wizardReducer, {
    step: 0,
    data: initialData ?? {},
    totalSteps: stepsLabels.length,
    finished: false,
  });

  // Seeds the wizard context with the initial data
  const ctx: IWizardContext<T> = React.useMemo(
    () => ({
      state,
      next: (payload?: Partial<T>) => {
        const isLastStep = state.step === state.totalSteps - 1;
        if (isLastStep) {
          dispatch({ type: WizardActionKind.FINISH, payload });
        } else {
          dispatch({ type: WizardActionKind.NEXT, payload });
        }
      },
      previous: () => {
        dispatch({ type: WizardActionKind.PREVIOUS });
      },
      abort: onAbort,
    }),
    [state, onAbort]
  );

  // This effect will invoke the onStep callback whenever the wizard state changes
  // It also invokes the onCommit callback when the wizard is finished
  React.useEffect(() => {
    if (state.finished) {
      onCommit?.(state.data as T);
    }
    onStep?.(state.data as T);
    setTimeout(() => {
      console.debug(state);
    }, 0);
  }, [state.data]);

  // Find out what the actual stepper component is
  let actualStepper: JSX.Element;
  if (StepperSlot === true) {
    actualStepper = (
      <WizardStepper
        icons={icons}
        activeStep={state.step}
        steps={stepsLabels}
      />
    );
  } else if (StepperSlot === false) {
    actualStepper = <></>;
  } else {
    actualStepper = (
      <StepperSlot icons={icons} activeStep={state.step} steps={stepsLabels} />
    );
  }
  return (
    <WizardContext.Provider value={ctx}>
      {actualStepper}
      <Box mt={3} border={(theme as any).custom?.borders[0]} {...boxProps}>
        <>{React.Children.toArray(children)[state.step]}</>
      </Box>
    </WizardContext.Provider>
  );
}

/**
 * Props for the Wizard's progress buttons
 */
export interface WizardProgressButtonsProps {
  /**
   * Callback invoked when the user clicks on the previous button
   */
  onPrev: () => void;

  /**
   * Callback invoked when the user clicks on the next button
   */
  onNext: () => void;
}

/**
 * The standard Wizard progress buttons.
 *
 * Includes `next` and `previous` buttons, and a `cancel` button to abort the wizard.
 */
export const WizardProgressButtons: React.FC<WizardProgressButtonsProps> = ({
  onPrev,
  onNext,
}) => {
  const { t } = useTranslation();
  const {
    state: { step, totalSteps },
    abort,
  } = useWizard();
  const [open, setOpen] = React.useState(false);

  const isLastStep = step === totalSteps - 1;

  const handleOpen = () => {
    console.log('open');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', p: 3 }}>
        <Button color="inherit" onClick={handleOpen} sx={{ marginRight: 1 }}>
          {t('wizard.cancel')}
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button
          className="normalButton"
          color="inherit"
          disabled={step === 0}
          onClick={() => onPrev()}
          sx={{ mr: 1 }}
        >
          {t('wizard.previous')}
        </Button>
        <Button
          type="submit"
          className="coloredButton"
          variant="contained"
          onClick={() => onNext()}
        >
          {isLastStep ? t('wizard.submit') : t('wizard.next')}
        </Button>
        <NsModal
          title={t('wizard.abort.modalTitle')}
          content={<Box>{t('wizard.abort.modalDescription')}</Box>}
          onConfirm={() => abort?.()}
          openFromParent={true}
          externalOpen={open}
          onOpen={handleOpen}
          onClose={handleClose}
          showCancelButton
          showConfirmButton
        />
      </Box>
    </>
  );
};

/**
 * Common set of props for all wizard steps
 */
interface WizardStepPropsBase<T = unknown> {
  /**
   * Step name: is displayed in the progress indicator
   */
  name: string;
  /**
   * Step icon: is displayed in the progress indicator
   */
  icon: typeof SvgIcon;
  /**
   * If true, the step can be skipped.
   */
  optional?: boolean;
  /**
   * Invoked before moving to the next step.
   * Must return true if the step can be moved to the next step, false otherwise.
   */
  onNext?: () => boolean;
  /**
   * Invoked before moving to the previous step.
   * Must return true if the step can be moved to the previous step, false otherwise.
   */
  onPrevious?: () => boolean;
  /**
   * Invoked before skipping the current step.
   * Must return true if the step can be skipped, false otherwise.
   */
  onSkip?: () => boolean;
  /**
   * The payload passed to the step, merged from all the previous steps and the initial seed data.
   */
  payload?: T;
}

export type WizardStepProps<T = unknown> = React.PropsWithChildren<
  WizardStepPropsBase<T>
>;

export type WizardStepType = ReactElement<WizardStepProps>;

/**
 * Generic Wizard Step. It just wraps the children
 */
export const WizardStep: React.FC<WizardStepProps> = ({ children }) => {
  return <>{children}</>;
};

export type WizardFormStepProps<T = unknown> = WizardStepProps<T> & {
  /**
   * True if the buttons should be shown, false otherwise.
   * Defaults to true.
   */
  showButtons?: boolean;
};

/**
 * This Wizard Step implemetation is already hooked up with form validation.
 *
 * Use this if your current wizard step needs to use the form validation features.
 *
 *
 * Example:
 *
 * ```
 *    <WizardFormStep name="Step2" icon={EditIcon}>
 *      <GridLayout rowSize={1}>
 *        <ValidatedTextInput
 *          name="field1"
 *          label={t('Field 1')}
 *          validate={required}
 *          errorMessage={t('form.errors.required', {
 *            field: 'Field 1',
 *          })}
 *        />
 *        <ValidatedTextInput
 *          name="field2"
 *          label={t('Field 2')}
 *          validate={required}
 *        />
 *      </GridLayout>
 *    </WizardFormStep>
 * ```
 *
 *
 * @param param0
 * @returns
 */
export function WizardFormStep<T = unknown>({
  children,
  showButtons = true,
  ...rest
}: WizardFormStepProps<T>) {
  const {
    state: { step },
  } = useWizard();
  return (
    <ValidatedFormWrapper name={`wizard-step-${step}`}>
      <InnerWizardFormStep showButtons={showButtons} {...rest}>
        {children}
      </InnerWizardFormStep>
    </ValidatedFormWrapper>
  );
}

function InnerWizardFormStep<T = unknown>({
  children,
  showButtons,
}: WizardFormStepProps<T>) {
  const { next, previous } = useWizard();

  const { submit } = useForm({
    onSubmit: (data) => {
      next(data);
    },
  });
  return (
    <Container maxWidth={false}>
      {children}
      <Errors />
      {showButtons && (
        <WizardProgressButtons
          onNext={() => submit()}
          onPrev={() => previous()}
        />
      )}
    </Container>
  );
}
