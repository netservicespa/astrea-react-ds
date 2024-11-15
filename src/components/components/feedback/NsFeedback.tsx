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
    message: string | React.ReactNode;

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

export interface NsFeedbackProps {
    openNotifier?: boolean;
    title: string;
    variant: 'filled' | 'outlined';
    message: string | React.ReactNode;
    severity: string;
    autoHideDuration?: number;
    onCloseSnack?: () => void;
}

const Alert = React.forwardRef(function Alert(props: any, ref: any) {
    return (
        <MuiAlert
            sx={{
                boxSizing: 'border-box',
                border:
                    props.variant === 'filled'
                        ? '0px'
                        : props.variant === 'outlined'
                          ? `2px solid ${
                                props.severity === 'success'
                                    ? '#006636'
                                    : props.severity === 'error'
                                      ? '#B52C17'
                                      : props.severity === 'warning'
                                        ? '#FFE300'
                                        : props.severity === 'info'
                                          ? '#3262D2'
                                          : 'rgba(177,180,182,1)'
                            }`
                          : '0px',
                color:
                    props.variant === 'filled' && props.severity === 'warning'
                        ? '#000'
                        : props.variant === 'filled'
                          ? 'white'
                          : props.variant === 'outlined'
                            ? props.severity === 'success'
                                ? '#006636'
                                : props.severity === 'error'
                                  ? '#B52C17'
                                  : props.severity === 'warning'
                                    ? '#913F08'
                                    : props.severity === 'info'
                                      ? '#3262D2'
                                      : 'inherit'
                            : props.variant === 'outlined'
                              ? 'white'
                              : props.severity === 'success'
                                ? '#006636'
                                : props.severity === 'error'
                                  ? '#B52C17'
                                  : props.severity === 'warning'
                                    ? '#913F08'
                                    : props.severity === 'info'
                                      ? '#3262D2'
                                      : 'inherit',

                backgroundColor:
                    props.variant === 'filled'
                        ? props.severity === 'success'
                            ? '#006636'
                            : props.severity === 'error'
                              ? '#B52C17'
                              : props.severity === 'warning'
                                ? '#FFE300'
                                : props.severity === 'info'
                                  ? '#3262D2'
                                  : 'rgba(177,180,182,1)'
                        : 'white',
                boxShadow: 'none',
                borderRadius: '0px',
                '.MuiAlert-icon': {
                    fontSize: '30px',
                    paddingTop: '15px',
                    color:
                        props.variant === 'filled' && props.severity === 'warning'
                            ? '#000'
                            : props.variant === 'filled'
                              ? 'white'
                              : props.variant === 'outlined'
                                ? props.severity === 'success'
                                    ? '#006636'
                                    : props.severity === 'error'
                                      ? '#B52C17'
                                      : props.severity === 'warning'
                                        ? '#913F08'
                                        : props.severity === 'info'
                                          ? '#3262D2'
                                          : 'inherit'
                                : props.variant === 'outlined'
                                  ? 'white'
                                  : props.severity === 'success'
                                    ? '#006636'
                                    : props.severity === 'error'
                                      ? '#B52C17'
                                      : props.severity === 'warning'
                                        ? '#913F08'
                                        : props.severity === 'info'
                                          ? '#3262D2'
                                          : 'inherit',
                },
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
                                lineHeight: '18px',
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
