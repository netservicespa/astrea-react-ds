import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export interface NsFeedbackProps {
  /**
   * Controls the visibility of the snackbar. Set to true to open, false to close.
   */
  openNotifier?: boolean;

  /**
   * The main title of the snackbar.
   */
  title: string;

  /**
   * The style options
   */
  variant: 'filled' | 'outlined';
  /**
   * The sub-title of the snackbar.
   */
  message: string;

  /**
   * Indicates the type or severity of the snackbar.
   */
  severity: string;

  /**
   * The duration in milliseconds for which the snackbar auto-hides.
   */
  autoHideDuration?: number;

  /**
   * Callback function invoked when the snackbar is closed.
   */
  onCloseSnack?: () => void;
}

const Alert = React.forwardRef(function Alert(props: any, ref: any) {
  return (
    <MuiAlert
      sx={{
        boxSizing: 'border-box',
        border:
          props.variant == 'filled'
            ? '0px'
            : '0px' || props.variant == 'outlined'
            ? '1px solid rgba(177,180,182,1)'
            : '0px',
        boxShadow: 'none',
        borderRadius: '0px',
      }}
      elevation={6}
      ref={ref}
      {...props}
    />
  );
});

export const NsFeedback = ({
  openNotifier,
  onCloseSnack,
  title,
  variant,
  message,
  severity,
  autoHideDuration,
}: NsFeedbackProps) => {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {openNotifier === true ? (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={openNotifier}
          autoHideDuration={autoHideDuration}
        >
          <Alert variant={variant} onClose={onCloseSnack} severity={severity}>
            <h3
              style={{
                marginTop: '-11px',
                fontWeight: 600,
                fontStyle: 'normal',
                textAlign: 'left',
                fontSize: '32px',
                lineHeight: '42px',
              }}
            >
              {title}
            </h3>
            <p
              style={{
                marginTop: '-20px',
                fontSize: '20px',
                lineHeight: '0px',
              }}
            >
              {message}
            </p>
          </Alert>
        </Snackbar>
      ) : (
        <Alert variant={variant} onClose={onCloseSnack} severity={severity}>
          <h3
            style={{
              marginTop: '1px',
              fontWeight: 600,
              fontStyle: 'normal',
              textAlign: 'left',
              fontSize: '32px',
              lineHeight: '42px',
              paddingBottom: '-20px',
            }}
          >
            {title}
          </h3>
          <p
            style={{
              marginTop: '-20px',
              fontSize: '20px',
              lineHeight: '-31px',
              marginBottom: '10px',
            }}
          >
            {message}
          </p>
        </Alert>
      )}
    </Stack>
  );
};
