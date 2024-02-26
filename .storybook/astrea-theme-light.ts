import { create } from '@storybook/theming';
import baseTheme from './astrea-theme-base';
import logo from './images/logo-dark.png';

export default create({
  base: 'light',
  ...baseTheme,

  brandImage: logo,

  // Base colors
  colorPrimary: '#308a7d',
  colorSecondary: '#308a7d',

  // UI
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appBorderColor: '#585C6D',

  // Text colors
  textColor: '#10162F',
  textInverseColor: '#ffffff',

  // Toolbar default and active colors
  barTextColor: '#9E9E9E',
  barSelectedColor: '#585C6D',
  barBg: '#ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#10162F',
  inputTextColor: '#10162F',
});
