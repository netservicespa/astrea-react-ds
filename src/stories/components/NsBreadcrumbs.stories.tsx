import React from 'react';
import { NsBreadcrumbs } from 'src/components/components/NsBreadcrumbs';

export default {
    title: 'Components/Breadcrumbs',
    component: NsBreadcrumbs,
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
