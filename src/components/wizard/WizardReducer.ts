export enum WizardActionKind {
  NEXT = 'next',
  PREVIOUS = 'previous',
  FINISH = 'finish',
}

export interface WizardState<T> {
  step: number;
  data?: Partial<T>;
  totalSteps: number;
  finished: boolean;
}

export interface WizardAction<T> {
  type: WizardActionKind;
  payload?: T;
}

export function wizardReducer<T>(
  state: WizardState<T>,
  action: WizardAction<T>
): WizardState<T> {
  switch (action.type) {
    case WizardActionKind.NEXT:
      return {
        ...state,
        data: { ...state.data, ...action.payload },
        step: state.step + 1,
      };
    case WizardActionKind.PREVIOUS:
      return { ...state, step: state.step - 1 };
    case WizardActionKind.FINISH:
      return {
        ...state,
        step: 0,
        data: { ...state.data, ...action.payload },
        finished: true,
      };
    default:
      throw new Error();
  }
}
