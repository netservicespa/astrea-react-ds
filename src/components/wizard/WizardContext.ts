import React, { useContext } from 'react';
import { WizardState } from './WizardReducer';

export interface IWizardContext<T = unknown> {
  readonly state: WizardState<T>;
  next: (payload?: Partial<T>) => void;
  previous: (payload?: Partial<T>) => void;
  abort?: () => void;
}

export const WizardContext = React.createContext<IWizardContext>({
  state: { step: 0, totalSteps: 0, data: {}, finished: false },
  next: () => {
    throw Error('WizardContext: next() function not implemented');
  },
  previous: () => {
    throw Error('WizardContext: previous() function not implemented');
  },
});

export const useWizard = () => useContext(WizardContext);
