import React, { useCallback, useContext } from 'react';
import { NotifierState } from './NotificationReducer';
import { SnackbarKey, useSnackbar, VariantType } from 'notistack';

export interface INotificationContext {
  readonly state: NotifierState;
  notify: (notification: any) => void;
  dismiss: (key: string | number | undefined) => void;
  remove: (key: string | number | undefined) => void;
}

export const NotificationContext = React.createContext<INotificationContext>({
  state: { notifications: [] },
  notify: (notification) => {
    throw Error('WizardContext: Funzione next() non definita');
  },
  dismiss: (key) => {
    throw Error('WizardContext: Funzione previous() non definita');
  },
  remove: (key) => {
    throw Error('WizardContext: Funzione previous() non definita');
  },
});

/**
 * Hook per le notifiche
 */

export interface NotifyOptions {
  type: VariantType;
  message: string;
}

export const useNotifier = () => {
  const context = useContext(NotificationContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const notify = useCallback(({ type, message }: NotifyOptions) => {
    enqueueSnackbar(message, { variant: type });
  }, [enqueueSnackbar]);

  const dismiss = useCallback((key: SnackbarKey) => {
    closeSnackbar(key);
  }, [closeSnackbar]);

  return { ...context, notify, dismiss };
};