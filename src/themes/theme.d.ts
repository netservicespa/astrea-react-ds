import { Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        focus: {
            main: string;
        };
        borderColor: {
            main: string;
        };
        darkTextColor: {
            primary: string;
            secondary: string;
            tertiary: string;
        };
    }
    interface Theme {
        accordion: {
            backgroundColor: string;
        };
        header: {
            backgroundColor: string;
            textColor: string;
            borderColor: string;
            menuBackgroundColor: string;
            menuTextColor: string;
            focusBackgroundColor: string;
        };
        footer: {
            backgroundColor: string;
            width: string;
            height: string;
            boxSizing: string;
            borderTop: string;
            borderColor: string;
            fontColor: string;
            fontSize: string;
            fontWeight: number;
            imageWidth: string;
            imageHeight: string;
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
            width?: string;
            height?: string;
            boxSizing?: string;
            borderTop?: string;
            borderColor?: string;
            fontColor?: string;
            fontSize?: string;
            fontWeight?: number;
            imageWidth?: string;
            imageHeight?: string;
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
