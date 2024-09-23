import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { NsTimePicker } from 'src/components/components/form/fields/NsTimePicker';
import { Box } from '@mui/material';
import { NsForm } from 'src/components/components/form/NsForm';
import { required } from 'src/components/components/form/validators';
import { useTranslation } from 'react-i18next';

export default {
    title: 'Components/Form/Time Picker',
    component: NsTimePicker,
    argTypes: {},
} as Meta;

const Template: StoryFn<typeof NsTimePicker> = (args) => {
    const { t } = useTranslation();
    const [time, setTime] = React.useState<any>({});
    const label = 'meeting';
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <NsForm sx={{ width: '50%' }} onSubmit={(time: any) => setTime(time)} onReset={() => setTime({})}>
                <NsTimePicker
                    name={label}
                    label="meeting"
                    validate={required}
                    errorMessage={t('form.errors.required', { field: 'Birthday date' })}
                />
            </NsForm>
            {time && time[label]}
        </Box>
    );
};

export const Default = Template.bind({});
