export enum WizardActionKind {
    NEXT = 'next',
    PREVIOUS = 'previous',
    FINISH = 'finish',
    SET_CUSTOM_CALLBACK = 'set_custom_callback',
}

export interface WizardState<T> {
    step: number;
    data?: Partial<T>;
    totalSteps: number;
    finished: boolean;
    CustomCallback?: (data: Partial<T>, prevState?: Partial<T>) => boolean;
}

export interface WizardAction<T> {
    type: WizardActionKind;
    payload?: T | ((step: number) => void);
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

export function wizardReducer<T>(state: WizardState<T>, action: WizardAction<T>): WizardState<T> {
    switch (action.type) {
        case WizardActionKind.NEXT:
            return nextWithCustomCallback(state, action);
        case WizardActionKind.PREVIOUS:
            return { ...state, step: state.step - 1 };
        case WizardActionKind.FINISH:
            return {
                ...state,
                step: 0,
                data: { ...state.data, ...action.payload },
                finished: true,
            };
        case WizardActionKind.SET_CUSTOM_CALLBACK:
            return {
                ...state,
                CustomCallback: action.payload as (data: Partial<T>, prevState?: Partial<T>) => boolean,
            };
        default:
            throw new Error();
    }
}

const nextWithCustomCallback = (state: WizardState<unknown>, action: WizardAction<unknown>): WizardState<unknown> => {
    if (state.CustomCallback) {
        state.CustomCallback(action.payload!!, state.data);
    }
    const newData = { ...state.data };
    if (action.payload) {
      Object.entries(action.payload).forEach(([key, value]) => {
        setValueByDotNotation(newData, key, value);
      });
    }
    return {
        ...state,
        data: { ...state.data, ...action.payload!! },
        step: state.step + 1,
        CustomCallback: undefined,
    };
};
