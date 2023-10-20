export enum NotifierActionKind {
  ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR',
  CLOSE_SNACKBAR = 'CLOSE_SNACKBAR',
  REMOVE_SNACKBAR = 'REMOVE_SNACKBAR',
}

export interface NotifierState {
  notifications: any[];
}

export interface NotifierAction {
  type: NotifierActionKind;
  notification?: any;
  key?: string | number;
  dismissAll?: boolean;
}
export const notificationReducer = (
  state: NotifierState,
  action: NotifierAction
) => {
  switch (action.type) {
    case NotifierActionKind.ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            key: action.notification.key,
            options: {
              variant: action.notification.type,
              autoHideDuration: action.notification.time ?? 6000,
              key: action.notification.key,
            },
            ...action.notification,
          },
        ],
      };

    case NotifierActionKind.CLOSE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          action.dismissAll || notification.key === action.key
            ? { ...notification, dismissed: true }
            : { ...notification }
        ),
      };

    case NotifierActionKind.REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.key !== action.key
        ),
      };

    default:
      return state;
  }
};

export const pushNotification = (notification: any) => {
  const key = notification.options && notification.options.key;

  return {
    type: NotifierActionKind.ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: key || new Date().getTime() + Math.random(),
    },
  };
};

export const clearNotifications = (key: string | number | undefined) => ({
  type: NotifierActionKind.CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key,
});

export const removeNotification = (key: string | number | undefined) => ({
  type: NotifierActionKind.REMOVE_SNACKBAR,
  key,
});
