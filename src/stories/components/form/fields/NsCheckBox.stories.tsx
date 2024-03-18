import { FormGroup, FormLabel } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NsForm } from '../../../../components/components/form/NsForm';
import { NsCheckbox } from '../../../../components/components/form/fields/NsCheckbox';

export default {
  title: 'Components/Form/CheckBox',
  component: NsCheckbox,
} as Meta<typeof NsCheckbox>;

const Template: StoryFn<typeof NsCheckbox> = (args) => {
  const { t } = useTranslation();

  return (
    <NsForm onSubmit={() => {}} buttonsSlot={false}>
      <FormLabel component="legend">Choose your favourite meal</FormLabel>
      <FormGroup>
        <NsCheckbox label="Tortellini" labelPlacement="end" />
        <NsCheckbox label="Lasagne" labelPlacement="end" />
        <NsCheckbox label="Erbazzone" labelPlacement="end" />
        <NsCheckbox label="Pizza" labelPlacement="end" />
      </FormGroup>
    </NsForm>
  );
};

export const CheckBox = Template.bind({});
