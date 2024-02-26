import { create } from '@storybook/theming';
import baseTheme from './astrea-theme-base';
import logo from './images/logo-light.png';

export default create({
  base: 'dark',
  ...baseTheme,

  brandImage: logo,

  // Base colors
  colorPrimary: '#308a7d',
  colorSecondary: '#308a7d',

  // UI
  appBg: '#191919', // background sidebar
  appContentBg: '#333333', // background content docs
  appBorderColor: 'rgba(255, 255, 255, 0.1)', // all borders

  // Text colors
  textColor: '#ffffff', // menu color text for sidebar
  textInverseColor: '#999999',
  textMutedColor:'#ffffff', 

  // Toolbar default and active colors
  barTextColor: '#999999', // menu text color for toolbar
  barSelectedColor: '#308a7d', // menu selected text color for toolbar
  barBg: '#333333', // background toolbar

  // buttons
  // buttonBg: '#333333',
  // buttonBorder: '#333333',
  // booleanBg: '#333333',
  // booleanSelectedBg: '#333333',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#333333',
  inputTextColor: '#333333',
});
