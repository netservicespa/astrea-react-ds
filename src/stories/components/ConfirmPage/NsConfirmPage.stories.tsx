import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { NsConfirmPage } from 'src/components/components/confirmPage/NsConfirmPage';

export default {
    title: 'Layouts/ConfirmationPage',
    component: NsConfirmPage,
} as Meta;

const Template: StoryFn<any> = (args) => (
    <div>
        <NsConfirmPage {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    title: 'Cambia questo titolo per vedere come viene sovrascritto',
    description: 'Cambia questo contenuto per vedere come viene sovrascritto',
    showDetailButton: false,
    detailLink: 'https://www.netservice.it',
};

export const WithDetailButton = Template.bind({});
WithDetailButton.args = {
    title: 'Cambia questo titolo per vedere come viene sovrascritto',
    description: 'Cambia questo contenuto per vedere come viene sovrascritto',
    showDetailButton: true,
    detailLink: 'https://www.netservice.it',
};
