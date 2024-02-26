import { addons } from '@storybook/manager-api';
import themeDark from './astrea-theme-dark';

addons.setConfig({
  isFullscreen: false,
  showNav: true,
  showPanel: true,
  theme: themeDark,
});
