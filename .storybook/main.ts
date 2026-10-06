// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import remarkGfm from 'remark-gfm';
import type { StorybookConfig } from '@storybook/react-webpack5';

import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-docs',
        '@storybook/addon-a11y',
        '@storybook/addon-designs',
        '@storybook-community/storybook-dark-mode',
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
        '@storybook/addon-webpack5-compiler-babel'
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
