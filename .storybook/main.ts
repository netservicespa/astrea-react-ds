import remarkGfm from 'remark-gfm';
import type { StorybookConfig } from '@storybook/react-webpack5';

import path from 'path';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-viewport',
        '@storybook/addon-docs',
        '@storybook/addon-a11y',
        '@storybook/addon-designs',
        'storybook-dark-mode',
        {
            name: '@storybook/addon-styling-webpack',
            options: {
                rules: [
                    {
                        test: /\.s[ac]ss$/i,
                        use: [
                            'style-loader',
                            'css-loader',
                            {
                                loader: 'sass-loader',
                                options: { implementation: require.resolve('sass') },
                            },
                        ],
                    },
                ],
            },
        },
        '@storybook/addon-webpack5-compiler-babel',
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    docs: {
        mdxPluginOptions: {
            mdxCompileOptions: {
                remarkPlugins: [remarkGfm],
            },
        },
    },
    staticDirs: ['../public'],
    webpackFinal: async (config) => {
        config.resolve = config.resolve ?? {};
        config.resolve.modules = [path.resolve(__dirname, '..'), 'node_modules'];
        config.resolve.alias = {
            ...(config.resolve.alias ?? {}),
            '@root': path.resolve(__dirname, '../'),
            '@': path.resolve(__dirname, '../src'),
            'CHANGELOG': path.resolve(__dirname, '../CHANGELOG.md'),
        };
        return config;
    },
};

export default config;
