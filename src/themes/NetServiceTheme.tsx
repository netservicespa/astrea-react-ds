import { createTheme, responsiveFontSizes } from '@mui/material';
import { darken } from '@mui/system';

export const accordionBackgroundColor = '#ebefef';

const paletteColors = {
  primary: {
    main: '#308A7D',
  },
  secondary: {
    main: '#cce2df',
  },
  error: {
    main: '#D4351C',
  },
  info: {
    main: '#00703c',
  },
  success: {
    main: '#006636',
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
      fontSize: '1.5rem',
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
  spacing: [0, 4, 8, 16, 32, 64],
  button: {
    fontWeight: 600,
    letterSpacing: '0.05em',
    size: 'large',
  },
  palette: paletteColors,
  props: {
    MuiTooltip: {
      arrow: true,
    },
    MuiAppBar: {
      color: 'default',
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          '&.MuiTab-textColorPrimary': {
            backgroundColor: '#E8E8E8',
            color: '#000',
          },
          '&.MuiTab-textColorPrimary:not(.Mui-selected)': {
            borderColor: '#E8E8E8',
          },
          '&.Mui-selected': {
            backgroundColor: '#FFF',
          },
          '&:hover:not(.Mui-selected)': {
            backgroundColor: 'lightgray',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#FFFFFF',
          color: '#000000',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            boxShadow: `0 0 0 3px ${paletteColors.focus.main}`,
          },
          '&.MuiInput-underline:before ': {
            borderBottom: 'none',
          },
          '&.MuiInput-underline:after ': {
            borderBottom:
              'none' /* Remove the bottom border when the input is active */,
          },
          '&.MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottom: 'none' /* Remove the bottom border on hover */,
          },
          '&.MuiInput-underline:after': {
            borderBottom:
              'none' /* Remove the bottom border when the input is active */,
          },
        },
        input: {
          padding: '8px',
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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
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
        input: {
          padding: '8px',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    
		MuiPaginationItem: {
			styleOverrides: {
        root: {
          fontSize: '1.125rem',
					'&.Mui-selected': {
            backgroundColor: '#cce2df',
						border: '3px solid #2e5a60',
						borderBottom: '3px solid #2e5a60',
						color: '#2e5a60',
						
						height: '44px',
						width: '44px',
          },
					'&.Mui-selected:hover': {
						color: '#fff',
				  },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          lineHeight: '2em',
          fontSize: '1em',
          textTransform: 'none',
          fontWeight: 600,
          '&.MuiButton-containedPrimary:not(.Mui-disabled):active': {
            boxShadow: `inset 0 0 0 5px ${paletteColors.focus.main}`,
          },
          '&.MuiButton-outlinedPrimary:not(.Mui-disabled):active': {
            boxShadow: `inset 0 0 0 5px ${paletteColors.focus.main}`,
          },

          '&.MuiButton-containedSecondary:not(.Mui-disabled):active': {
            boxShadow: `inset 0 0 0 5px ${paletteColors.focus.main}`,
          },
          '&.MuiButton-outlinedSecondary:not(.Mui-disabled):active': {
            boxShadow: `inset 0 0 0 5px ${paletteColors.focus.main}`,
          },

          '&.MuiButton-containedError:not(.Mui-disabled):active': {
            boxShadow: `inset 0 0 0 5px ${paletteColors.focus.main}`,
          },

          '&.MuiButton-outlinedError:not(.Mui-disabled):active': {
            boxShadow: `inset 0 0 0 5px ${paletteColors.focus.main}`,
          },

          '&.MuiButton-containedSecondary': {
            color: '#2E5A60',
            boxShadow: `inset 0 -3px 0 0 ${darken(
              paletteColors.primary.main,
              0.4
            )}`,
          },
          '&.MuiButton-containedSuccess': {
            boxShadow: `inset 0 -3px 0 0 ${darken(
              paletteColors.success.main,
              0.5
            )}`,
          },
          '&.MuiButton-containedError': {
            boxShadow: `inset 0 -3px 0 0 ${darken(
              paletteColors.error.main,
              0.5
            )}`,
          },
          '&.Mui-disabled:not(.MuiButton-outlinedPrimary)': {
            boxShadow: `inset 0 -3px 0 0 ${darken('#595959', 0.5)}`,
            backgroundColor: '#595959',
            color: '#FFF',
          },

          '&.Mui-disabled.MuiButton-outlinedPrimary': {
            color: '#797979',
            border: `3px solid #595959`,
          },
          '&.Mui-focusVisible': {
            boxShadow: `0 0 0 3px ${paletteColors.focus.main}`,
          },
          '&.MuiButton-outlinedPrimary:not(.Mui-disabled)': {
            border: `2px solid ${paletteColors.primary.main}`,
          },
          '&.MuiButton-outlinedSecondary:not(.Mui-disabled)': {
            border: 'unset',
            boxShadow: `inset 0 -3px 0 0 ${darken(
              paletteColors.primary.main,
              0.4
            )}`,
            color: '#2E5A60',
          },

          '&.MuiButton-outlinedError:not(.Mui-disabled)': {
            border: `2px solid ${paletteColors.error.main}`,
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
          color: '#A22815',
        },
      },
    },

		MuiPaper: {
      styleOverrides: {
        root: {
          marginTop: '5px',
        },
      },
    },

		MuiMenuItem: {
      styleOverrides: {
        root: {
          //backgroundColor: '#FFF',
					border: '1px solid #B1B4B6'
        },
      },
    },
		MuiPickersLayout: {
      styleOverrides: {
        root: {
          //backgroundColor: '#FFF',
					border: '1px solid #B1B4B6'
        },
      },
    },
		
		MuiPickersPopper: {
			styleOverrides: {
        root: {
			//backgroundColor: '#FFF',
			border: '0'
			},
		},
	  },


		MuiPopper: {
      styleOverrides: {
        root: {
          //backgroundColor: '#FFF',
					border: '1px solid #B1B4B6'
        },
      },
    },

		MuiCheckbox: {
			styleOverrides: {
        root: {
          color: '#000',
					/*'&.Mui-checked .MuiCheckbox-root': {
            borderColor: '#0B0C0C',
            borderWidth: '3px',
          },*/
					'&.Mui-checked': {
						
						"& svg": {
              fill: '#000',
							border: '3px solid #000',
							boxShadow: `0 0 0 3px ${paletteColors.focus.main}`,
							alignItems: 'center',
              justifyContent: 'center',
              "& path": {
                d:
                  "path('M5 16.577l2.194-2.195 5.486 5.484L24.804 7.743 27 9.937l-14.32 14.32z')",
									position: 'relative',
            top: '50%',
            left: '50%',
            transform: 'translate(-15%, -15%)',
              }
            }
					}
        },
      },
    },

		MuiRadio: {
			styleOverrides: {
        root: {
          color: '#000',
					border: '4px round #000',
					'&.Mui-checked': {
          

					  "& svg": {
						  fill: '#000',
						  boxShadow: `0 0 0 3px ${paletteColors.focus.main}`,
							borderRadius: '50%',
					  }
				  },
        },
      },
    },
  },
  accordion: {
    backgroundColor: accordionBackgroundColor,
  },
  header: {
    backgroundColor: '#000',
    borderColor: '#308a7d',
    menuBackgroundColor: 'rgba(229, 237, 238, 0.99)',
    menuTextColor: '#FFF',
    focusBackgroundColor: `${paletteColors.focus.main}`,
  },
  footer: {
    backgroundColor: '#0f193b',
  },
  titleCard: {
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  shape: {
    borderRadius: 0,
  },
  shadows: [
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
  ],
  custom: {
    borders: ['1px solid #e4e4e4', '2px solid #e4e4e4'],
  },
};

export type CustomTheme = {
  [Key in keyof typeof themeOptions]: (typeof themeOptions)[Key];
};

// @ts-ignore
export const theme = responsiveFontSizes(createTheme(themeOptions));
