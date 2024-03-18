import React, { useReducer, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import {
  clearNotifications,
  pushNotification,
  notificationReducer,
  removeNotification,
} from './NotificationReducer';
import {
  INotificationContext,
  NotificationContext,
} from './NotificationContext';

let displayed: any[] = [];

export type NotificationKey = string | number | undefined;

export const NsNotifier: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, {
    notifications: [],
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const ctx: INotificationContext = {
    state,
    notify: (notification: any) => dispatch(pushNotification(notification)),
    dismiss: (key: NotificationKey) => dispatch(clearNotifications(key)),
    remove: (key: NotificationKey) => dispatch(removeNotification(key)),
  };
  const storeDisplayed = (id: NotificationKey) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id: NotificationKey) => {
    displayed = [...displayed.filter((key) => id !== key)];
  };

  useEffect(() => {
    state.notifications.forEach(
      ({ key, message, options = {}, dismissed = false }) => {
        if (dismissed) {
          // dismiss snackbar using notistack
          closeSnackbar(key);
          return;
        }

        // do nothing if snackbar is already displayed
        if (displayed.find((id) => id === key)) {
          return;
        }

        // display snackbar using notistack
        enqueueSnackbar(message, {
          key,
          ...options,
          action: (snackKey: any) => (
            <IconButton onClick={() => closeSnackbar(snackKey)}>
              <CloseIcon />
            </IconButton>
          ),
          // ...options,
          onClose: (event: any, reason: any, myKey: any) => {
            if (options.onClose) {
              options.onClose(event, reason, myKey);
            }
          },
          onExited: (event: any, myKey: any) => {
            // remove this snackbar from redux store
            dispatch(removeNotification(myKey));
            removeDisplayed(myKey);
          },
        });

        // keep track of snackbars that we've displayed
        storeDisplayed(key);
      }
    );
  }, [state.notifications, closeSnackbar, enqueueSnackbar]);

  return (
    <NotificationContext.Provider value={ctx}>
      {children}
    </NotificationContext.Provider>
  );
};
