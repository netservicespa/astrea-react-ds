import { Grid } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { NsForm } from '../../../../components/components/form/NsForm';
import { NsDragDrop } from '../../../../components/components/form/fields/NsDragDrop';
import { required } from '../../../../components/components/form/validators';
import { useTranslation } from 'react-i18next';

export default {
  title: 'Components/Form/DragDrop',
  component: NsDragDrop,
  argTypes: { label: { type: 'string' } },
} as Meta<typeof NsDragDrop>;

const Template: StoryFn<typeof NsDragDrop> = (args) => {
  const { t } = useTranslation();

  return (
    <NsForm onSubmit={() => {}} buttonsSlot={false}>
      <Grid container>
        <Grid item xs={3} md={6}>
          <NsDragDrop
            name="uploadFile"
            displayForm
            buttonStatus={true}
            onFileLoaded={() => console.log('stories')}
            multiple={false}
            validate={required}
            errorMessage={t('form.errors.required', { field: 'File' })}
          />
        </Grid>
      </Grid>
    </NsForm>
  );
};

export const DragDrop = Template.bind({});
