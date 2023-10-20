import React, { useContext } from 'react';
import { NotifierState } from './NotificationReducer';

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
export const useNotifier = () => useContext(NotificationContext);
