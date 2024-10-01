import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { Preview } from '@storybook/react';
import { DocsContainer, DocsPage, Unstyled } from "@storybook/blocks";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import themeLight from './astrea-theme-light';
import themeDark from './astrea-theme-dark';
import { theme as nsTheme } from '../src/themes/NetServiceTheme';
import { BlueChiaTheme as blueChia } from '../src/themes/BlueChiaTheme';
import { GoldMinaTheme as goldMina } from '../src/themes/GoldMinaTheme';
import { AstreaTheme as astrea } from '../src/themes/AstreaTheme';
import './styles.scss';
import { NeedHelp } from '../src/stories/utlis/needHelp/NeedHelp';

const isDark = typeof window !== `undefined` ? window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches : null;

export const globalTypes = {
  theme: {
    name: 'Theme',
    title: 'Theme',
    description: 'Theme for your components',
    defaultValue: 'nsTheme',
    toolbar: {
      icon: 'paintbrush',
      dynamicTitle: true,
      items: [
        { value: 'nsTheme', left: '🍃', title: 'Green NS' },
        { value: 'blueChia', left: '🌊', title: 'Blue Chia' },
        { value: 'goldMina', left: '🌟', title: 'Gold Mina' },
        { value: 'astrea', left: '🌚', title: 'Astrea' }
      ],
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
  blueChia,
  goldMina,
  astrea
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
      expanded: true,
      sort: 'requiredFirst',
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
          'Welcome',
          'Styles',
          'Components',
          'Patterns',
          'Layouts',
          'Tools',
        ],
        locales: 'en-US',
      },
    },
    backgrounds: { disable: true },
    layout: 'centered',
    darkMode: {
      current: isDark ? 'dark' : 'light',
      // Override the default dark theme
      dark: { ...themeDark },
      // Override the default light theme
      light: { ...themeLight },
      darkClass: 'dark-theme',
      lightClass: 'light-theme',
      stylePreview: true
    },
    docs: {
      canvas: {
        sourceState: 'shown',
        layout: 'fullscreen'
      },
      container: ({ children, context }: { children: any; context: any }) => (
        <DocsContainer context={context}>
          {children}
          {<NeedHelp />}
        </DocsContainer>
      ),
    }  
  },
  globalTypes,
  decorators,
  tags: ['autodocs'],
  initialGlobals: {
    locale: 'en',
    locales: {
      en: 'English',
      it: 'Italiano',
    },
  }
};

export default preview;
