import { Grid } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { NsForm } from '../../../../components/components/form/NsForm';
import { required } from '../../../../components/components/form/validators';
import { useTranslation } from 'react-i18next';
import { NsFileUpload } from '../../../../components/components/form/fields/NsFileUpload';

export default {
  title: 'Components/Form/File Upload',
  component: NsFileUpload,
  argTypes: {},
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

export const FileUploadComponent = Template.bind({});
