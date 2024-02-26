import { createTheme, responsiveFontSizes } from "@mui/material";
import { darken } from "@mui/system";

const paletteColors = {
  primary: {
    main: "#2852B5"
  },
  secondary: {
    main: "#22479C"
  },
  error: {
    main: "#A22815"
  },
  info: {
    main: "#2852B5"
  },
  success: {
    main: "#2852B5"
  },
  focus: {
    main: "#F26A0E"
  },
  borderColor: {
    main: "#B1B4B6"
  },
  darkTextColor: {
    primary: "#000000",
    secondary: "#3D3D3D",
    tertiary: "#595959"
  },
  type: "light"
};

const themeOptions = {
  typography: {
    fontFamily: "'Titillium Web', sans-serif",
    h1: {
      fontSize: "1.9rem",
      fontWeight: 600
    },
    h2: {
      fontSize: "1.3rem",
      fontWeight: 600
    },
    h3: {
      fontSize: "1.1rem",
      fontWeight: 600
    },
    h4: {
      fontSize: "1rem",
      fontWeight: 600
    },
    body1: {
      fontSize: "1.1rem",
      color: "#000"
    }
  },
  header: {
    backgroundColor: "#2852B5",
    borderColor: "0px solid #fff ",
    menuTextColor: "#2852b5",
    padding: "0px !important",
    color: "#2852b5",
    textAlign: "center",
    menuBackgroundColor: "#EBEFEF"
  },
  footer: {
    backgroundColor: "#1A3575",
    marginTop: "30px"
  },
  spacing: [0, 4, 8, 16, 32, 64],
  button: {
    fontWeight: 600,
    letterSpacing: "0.05em",
    size: "large"
  },
  palette: paletteColors,
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.MuiOutlinedInput-notchedOutline": {
            borderColor: "#B1B4B6"
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#0B0C0C",
            borderWidth: "3px"
          },
          "&.Mui-focused": {
            boxShadow: `0 0 0 3px ${paletteColors.focus.main}`
          }
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            boxShadow: `0 0 0 3px ${paletteColors.focus.main}`
          },
          "&.Mui-focused-visible": {
            boxShadow: "none"
          },
          "&.MuiInput-underline:before ": {
            borderBottom: "none"
          },
          "&.MuiInput-underline:after ": {
            borderBottom:
              "none" /* Remove the bottom border when the input is active */
          },
          "&.MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottom: "none" /* Remove the bottom border on hover */
          },
          "&.MuiInput-underline:after": {
            borderBottom:
              "none" /* Remove the bottom border when the input is active */
          }
        },
        input: {
          padding: "8px"
        }
      },
      variants: [
        {
          props: { disabled: true },
          style: {
            backgroundColor: " #f0f0f0"
          }
        }
      ]
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          lineHeight: "2em",
          fontSize: "18px",
          textTransform: "none",
          fontWeight: 600,
          borderRadius: "0px",
          color: "#2852B5",
          "&.MuiButton-containedPrimary:not(.Mui-disabled):active": {
            boxShadow: `inset 0 0 0 5px ${paletteColors.focus.main}`
          },
          "&.MuiButton-outlinedPrimary:not(.Mui-disabled):active": {
            boxShadow: `inset 0 0 0 5px ${paletteColors.focus.main}`
          },

          "&.MuiButton-containedSecondary:not(.Mui-disabled):active": {
            boxShadow: `inset 0 0 0 5px ${paletteColors.focus.main}`
          },
          "&.MuiButton-outlinedSecondary:not(.Mui-disabled):active": {
            boxShadow: `inset 0 0 0 5px ${paletteColors.focus.main}`
          },

          "&.MuiButton-containedError:not(.Mui-disabled):active": {
            boxShadow: `inset 0 0 0 5px ${paletteColors.focus.main}`
          },

          "&.MuiButton-outlinedError:not(.Mui-disabled):active": {
            boxShadow: `inset 0 0 0 5px ${paletteColors.focus.main}`
          },
          "&.MuiButton-containedPrimary": {
            background: "#2852B5",
            color: "#fff",
            fontSize: "18px",
            boxShadow: "none"
          },
          "&.MuiButton-containedSecondary": {
            background: "#EAEEF8",
            color: "#2852B5",
            fontSize: "18px",
            borderBottom: "3px solid #2852B5",
            boxShadow: "none"
          },
          "&.MuiButton-containedInfo": {
            background: "none",
            fontSize: "18px !important",
            border: "0px",
            boxShadow: "none",
            textDecoration: "underline",
            color: "#2852B5",
            padding: "0px"
          },
          "&.Mui-disabled:not(.MuiButton-outlinedPrimary)": {
            boxShadow: `inset 0 -3px 0 0 ${darken("#2852B5", 0)}`,
            backgroundColor: "#EAEEF8",
            color: "#2852B5"
          },
          "&.MuiButton-containedSuccess": {
            boxShadow: `inset 0 -3px 0 0 ${darken(
              paletteColors.success.main,
              0.5
            )}`
          },
          "&.MuiButton-containedError": {
            boxShadow: `inset 0 -3px 0 0 ${darken(
              paletteColors.error.main,
              0.5
            )}`,
            borderColor: "3px solid red !important"
          },
          "&.Mui-disabled.MuiButton-outlinedPrimary": {
            color: "#797979",
            border: `3px solid #A1A1A1`
          },
          "&.Mui-focusVisible": {
            boxShadow: `0 0 0 3px ${paletteColors.focus.main}`
          },
          "&.MuiButton-outlinedPrimary:not(.Mui-disabled)": {
            border: `2px solid ${paletteColors.primary.main}`
          },
          "&.MuiButton-outlinedSecondary:not(.Mui-disabled)": {
            border: "unset",
            boxShadow: `inset 0 -3px 0 0 ${darken(
              paletteColors.primary.main,
              0.4
            )}`,
            color: "#2E5A60"
          },

          "&.MuiButton-outlinedError:not(.Mui-disabled)": {
            border: `2px solid ${paletteColors.error.main}`
          }
        }
      },
      variants: [
        {
          props: { disabled: true },
          style: {
            backgroundColor: "#f0f0f0"
          }
        }
      ]
    }
  },
  MuiFormLabel: {
    styleOverrides: {
      root: {
        color: "#000",
        "& p": {
          fontSize: "1.2rem !important"
        }
      }
    }
  },
  MuiDialogContentText: {
    styleOverrides: {
      root: {
        color: "#000"
      }
    }
  },
  accordion: {
    backgroundColor: "#ebefef"
  },
  pages: {
    criteriDiRicerca: {
      select: {
        marginBottom: "10px",
        marginTop: "6px",
        marginRight: "0px",
        width: "98%",
        marginLeft: "5px"
      },
      campiObbligatori: {
        color: "#D32F2F",
        margin: "10px 10px"
      },
      label: {
        color: "rgba(0,0,0,0.4)"
      }
    }
  },
  custom: {
    borders: ["1px solid #e4e4e4", "2px solid #e4e4e4"]
  }
} as const;

export type CustomTheme = {
  [Key in keyof typeof themeOptions]: (typeof themeOptions)[Key];
};

// @ts-ignore
export const theme = responsiveFontSizes(createTheme(themeOptions));