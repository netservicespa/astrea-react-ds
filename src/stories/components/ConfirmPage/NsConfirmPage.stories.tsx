import React from 'react';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import { NsConfirmPage } from '@/components/components/confirmPage/NsConfirmPage';

export default {
    title: 'Layouts/ConfirmationPage',
    component: NsConfirmPage,
} as Meta;

const Template: StoryFn<any> = (args) => (
    <div>
        <NsConfirmPage {...args} />
    </div>
);

export const Default = {
    render: Template,

    args: {
        title: 'Cambia questo titolo per vedere come viene sovrascritto',
        description: 'Cambia questo contenuto per vedere come viene sovrascritto',
        showDetailButton: false,
        detailLink: 'https://www.netservice.it',
    },
};

export const WithDetailButton = {
    render: Template,

    args: {
        title: 'Cambia questo titolo per vedere come viene sovrascritto',
        description: 'Cambia questo contenuto per vedere come viene sovrascritto',
        showDetailButton: true,
        detailLink: 'https://www.netservice.it',
    },
};
