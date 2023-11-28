import { Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    focus: {
      main: string;
    };
  }
  interface Theme {
    accordion: {
      backgroundColor: string;
    };
    header: {
      backgroundColor: string;
      borderColor: string;
      menuBackgroundColor: string;
      menuTextColor: string;
      focusBackgroundColor: string;
    };
    footer: {
      backgroundColor: string;
    };
    typography: {
      fontFamily: string;
      h1: {
        fontSize: string;
        fontWeight: number;
      };
    };
  }
  interface ThemeOptions {
    header?: {
      backgroundColor?: string;
      borderColor?: string;
      menuBackgroundColor?: string;
      menuTextColor?: string;
    };
    footer?: {
      backgroundColor?: string;
    };
    typography?: {
      fontFamily?: string;
      h1?: {
        fontSize?: string;
        fontWeight?: number;
      };
    };
  }
}
