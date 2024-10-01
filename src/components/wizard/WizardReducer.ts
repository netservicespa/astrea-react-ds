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

function setValueByDotNotation(obj: Record<string, any>, path: string, value: any): void {
  const parts = path.split('.');
  const last = parts.pop();
  const target = parts.reduce((acc: Record<string, any>, part: string) => {
      if (!acc[part]) {
          acc[part] = {};
      }
      return acc[part];
  }, obj);
  
  if (last) {
      target[last] = value;
  }
}


export function wizardReducer<T>(
  state: WizardState<T>,
  action: WizardAction<T>
): WizardState<T> {
  switch (action.type) {
    case WizardActionKind.NEXT:
      const newData = { ...state.data };
      if (action.payload) {
        Object.entries(action.payload).forEach(([key, value]) => {
          setValueByDotNotation(newData, key, value);
        });
      }
      return {
        ...state,
        data: newData,
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
