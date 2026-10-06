import { addons } from 'storybook/manager-api';
import themeDark from './astrea-theme-dark';
import themeLight from './astrea-theme-light';

addons.setConfig({
    isFullscreen: false,
    showNav: true,
    showPanel: true,
});

// Override brandImage after the dark-mode addon toggles themes,
// because mergeThemeWithBrandConfig in the addon always takes brandImage
// from the initial config theme, ignoring the per-mode brandImage.
addons.register('custom/dark-mode-logo-fix', (api) => {
    const channel = addons.getChannel();
    channel.on('DARK_MODE', (isDark: boolean) => {
        api.setOptions({ theme: isDark ? themeDark : themeLight });
    });
});
