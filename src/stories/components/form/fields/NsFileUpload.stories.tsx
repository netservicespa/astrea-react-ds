import { Grid } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import React from 'react';
import { NsForm } from '@/components/components/form/NsForm';
import { required } from '@/components/components/form/validators';
import { useTranslation } from 'react-i18next';
import { NsFileUpload } from '@/components/components/form/fields/NsFileUpload';

export default {
    title: 'Components/Form/File Upload',
    component: NsFileUpload,
    argTypes: {
        name: {
            control: 'text',
            description: 'Name of the file input field',
            defaultValue: 'fileUpload',
        },
        inputProps: {
            control: 'object',
            description: 'Props for the input element, such as accept for file types.',
            defaultValue: { accept: '.pdf,.eml' },
        },
        defaultValue: {
            control: 'object',
            description: 'Default file value',
        },
        displayForm: {
            control: 'boolean',
            description: 'Whether to display the form surrounding the file upload input',
            defaultValue: true,
        },
        errorMessage: {
            control: 'text',
            description: 'Custom error message for validation failures',
            defaultValue: 'Please upload a valid file.',
        },
        validate: {
            control: 'function',
            description: 'Validation function for the uploaded file',
        },
        onChange: {
            action: 'file changed',
            description: 'Called when the file input changes',
        },
        disabled: {
            control: 'boolean',
            description: 'Disables the file input',
        },
    },
} as Meta<typeof NsFileUpload>;

const Template: StoryFn<typeof NsFileUpload> = (args) => {
    const { t } = useTranslation();
    const [data, setData] = React.useState<any>(undefined);

    const onSubmit = () => {
        console.log('Form Data', data);
    };

    const handleFileChange = (file: File) => {
        setData(file);
        console.log('file :', file);
    };

    return (
        <NsForm onSubmit={onSubmit} onReset={() => setData(undefined)}>
            <NsFileUpload
                {...args}
                displayForm
                errorMessage={t('form.errors.required', { field: 'File' })}
                name="fileUpload"
                defaultValue={data}
                onChange={handleFileChange}
                validate={required}
            />
        </NsForm>
    );
};

export const FileUploadComponent = {
    render: Template,
};

export const FileUploadWithAccept = {
    render: Template,

    args: {
        name: 'fileUpload',
        inputProps: {
            accept: '.pdf,.eml',
        },
        onChange: (file: File) => console.log('Accepted file:', file),
        errorMessage: 'Please upload a valid file.',
    },
};
