import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { NsForm } from 'src/components/components/form/NsForm';
import { NsTextArea } from 'src/components/components/form/fields/NsTextArea';

export default {
  title: 'Components/Form/Textarea',
  component: NsTextArea,
} as Meta<typeof NsTextArea>;

const Template: StoryFn<typeof NsTextArea> = (args) => {
  return (
    <NsForm onSubmit={() => {}}>
      <NsTextArea
        label="Insert a comment"
        name="astrea-textarea"
        placeholder="Hello, this is text written in a textarea"
      />
    </NsForm>
  );
};

export const TextInput = Template.bind({});
