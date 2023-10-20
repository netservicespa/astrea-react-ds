import React from 'react';
import { NsTag } from '../../components/components/NsTag';

export default {
    title: 'Components/Tag',
    component: NsTag,
    argTypes: {
        label: { control: 'text' },
        color: { control: 'select', options: ['primary', 'secondary', 'error', 'info', 'warning', 'success'] },
        variant: { control: 'select', options: ['filled', 'outlined'] },
    },
};

const Template = (args) => <NsTag {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    label: 'primary',
    color: 'primary',
};

export const Success = Template.bind({});
Success.args = {
    label: 'success',
    color: 'success',
};