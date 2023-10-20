import { addons } from '@storybook/manager-api';
import NetServiceTheme from './nsds-theme';

addons.setConfig({
  isFullscreen: false,
  showNav: true,
  showPanel: true,
  theme: NetServiceTheme,
});
