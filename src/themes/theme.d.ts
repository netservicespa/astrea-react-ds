import { Theme } from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface Palette {
        focus: {
            main: string;
        };
    }
    interface Theme {
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
    }
}