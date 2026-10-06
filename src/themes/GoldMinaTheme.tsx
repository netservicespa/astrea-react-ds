import { createTheme, responsiveFontSizes } from '@mui/material';
import { darken } from '@mui/system';

const paletteColors = {
    primary: {
        main: '#66572F',
    },
    secondary: {
        main: '#5E512B',
    },
    error: {
        main: '#D4351C',
    },
    info: {
        main: '#66572F',
    },
    success: {
        main: '#00703c',
    },
    focus: {
        main: '#FFE300',
    },
    borderColor: {
        main: '#B1B4B6',
    },
    darkTextColor: {
        primary: '#000000',
        secondary: '#3D3D3D',
        tertiary: '#595959',
    },
    type: 'light',
};

const themeOptions = {
    typography: {
        fontFamily: "'Titillium Web', sans-serif",
        h1: {
            fontSize: '1.9rem',
            fontWeight: 600,
        },
        h2: {
            fontSize: '1.3rem',
            fontWeight: 600,
        },
        h3: {
            fontSize: '1.1rem',
            fontWeight: 600,
        },
        h4: {
            fontSize: '1rem',
            fontWeight: 600,
        },
        body1: {
            fontSize: '1.1rem',
            color: '#000',
        },
    },
    header: {
        backgroundColor: '#66572F',
        borderColor: '0px solid #fff ',
        menuTextColor: '#66572F',
        padding: '0px !important',
        color: '#66572F',
        textAlign: 'center',
        menuBackgroundColor: '#EBEFEF',
    },
    footer: {
        backgroundColor: `${paletteColors.primary.main}`,
        width: '100%',
        height: '100%',
        marginTop: '30px',
        boxSizing: 'border-box',
        borderTop: '10px solid ',
        borderColor: `${paletteColors.secondary.main}`,
        fontColor: '#FFFFFF',
        fontSize: '1.125rem',
        fontWeight: 500,
        imageWidth: '66px',
        imageHeight: '73px'
    },
    spacing: [0, 4, 8, 16, 32, 64],
    button: {
        fontWeight: 600,
        letterSpacing: '0.05em',
        size: 'large',
    },
    palette: paletteColors,
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&.MuiOutlinedInput-notchedOutline': {
                        borderColor: '#B1B4B6',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0B0C0C',
                        borderWidth: '3px',
                    },
                    '&.Mui-focused': {
                        boxShadow: `0 0 0 3px ${paletteColors.focus.main}`,
                    },
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        boxShadow: `0 0 0 3px ${paletteColors.focus.main}`,
                    },
                    '&.Mui-focused-visible': {
                        boxShadow: 'none',
                    },
                    '&.MuiInput-underline:before ': {
                        borderBottom: 'none',
                    },
                    '&.MuiInput-underline:after ': {
                        borderBottom: 'none' /* Remove the bottom border when the input is active */,
                    },
                    '&.MuiInput-underline:hover:not(.Mui-disabled):before': {
                        borderBottom: 'none' /* Remove the bottom border on hover */,
                    },
                    '&.MuiInput-underline:after': {
                        borderBottom: 'none' /* Remove the bottom border when the input is active */,
                    },
                },
                input: {
                    padding: '8px',
                },
                formControl: {
                    borderRadius: '0px !important',
                },
            },
            variants: [
                {
                    props: { disabled: true },
                    style: {
                        backgroundColor: ' #f0f0f0',
                    },
                },
            ],
        },
        MuiAutocomplete: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        padding: '0',
                    },
                },
            },
        },
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    lineHeight: '2em',
                    fontSize: '18px',
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: '0px',
                    color: '#66572F',
                    '&.MuiButton-contained.MuiButton-colorPrimary:not(.Mui-disabled):active': {
                        boxShadow: `inset 0 0 0 5px ${paletteColors.focus.main}`,
                    },
                    '&.MuiButton-outlined.MuiButton-colorPrimary:not(.Mui-disabled):active': {
                        boxShadow: `inset 0 0 0 5px ${paletteColors.focus.main}`,
                    },

                    '&.MuiButton-contained.MuiButton-colorSecondary:not(.Mui-disabled):active': {
                        boxShadow: `inset 0 0 0 5px ${paletteColors.focus.main}`,
                    },
                    '&.MuiButton-outlined.MuiButton-colorSecondary:not(.Mui-disabled):active': {
                        boxShadow: `inset 0 0 0 5px ${paletteColors.focus.main}`,
                    },

                    '&.MuiButton-contained.MuiButton-colorError:not(.Mui-disabled):active': {
                        boxShadow: `inset 0 0 0 5px ${paletteColors.focus.main}`,
                    },

                    '&.MuiButton-outlined.MuiButton-colorError:not(.Mui-disabled):active': {
                        boxShadow: `inset 0 0 0 5px ${paletteColors.focus.main}`,
                    },
                    '&.MuiButton-contained.MuiButton-colorPrimary': {
                        background: '#66572F',
                        color: '#fff',
                        fontSize: '18px',
                        boxShadow: 'none',
                    },
                    '&.MuiButton-contained.MuiButton-colorSecondary': {
                        background: '#EAEEF8',
                        color: '#66572F',
                        fontSize: '18px',
                        borderBottom: '3px solid #66572F',
                        boxShadow: 'none',
                    },
                    '&.MuiButton-contained.MuiButton-colorInfo': {
                        background: 'none',
                        fontSize: '18px !important',
                        border: '0px',
                        boxShadow: 'none',
                        textDecoration: 'underline',
                        color: '#66572F',
                        padding: '0px',
                    },
                    '&.Mui-disabled:not(.MuiButton-outlinedPrimary)': {
                        boxShadow: `inset 0 -3px 0 0 ${darken('#66572F', 0)}`,
                        backgroundColor: '#EAEEF8',
                        color: '#66572F',
                    },
                    '&.MuiButton-contained.MuiButton-colorSuccess': {
                        boxShadow: `inset 0 -3px 0 0 ${darken(paletteColors.success.main, 0.5)}`,
                    },
                    '&.MuiButton-contained.MuiButton-colorError': {
                        boxShadow: `inset 0 -3px 0 0 ${darken(paletteColors.error.main, 0.5)}`,
                        borderColor: '3px solid red !important',
                    },
                    '&.Mui-disabled.MuiButton-outlinedPrimary': {
                        color: '#797979',
                        border: `3px solid #A1A1A1`,
                    },
                    '&.Mui-focusVisible': {
                        boxShadow: `0 0 0 3px ${paletteColors.focus.main}`,
                    },
                    '&.MuiButton-outlined.MuiButton-colorPrimary:not(.Mui-disabled)': {
                        border: `2px solid ${paletteColors.primary.main}`,
                    },
                    '&.MuiButton-outlined.MuiButton-colorSecondary:not(.Mui-disabled)': {
                        border: 'unset',
                        boxShadow: `inset 0 -3px 0 0 ${darken(paletteColors.primary.main, 0.4)}`,
                        color: '#2E5A60',
                    },

                    '&.MuiButton-outlined.MuiButton-colorError:not(.Mui-disabled)': {
                        border: `2px solid ${paletteColors.error.main}`,
                    },
                },
            },
            variants: [
                {
                    props: { disabled: true },
                    style: {
                        backgroundColor: '#f0f0f0',
                    },
                },
            ],
        },
        MuiAlert: {
            styleOverrides: {
                standardSuccess: {
                    borderRadius: '0px !important',
                },
                standardError: {
                    borderRadius: '0px !important',
                },
                standardWarning: {
                    borderRadius: '0px !important',
                },
                standardInfo: {
                    borderRadius: '0px !important',
                },
            },
        },
        MuiModal: {
            styleOverrides: {
                root: {
                    ' .MuiModal-backdrop': {
                        backgroundColor: `${paletteColors.primary.main}80`,
                    },
                },
            },
        },
    },
    MuiFormLabel: {
        styleOverrides: {
            root: {
                color: '#000',
                '& p': {
                    fontSize: '1.2rem !important',
                },
            },
        },
    },
    MuiDialogContentText: {
        styleOverrides: {
            root: {
                color: '#000',
            },
        },
    },
    accordion: {
        backgroundColor: '#ebefef',
    },
    custom: {
        borders: ['1px solid #e4e4e4', '2px solid #e4e4e4'],
    },
} as const;

// Esporta le customizzazioni del tema
declare module '@mui/material/styles' {
    interface Theme extends CustomTheme {}

    interface ThemeOptions extends CustomTheme {}
}

export type CustomTheme = {
    [Key in keyof typeof themeOptions]: (typeof themeOptions)[Key];
};

// @ts-ignore
export const GoldMinaTheme = responsiveFontSizes(createTheme(themeOptions));
