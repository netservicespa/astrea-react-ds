import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { NsForm } from 'src/components/components/form/NsForm';
import { NsTextInput } from 'src/components/components/form/fields/NsTextInput';

export default {
  title: 'Components/Form/Text Input',
  component: NsTextInput,
} as Meta<typeof NsTextInput>;

const Template: StoryFn<typeof NsTextInput> = (args) => {
  return (
    <NsForm onSubmit={() => {}} buttonsSlot={false}>
      <NsTextInput label="Check me out!" name="ciaone" />
    </NsForm>
  );
};

export const TextInput = Template.bind({});
