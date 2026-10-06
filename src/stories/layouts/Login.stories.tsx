import { Meta } from '@storybook/react-webpack5';
import React from 'react';
import { NsLogin } from '@/components/layout/login/NsLogin';
import { DefaultButtons, CustomTestButtons } from '@/components/components/form/NsForm';

/**
 * Login forms are necessary components of most applications and websites.
 */
const story: Meta<typeof NsLogin> = {
    title: 'Layouts/Login',
    component: NsLogin,
    argTypes: {
        onButtonClick: { action: 'clicked' },
        logoSrc: { control: 'text' },
        gradient: { control: 'text' },
        title1: { control: 'text' },
        title2: { control: 'text' },
        headerTitle: { control: 'text' },
        cardBorderRadius: { control: 'text' },
        handleFormSubmit: { action: 'submit' },
    },
};
export default story;

export const Default = {
    args: {
        logoSrc: './images/logo-dark.png',
        gradient:
            'linear-gradient(-240.64224645720873deg, rgba(48, 138, 125, 0.99)  1.9191447712979693e-14%, rgba(48, 138, 125, 0.7), #0c4b50 100% )',
        imagePath: './images/ns-abstarct.jpg',
        title1: 'Login',
        title2: 'Login 2',
        type: 'classic',
        headerTitle: {
            bold: 'Net Service',
            thin: 'Design System',
            subtitle: 'version 1.0.0',
        },
        cardBorderRadius: '0px',
        cardWidth: '600px',
    },
};

export const LoginForm = {
    args: {
        logoSrc: './images/logo-dark.png',
        gradient:
            'linear-gradient(-240.64224645720873deg, rgba(48, 138, 125, 0.99)  1.9191447712979693e-14%, rgba(48, 138, 125, 0.7), #0c4b50 100% )',
        imagePath: './images/ns-abstarct.jpg',
        title1: 'Login',
        title2: 'Login 2',
        type: 'form',
        formBgColor: '#fff',
        rightBannerColor: '#fff',
    },
};

export const ClassicForm = {
    args: {
        gradient:
            'linear-gradient(-240.64224645720873deg, rgba(48, 138, 125, 0.99)  1.9191447712979693e-14%, rgba(48, 138, 125, 0.7), #0c4b50 100% )',
        imagePath: './images/ns-abstarct.jpg',
        headerTitle: {
            bold: 'Net Service',
            thin: 'Design System',
            subtitle: 'version 1.0.0',
        },
        cardBorderRadius: '0px',
        type: 'classic',
        handleFormSubmit: () => console.log('custom submit'),
    },
};

export const LoginWithButtonSlot = {
    args: {
        logoSrc: './images/logo-dark.png',
        gradient:
            'linear-gradient(-240.64224645720873deg, rgba(48, 138, 125, 0.99)  1.9191447712979693e-14%, rgba(48, 138, 125, 0.7), #0c4b50 100% )',
        imagePath: './images/ns-abstarct.jpg',
        title1: 'Login',
        title2: 'Login 2',
        type: 'form',
        buttonsSlot: <CustomTestButtons />,
    },
};
