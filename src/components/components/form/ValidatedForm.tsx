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
   * Whether to show the form's default submit and reset buttons.
   */
  showButtons?: boolean;
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
  showButtons = true,
}: React.PropsWithChildren<ValidatedFormProps<T>>) => {
  return (
    <ValidatedFormWrapper name={name}>
      <FormInner
        onSubmit={onSubmit}
        onReset={onReset}
        sx={sx}
        showButtons={showButtons}
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
  showButtons,
}: React.PropsWithChildren<ValidatedFormProps<T>>) => {
  const { t } = useTranslation();
  const { submit, reset } = useForm<T>({
    onSubmit: (values) => onSubmit(values),
  });

  const doReset = () => {
    onReset?.();
    reset();
  };

  return (
    <Grid sx={sx} container>
      <Grid item xs={12}>
        {children}
      </Grid>
      <Grid mb={2} mr={1} item container xs={12}>
        <Errors />
      </Grid>
      {showButtons && (
        <Grid item container xs={12} justifyContent="space-between">
          <Button sx={{ mr: 1 }} onClick={doReset}>
            {t('form.buttons.reset')}
          </Button>
          <Button sx={{ mr: 1 }} variant="contained" onClick={submit}>
            {t('form.buttons.submit')}
          </Button>
        </Grid>
      )}
    </Grid>
  );
};
