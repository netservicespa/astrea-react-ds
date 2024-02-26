import { Grid } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { ValidatedForm } from '../../../../components/components/form/ValidatedForm';
import { ValidatedDragDrop } from '../../../../components/components/form/fields/ValidatedDragDrop';
import {required} from "../../../../components/components/form/validators";
import {useTranslation} from "react-i18next";

export default {
  title: 'Components/Form/DragDrop',
  component: ValidatedDragDrop,
  argTypes: { label: { type: 'string' } },
} as Meta<typeof ValidatedDragDrop>;

const Template: StoryFn<typeof ValidatedDragDrop> = (args) => {
  const { t } = useTranslation();

  return (
    <ValidatedForm onSubmit={() => {}} buttonsSlot={false}>
      <Grid container>
        <Grid item xs={3} md={6}>
          <ValidatedDragDrop
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
    </ValidatedForm>
  );
};

export const DragDrop = Template.bind({});
