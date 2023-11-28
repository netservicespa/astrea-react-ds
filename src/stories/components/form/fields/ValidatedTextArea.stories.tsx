import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { ValidatedForm } from '../../../../components/components/form/ValidatedForm';
import { ValidatedTextArea } from '../../../../components/components/form/fields/ValidatedTextArea';

export default {
  title: 'Components/Form/TextArea',
  component: ValidatedTextArea,
} as Meta<typeof ValidatedTextArea>;

const Template: StoryFn<typeof ValidatedTextArea> = (args) => {
  return (
    <ValidatedForm onSubmit={() => {}}>
      <ValidatedTextArea label="Insert a comment" name="astrea-textarea" placeholder="Hello, this is text written in a textarea" />
    </ValidatedForm>
  );
};

export const TextInput = Template.bind({});
