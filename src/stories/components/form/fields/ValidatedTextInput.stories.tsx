import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { ValidatedForm } from '../../../../components/components/form/ValidatedForm';
import { ValidatedTextInput } from '../../../../components/components/form/fields/ValidatedTextInput';

export default {
  title: 'Components/Form/TextInput',
  component: ValidatedTextInput,
} as Meta<typeof ValidatedTextInput>;

const Template: StoryFn<typeof ValidatedTextInput> = (args) => {
  return (
    <ValidatedForm onSubmit={() => {}} buttonsSlot={false}>
      <ValidatedTextInput label="Check me out!" name="ciaone" />
    </ValidatedForm>
  );
};

export const TextInput = Template.bind({});
