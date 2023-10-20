import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Typography from '@mui/material/Typography';
import ConfirmPage, {ConfirmPageProps} from '../../../components/components/confirmPage/ConfirmPage';

export default {
    title: 'Layouts/ConfirmationPage',
    component: ConfirmPage,
} as Meta;

const Template: StoryFn<any> = (args) => (
    <div>
        <ConfirmPage {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    title: 'Cambia questo titolo per vedere come viene sovrascritto',
    description: 'Cambia questo contenuto per vedere come viene sovrascritto',
    showDetailButton: false,
    detailLink: 'https://www.netservice.it'
    
};

export const WithDetailButton = Template.bind({});
WithDetailButton.args = {
    title: 'Cambia questo titolo per vedere come viene sovrascritto',
    description: 'Cambia questo contenuto per vedere come viene sovrascritto',
    showDetailButton: true,
    detailLink: 'https://www.netservice.it'
    
};


