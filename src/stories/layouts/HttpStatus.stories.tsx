import { Meta, StoryFn } from '@storybook/react-webpack5';
import React from 'react';
import { NsHttpStatus, NsHttpStatusProps } from '@/components/layout/httpStatus/NsHttpStatus';

export default {
    title: 'Tools/HttpStatus',
    component: NsHttpStatus,
    argTypes: {
        httpCode: {
            control: 'number',
            description: 'HTTP status code',
            defaultValue: 404,
        },
        httpMessage: {
            control: 'text',
            description: 'Custom HTTP status message',
        },
        message: {
            control: 'text',
            description: 'Custom message for the user',
        },
        backButton: {
            control: 'boolean',
            description: 'Show back button',
            defaultValue: false,
        },
    },
} as Meta<typeof NsHttpStatus>;

export const Default = {
    args: {
        httpCode: 404,
    },
};

export const NotFound = {
    args: {
        httpCode: 404,
        backButton: true,
    },
};

export const InternalServerError = {
    args: {
        httpCode: 500,
        backButton: true,
    },
};

export const CustomMessage = {
    args: {
        httpCode: 403,
        httpMessage: 'Forbidden',
        message: 'You do not have permission to access this resource.',
        backButton: true,
    },
};
