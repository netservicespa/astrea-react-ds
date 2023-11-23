import React from 'react';
import { NsTag } from '../../components/components/NsTag';

export default {
    title: 'Components/Tag',
    component: NsTag,
    parameters: {
        docs: {
            description: {
                component:
                `Use the \`NsTag\` component to display labels, status, categories, and more.`,
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
            description: 'The color scheme of the tag, corresponding to the theme colors.',
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
    }   
};

const Template = (args) => <NsTag {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    variant: 'filled', 
    label: 'primary',
    color: 'primary',
    size: 'medium',
    onDelete: undefined
};

export const Success = Template.bind({});
Success.args = {
    variant: 'filled',
    label: 'success',
    color: 'success',
    size: 'medium',
};