import React from 'react';
import { NsTag } from 'src/components/components/NsTag';
import { Meta } from '@storybook/react';

const meta: Meta = {
    title: 'Components/Tag',
    component: NsTag,
    parameters: {
        docs: {
            description: {
                component: `Use the \`NsTag\` component to display labels, status, categories, and more.`,
            },
        },
    },
    argTypes: {
        onDelete: { control: 'boolean' },
        label: {
            description: 'The text to be displayed inside the tag.',
            control: 'text',
            table: {
                category: 'Content',
            },
        },
        color: {
            description:
                'The color scheme of the tag, corresponding to the theme colors.',
            control: 'select',
            options: ['primary', 'secondary', 'error', 'info', 'warning', 'success'],
            table: {
                category: 'Appearance',
            },
        },
        variant: {
            description: 'The style variant of the tag; filled or outlined.',
            control: 'select',
            options: ['filled', 'outlined'],
            table: {
                category: 'Appearance',
            },
        },
        size: {
            description: 'The size of the tag, affecting its padding and font size.',
            control: 'radio',
            options: ['small', 'medium', 'large'],
            table: {
                category: 'Layout',
            },
        },
    },
};

export default meta;

const Template = (args) => <NsTag {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    variant: 'filled',
    label: 'Primary',
    color: 'primary',
    size: 'medium',
    onDelete: undefined,
};

export const Error = Template.bind({});
Error.args = {
    variant: 'filled',
    label: 'Error',
    color: 'error',
    size: 'medium',
    onDelete: undefined,
};

export const Warning = Template.bind({});
Warning.args = {
    variant: 'filled',
    label: 'Warning',
    color: 'warning',
    size: 'medium',
    onDelete: undefined,
};

export const Success = Template.bind({});
Success.args = {
    variant: 'filled',
    label: 'Success',
    color: 'success',
    size: 'medium',
    onDelete: undefined,
};

export const ErasableFilter = Template.bind({});
ErasableFilter.args = {
    variant: 'filled',
    label: 'Error',
    color: 'error',
    size: 'medium',
};
