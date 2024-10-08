import { Box, Container, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon/SvgIcon';
import { BoxProps } from '@mui/system';
import React, { ReactElement, useEffect, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'relay-forms';
import { NsErrors } from '../../components/components/NsErrors';
import { NsModal } from '../components/modals/NsModal';
import { NsFormWrapper } from '../../components/components/form/NsFormWrapper';
import { NsWizardStepperProps, NsWizardStepper } from './NsStepper';
import { IWizardContext, WizardContext, useWizard } from './WizardContext';
import { WizardActionKind, wizardReducer } from './WizardReducer';

/**
 * Wizard component
 * @author eduardo.santarelli
 */

/**
 * Props del Wizard
 */
export interface NsWizardProps<T = unknown> {
    /**
     * The Wizard's children should always be some implementation of WizardSteps
     */
    children: NsWizardStepType | NsWizardStepType[];
    /**
     * The Wizard's stepper component, or false if no stepper is required
     * @todo Expose all of MUI's stepper properties to the user
     */
    StepperSlot?: React.ElementType<NsWizardStepperProps> | boolean;
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
export function NsWizard<T = unknown>({
    children,
    initialData,
    StepperSlot = true,
    onStep,
    onCommit,
    onAbort,
    ...boxProps
}: NsWizardProps<T> & BoxProps) {
    const theme = useTheme();

    // Fetch all children steps' icons
    const icons = React.Children.map(children, (c: NsWizardStepType) => c.props.icon);

    // Fetch all children steps' labels
    const stepsLabels = React.Children.map(children, (c: NsWizardStepType) => c.props.name);

    // This reducer will manage the state of the wizard across transitions
    const [state, dispatch] = useReducer(wizardReducer, {
        step: 0,
        data: initialData ?? {},
        totalSteps: stepsLabels.length,
        finished: false,
        CustomCallback: undefined,
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
            setCustomCallback: (callback: ((...args: any[]) => any) | null) => {
                dispatch({ type: WizardActionKind.SET_CUSTOM_CALLBACK, payload: callback });
            },
            CustomCallback: state.CustomCallback || null,
        }),
        [state, onAbort],
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
        actualStepper = <NsWizardStepper icons={icons} activeStep={state.step} steps={stepsLabels} />;
    } else if (StepperSlot === false) {
        actualStepper = <></>;
    } else {
        actualStepper = <StepperSlot icons={icons} activeStep={state.step} steps={stepsLabels} />;
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
export interface NsWizardProgressButtonsProps {
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
export const NsWizardProgressButtons: React.FC<NsWizardProgressButtonsProps> = ({ onPrev, onNext }) => {
    const { t } = useTranslation();
    const {
        state: { step, totalSteps },
        abort,
    } = useWizard();
    const [open, setOpen] = React.useState(false);

    const isLastStep = step === totalSteps - 1;

    const handleOpen = () => {
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
                <Button type="submit" className="coloredButton" variant="contained" onClick={() => onNext()}>
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
                    width={'400px'}
                />
            </Box>
        </>
    );
};

/**
 * Common set of props for all wizard steps
 */
interface NsWizardStepPropsBase<T = unknown> {
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
     * Optional callback, invoked on specific steps.
     */
    onStepCallback?: (...args: any[]) => any;
    /**
     * The payload passed to the step, merged from all the previous steps and the initial seed data.
     */
    payload?: T;
}

export type NsWizardStepProps<T = unknown> = React.PropsWithChildren<NsWizardStepPropsBase<T>>;

export type NsWizardStepType = ReactElement<NsWizardStepProps>;

/**
 * Generic Wizard Step. It just wraps the children
 */
export const NsWizardStep: React.FC<NsWizardStepProps> = ({ children }) => {
    return <>{children}</>;
};

export type NsWizardFormStepProps<T = unknown> = NsWizardStepProps<T> & {
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
 *    <NsWizardFormStep name="Step2" icon={EditIcon}>
 *      <GridLayout rowSize={1}>
 *        <NsTextInput
 *          name="field1"
 *          label={t('Field 1')}
 *          validate={required}
 *          errorMessage={t('form.errors.required', {
 *            field: 'Field 1',
 *          })}
 *        />
 *        <NsTextInput
 *          name="field2"
 *          label={t('Field 2')}
 *          validate={required}
 *        />
 *      </GridLayout>
 *    </NsWizardFormStep>
 * ```
 *
 *
 * @param param0
 * @returns
 */
export function NsWizardFormStep<T = unknown>({
    children,
    showButtons = true,
    onStepCallback,
    ...rest
}: NsWizardFormStepProps<T>) {
    const {
        state: { step, data, totalSteps },
        setCustomCallback,
        CustomCallback,
    } = useWizard();

    useEffect(() => {
        if (onStepCallback) {
            setCustomCallback(onStepCallback);
        }
    }, []);

    return (
        <NsFormWrapper name={`wizard-step-${step}`}>
            <InnerWizardFormStep showButtons={showButtons} onStepCallback={onStepCallback} {...rest}>
                {children}
            </InnerWizardFormStep>
        </NsFormWrapper>
    );
}

function InnerWizardFormStep<T = unknown>({ children, showButtons, onStepCallback }: NsWizardFormStepProps<T>) {
    const {
        state: { data, step },
        next,
        previous,
        CustomCallback,
    } = useWizard();

    const { submit } = useForm({
        onSubmit: (data) => {
            next(data);
        },
    });

    const handleSubmit = () => {
        submit();
    };

    return (
        <Container maxWidth={false}>
            {children}
            <NsErrors />
            {showButtons && <NsWizardProgressButtons onNext={() => handleSubmit()} onPrev={() => previous()} />}
        </Container>
    );
}
