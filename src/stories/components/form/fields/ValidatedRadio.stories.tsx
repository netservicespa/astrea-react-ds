import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { ValidatedForm } from '../../../../components/components/form/ValidatedForm';
import { ValidatedRadio } from '../../../../components/components/form/fields/ValidatedRadio';
import { FormGroup, FormLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default {
  title: 'Components/Form/Radio',
  component: ValidatedRadio,
} as Meta<typeof ValidatedRadio>;

const Template: StoryFn<typeof ValidatedRadio> = (args) => {
  const { t } = useTranslation();

  return (
    <ValidatedForm onSubmit={() => {}} showButtons={false}>
      <FormLabel component="legend">Choose your favourite meal</FormLabel>
      <FormGroup>
        <ValidatedRadio label="Tortellini" labelPlacement="end" />
        <ValidatedRadio label="Lasagne" labelPlacement="end" />
        <ValidatedRadio label="Erbazzone" labelPlacement="end" />
        <ValidatedRadio label="Pizza" labelPlacement="end" />
      </FormGroup>
    </ValidatedForm>
  );
};

export const Radio = Template.bind({});
