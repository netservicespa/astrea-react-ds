import { CssBaseline, ThemeProvider } from '@mui/material';
import type { Preview } from '@storybook/react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { theme as nsTheme } from '../src/themes/NetServiceTheme';
import { themes } from '@storybook/theming';
import React from 'react';

export const globalTypes = {
  theme: {
    name: 'Theme',
    title: 'Theme',
    description: 'Theme for your components',
    defaultValue: 'nsTheme',
    toolbar: {
      icon: 'paintbrush',
      dynamicTitle: true,
      items: [{ value: 'nsTheme', left: '🌙', title: 'Astrea Theme' }],
    },
  },
  /*locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    toolbar: {
      icon: 'globe',
      dynamicTitle: true,
      items: [
        { value: 'en', title: 'English' },
        { value: 'it', title: 'Italiano' },
      ],
    },
  },*/
};

// Add your theme configurations to an object that you can
// pull your desired theme from.
const THEMES = {
  nsTheme,
};

// Wrap stories in the I18nextProvider component
const withI18next = (Story, context) => {
  const { locale } = context.globals;

  // When the locale global changes
  // Set the new locale in i18n
  React.useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return <I18nextProvider i18n={i18n}>{Story()}</I18nextProvider>;
};

const withMuiTheme = (Story, context) => {
  // The theme global we just declared
  const { theme: themeKey } = context.globals;

  // only recompute the theme if the themeKey changes
  const theme = React.useMemo(
    () => THEMES[themeKey] || THEMES['nsTheme'],
    [themeKey]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {Story()}
    </ThemeProvider>
  );
};

// export all decorators that should be globally applied in an array
const decorators = [withI18next, withMuiTheme];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    i18n,
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Components',
          'Navigation',
          'Form',
          'Wrappers',
          'Docs',
          'Example',
        ],
        locales: 'en-US',
      },
    },
    backgrounds: {
      grid: {
        disable: true,
      },
      disableBackgrounds: true,
    },
    darkMode: {
      dark: { ...themes.dark, appBg: 'black' },
    },
    showCode: true,
  },
  globals: {
    locale: 'en',
    locales: {
      en: 'English',
      it: 'Italiano',
    },
  },
  globalTypes,
  decorators,
};

export default preview;