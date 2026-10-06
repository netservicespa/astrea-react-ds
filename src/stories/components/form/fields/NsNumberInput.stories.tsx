import { Meta, StoryFn } from '@storybook/react-webpack5';
import React from 'react';
import { NsForm } from '@/components/components/form/NsForm';
import { NsNumberInput } from '@/components/components/form/fields/NsNumberInput';

export default {
    title: 'Components/Form/Number Input',
    component: NsNumberInput,
} as Meta<typeof NsNumberInput>;

const Template: StoryFn<typeof NsNumberInput> = (args) => {
    return (
        <NsForm onSubmit={() => {}} buttonsSlot={false}>
            <NsNumberInput label="Check me out!" name="numberInput" />
        </NsForm>
    );
};

export const TextInput = {
    render: Template,
};
