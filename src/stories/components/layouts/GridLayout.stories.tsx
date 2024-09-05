import { Container, Divider, Typography } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { NsForm } from 'src/components/components/form/NsForm';
import { NsTextInput } from 'src/components/components/form/fields/NsTextInput';
import { NsDateCalendar } from 'src/components/components/form/fields/NsDateCalendar';
import { required } from 'src/components/components/form/validators';
import { NsGridLayout } from 'src/components/layout/NsGridLayout';
import { useTranslation } from 'react-i18next';

export default {
    title: 'Tools/GridLayout',
    component: NsGridLayout,
    parameters: {
        docs: { source: { type: 'code' } },
    },
    argTypes: {
        rowSize: {
            label: 'Row Size',
            type: 'number',
        },
    },
} as Meta<typeof NsGridLayout>;

interface FormContents {
    field1?: string;
    field2?: string;
    field3?: string;
    field4?: string;
    field5?: string;
}

const Template: StoryFn<typeof NsGridLayout> = (args) => {
    const { t } = useTranslation();
    const [data, setData] = React.useState<FormContents>({});
    return (
        <>
            <NsForm onSubmit={setData} onReset={() => setData({})}>
                <NsGridLayout rowSize={args.rowSize}>
                    <NsTextInput
                        name="field1"
                        label="Field 1*"
                        validate={required}
                        errorMessage={t('form.errors.required', { field: 'Field 1' })}
                    />
                    <NsTextInput name="field2" label="Field 2" />
                    <NsTextInput name="field3" label="Field 3" />
                    <NsDateCalendar name="field4" label="Field 4" />
                    <NsTextInput name="field5" label="Field 5" />
                </NsGridLayout>
            </NsForm>
            <Container maxWidth={false}>
                <Divider sx={{ my: 4 }} />
                <Typography>Form Data:</Typography>
                <Typography component="pre">{JSON.stringify(data, null, 2)}</Typography>
            </Container>
        </>
    );
};

export const Grid = Template.bind({});

Grid.args = {
    rowSize: 2,
};
