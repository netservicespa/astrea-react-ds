import React from 'react';
import { NsBreadcrumbs } from 'src/components/components/NsBreadcrumbs';
import FIGMA from '@root/figma.json';

export default {
    title: 'Components/Breadcrumbs',
    component: NsBreadcrumbs,
    parameters: {
        design: {
            type: 'figma',
            url: FIGMA.components.breadcrumb,
        },
    },
    argTypes: {},
};

const Template = (args) => {
    return <NsBreadcrumbs {...args} />;
};

export const Default = Template.bind({});
Default.args = {
    linkItems: [
        {
            name: 'Homepage',
            href: '/home',
        },
        {
            name: 'Insurace',
            href: '/link',
        },
    ],
    title: 'Banking solution',
    linkUnderline: 'always',
};
