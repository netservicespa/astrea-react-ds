import { Container, Divider, FormGroup, FormLabel, MenuItem, Typography } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { NsForm } from 'src/components/components/form/NsForm';
import { NsTextInput } from 'src/components/components/form/fields/NsTextInput';
import { NsTextArea } from 'src/components/components/form/fields/NsTextArea';
import { NsDateCalendar } from 'src/components/components/form/fields/NsDateCalendar';
import { NsCheckbox } from 'src/components/components/form/fields/NsCheckbox';
import { NsSelect } from 'src/components/components/form/fields/NsSelect';
import { NsSelectAutocomplete } from 'src/components/components/form/fields/NsSelectAutocomplete';
import { NsDragDrop } from 'src/components/components/form/fields/NsDragDrop';
import { NsFileUpload } from 'src/components/components/form/fields/NsFileUpload';
import { required } from 'src/components/components/form/validators';
import { NsGridLayout } from 'src/components/layout/NsGridLayout';
import { NsRadio, NsRadioGroup } from '../../components/components/form/fields/NsRadioGroup';
import { useTranslation } from 'react-i18next';

const meta: Meta<typeof NsForm> = {
    title: 'Components/Forms',
    component: NsForm,
    parameters: {
        docs: { source: { type: 'code' } },
    },
};
export default meta;

interface FormContents {
    textField?: string;
    dateField?: string;
}

/**
 * Bello come il sole
 * @param args
 * @returns
 */
const Template: StoryFn<typeof NsForm> = (args) => {
    const [data, setData] = React.useState<FormContents>({});
    const { t } = useTranslation();

    return (
        <>
            <NsForm
                {...args}
                onSubmit={(data: any) => setData(data)}
                onReset={() => setData({})}
            >
                <NsGridLayout rowSize={2}>
                    <NsSelect
                        defaultValue=""
                        errorMessage="The 'Select' field is required"
                        label="Select"
                        name="select"
                        validate={required}
                        required={true}
                    >
                        <MenuItem value="1">1 </MenuItem>
                        <MenuItem value="2">2 </MenuItem>
                        <MenuItem value="3">3 </MenuItem>
                    </NsSelect>
                    <NsSelectAutocomplete
                        defaultValue=""
                        errorMessage="The 'Select Autocomplete' field is required"
                        label="Autocomplete Select"
                        name="selectAutocomplete"
                        validate={required}
                        required={true}
                    >
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                    </NsSelectAutocomplete>
                    <NsTextInput
                        label="Check me out!"
                        name="textInput"
                        errorMessage="The 'Text Input' field is required"
                        validate={required}
                        required={true}
                    />
                    <NsTextArea
                        label="Check me out!"
                        name="textArea"
                        errorMessage="The 'Text Area' field is required"
                        validate={required}
                        required={true}
                    />
                    <NsDateCalendar
                        errorMessage="The 'Date Field' field is required"
                        label="Date Field*"
                        name="dateField"
                        required={true}
                        validate={required}
                    />

                    <div>
                        <FormLabel component="legend">Choose your favourite meal</FormLabel>
                        <FormGroup>
                            <NsCheckbox label="Tortellini" labelPlacement="end" />
                            <NsCheckbox label="Lasagne" labelPlacement="end" />
                            <NsCheckbox label="Erbazzone" labelPlacement="end" />
                            <NsCheckbox label="Pizza" labelPlacement="end" />
                        </FormGroup>
                    </div>

                    <div>
                        <FormLabel component="legend">
                            {t('Choose your favourite meal')}
                        </FormLabel>
                        <FormGroup>
                            <NsRadioGroup
                                name="meal"
                                onChange={console.log}
                            >
                                <NsRadio
                                    label="Tortellini"
                                    value="Tortellini"
                                />
                                <NsRadio
                                    label="Lasagne"
                                    value="Lasagne"
                                />
                                <NsRadio
                                    label="Erbazzone"
                                    value="Erbazzone"
                                />
                                <NsRadio
                                    label="Pizza"
                                    value="Pizza"
                                /></NsRadioGroup>
                        </FormGroup>
                    </div>
                    <NsDragDrop
                        buttonStatus
                        displayForm
                        errorMessage="The 'File' field is required"
                        name="uploadFile"
                        onFileLoaded={() => console.log('ciao')}
                        validate={required}
                    />
                    <NsFileUpload
                        displayForm
                        errorMessage="The 'File' field is required"
                        name="fileUpload"
                        onChange={() => console.log('ciao')}
                        validate={required}
                    />
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

export const Form = Template.bind({});
