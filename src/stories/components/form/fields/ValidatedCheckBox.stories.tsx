import { FormGroup, FormLabel } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ValidatedForm } from '../../../../components/components/form/ValidatedForm';
import { ValidatedCheckbox } from '../../../../components/components/form/fields/ValidatedCheckbox';

export default {
  title: 'Components/Form/CheckBox',
  component: ValidatedCheckbox,
} as Meta<typeof ValidatedCheckbox>;

const Template: StoryFn<typeof ValidatedCheckbox> = (args) => {
  const { t } = useTranslation();

  return (
    <ValidatedForm onSubmit={() => {}} showButtons={false}>
      <FormLabel component="legend">Choose your favourite meal</FormLabel>
      <FormGroup>
        <ValidatedCheckbox label="Tortellini" labelPlacement="end" />
        <ValidatedCheckbox label="Lasagne" labelPlacement="end" />
        <ValidatedCheckbox label="Erbazzone" labelPlacement="end" />
        <ValidatedCheckbox label="Pizza" labelPlacement="end" />
      </FormGroup>
    </ValidatedForm>
  );
};

export const CheckBox = Template.bind({});
