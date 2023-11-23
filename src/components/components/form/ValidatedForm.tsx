import { Theme } from '@emotion/react';
import { Button, Grid, SxProps } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'relay-forms';
import { Errors } from '../../components/Errors';
import { ValidatedFormWrapper } from './ValidatedFormWrapper';

export interface ValidatedFormProps<T extends Object> {
  /**
   * Optional form identifier. Right now it isn't really used.
   */
  name?: string;
  /**
   * Form submit callback, invoked after validation is successful
   * @param values Form contents as JS Object
   */
  onSubmit: (values: T) => void;
  /**
   * Reset callback. Invoked after the form values have been cleared.
   */
  onReset?: () => void;
  /**
   * MUI `sx` property. Is passed down to the form outermost container.
   */
  sx?: SxProps<Theme>;
  /**
   * Custom slot for form buttons. This prop allows passing a custom React component to render 
   * the form's submit and reset buttons. If not provided, a default button component will be used.
   * This provides flexibility in customizing the appearance and behavior of the form's buttons.
   * 
   * Example usage:
   * `<ValidatedForm buttonsSlot={<CustomButtonComponent />} />`
   * 
   * The component can also be the predefined 'DefaultButtons' with custom props like:
   * `<ValidatedForm buttonsSlot={`
   * `   <DefaultButtons buttonPosition="right" submitText="Submit" resetText="Reset" />`
   * `} />`
   * 
   * buttonPosition: `"left" | "right" | "reverse" | "reverseLeft" | "reverseRight" | "spaceBetween"`
   */
  buttonsSlot?: React.ReactNode | boolean;
}

/**
 * Defines a new form context.
 *
 * Form validation works correctly only inside a Relay Environment.
 * If the app has already a Relay Environment configured, this wrapper is not necessary (but may still be a good idea to use it in order not to mix the form context with the GraphQL one).
 *
 * This component can be used to nest multiple form contexts (whether doing so is a good idea, is up for debate).
 */
export const ValidatedForm = <T extends Object>({
  name,
  onSubmit,
  onReset,
  sx,
  children,
  buttonsSlot = true
}: React.PropsWithChildren<ValidatedFormProps<T>>) => {
  return (
    <ValidatedFormWrapper name={name}>
      <FormInner
        onSubmit={onSubmit}
        onReset={onReset}
        sx={sx}
        buttonsSlot={buttonsSlot}
      >
        {children}
      </FormInner>
    </ValidatedFormWrapper>
  );
};

const FormInner = <T extends Object>({
  onSubmit,
  onReset,
  sx,
  children,
  buttonsSlot = true
}: React.PropsWithChildren<ValidatedFormProps<T>>) => {
  const formContextValue: FormContextValue<T> = { onSubmit, onReset };

  let buttonsContent;
  if (buttonsSlot === true) {
    buttonsContent = <DefaultButtons />;
  } else if (buttonsSlot === false) {
    buttonsContent = null;
  } else {
    buttonsContent = buttonsSlot;
  }
  
  return (
    <FormContext.Provider value={formContextValue}>
      <Grid sx={sx} container>
        <Grid item xs={12}>
          {children}
        </Grid>
        <Grid mb={2} mr={1} item container xs={12}>
          <Errors />
        </Grid>
        {buttonsContent}
      </Grid>
    </FormContext.Provider>
  );
};

interface FormContextValue<T> {
  onSubmit: (values: T) => void;
  onReset?: () => void;
}

const FormContext = React.createContext<FormContextValue<any>>({
  onSubmit: () => {},
});

export const useFormContext = <T extends Object>() => React.useContext<FormContextValue<T>>(FormContext);

export const DefaultButtons = <T extends Object>({ buttonPosition = 'right', submitText = 'Submit', resetText = 'Reset' }) => {
  const { t } = useTranslation();
  const { onSubmit, onReset } = useFormContext();

  const { submit, reset } = useForm<T>({
    onSubmit: (values) => onSubmit(values),
  });

  const doReset = () => {
    onReset?.();
    reset();
  };

  const getButtonContainerJustify = () => {
    switch (buttonPosition) {
      case 'right':
      case 'reverseRight':
        return 'flex-end';
      case 'left':
      case 'reverseLeft':
        return 'flex-start';
      case 'spaceBetween':
      case 'reverse':
        return 'space-between';
      default:
        return 'flex-end';
    }
  };
  
  const isReverse = buttonPosition === 'reverse';
  const isReverseLeft = buttonPosition === 'reverseLeft';
  const isReverseRight = buttonPosition === 'reverseRight';
  
  return (
    <Grid item container xs={12} justifyContent={getButtonContainerJustify()}>
      {(isReverseLeft || (isReverse && !isReverseRight)) && (
        <Button onClick={doReset} sx={{ mr: 1 }}>
          {resetText || t('form.buttons.reset')}
        </Button>
      )}
  
      {!(isReverseRight) && (
        <Button onClick={submit} variant="contained" sx={{ mr: 1 }}>
          {submitText || t('form.buttons.submit')}
        </Button>
      )}
  
      {(!isReverse && !isReverseLeft && !isReverseRight) && (
        <Button onClick={doReset}>
          {resetText || t('form.buttons.reset')}
        </Button>
      )}
  
      {isReverseRight && (
        <>
          <Button onClick={doReset} sx={{ mr: 1 }}>
            {resetText || t('form.buttons.reset')}
          </Button>
          <Button onClick={submit} variant="contained">
            {submitText || t('form.buttons.submit')}
          </Button>
        </>
      )}
    </Grid>
  );
};