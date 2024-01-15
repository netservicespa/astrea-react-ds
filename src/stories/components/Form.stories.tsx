import { Container, Divider, FormGroup, FormLabel, MenuItem, Typography } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { ValidatedForm } from '../../components/components/form/ValidatedForm';
import { ValidatedTextInput } from '../../components/components/form/fields/ValidatedTextInput';
import { ValidatedTextArea } from '../../components/components/form/fields/ValidatedTextArea';
import { ValidatedDateCalendar } from '../../components/components/form/fields/ValidatedDateCalendar';
import { ValidatedCheckbox } from '../../components/components/form/fields/ValidatedCheckbox';
import { ValidatedSelect } from '../../components/components/form/fields/ValidatedSelect';
import { ValidatedSelectAutocomplete } from '../../components/components/form/fields/ValidatedSelectAutocomplete';
import { ValidatedRadio } from '../../components/components/form/fields/ValidatedRadio';
import { ValidatedDragDrop } from '../../components/components/form/fields/ValidatedDragDrop';
import { ValidatedFileUpload } from '../../components/components/form/fields/ValidatedFileUpload';
import { required } from '../../components/components/form/validators';
import { GridLayout } from '../../components/layout/GridLayout';

export default {
    title: 'Components/Forms',
    component: ValidatedForm,
    parameters: {
        docs: { source: { type: 'code' } },
    },
} as Meta<typeof ValidatedForm>;

interface FormContents {
  textField?: string;
  dateField?: string;
}

/**
 * Bello come il sole
 * @param args
 * @returns
 */
const Template: StoryFn<typeof ValidatedForm> = (args) => {
    const [data, setData] = React.useState<FormContents>({});
    return (
        <>
            <ValidatedForm {...args} onSubmit={(data: any) => setData(data)} onReset={() => setData({})}>
                <GridLayout rowSize={2}>
                    <ValidatedSelect
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
                    </ValidatedSelect>
                    <ValidatedSelectAutocomplete
                        defaultValue=""
                        errorMessage="The 'Select Autocomplete' field is required"
                        label="Autocomplete Select"
                        name="select"
                        validate={required}
                    >
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
												<MenuItem value="3">3</MenuItem>
                    </ValidatedSelectAutocomplete>
                    <ValidatedTextInput label="Check me out!" name="ciaone" />
                    <ValidatedTextArea label="Check me out!" name="ciaone" />
                    <ValidatedDateCalendar
                        errorMessage="The 'Date Field' field is required"
                        label="Date Field*"
                        name="dateField"
                        validate={required}
                        required={true}
                    />

                    <div>
                        <FormLabel component="legend">Choose your favourite meal</FormLabel>
                        <FormGroup>
                            <ValidatedCheckbox label="Tortellini" labelPlacement="end" />
                            <ValidatedCheckbox label="Lasagne" labelPlacement="end" />
                            <ValidatedCheckbox label="Erbazzone" labelPlacement="end" />
                            <ValidatedCheckbox label="Pizza" labelPlacement="end" />
                        </FormGroup>
                    </div>

                    <div>
                        <FormLabel component="legend">Choose your favourite meal</FormLabel>
                        <FormGroup>
                            <ValidatedRadio label="Tortellini" labelPlacement="end" />
                            <ValidatedRadio label="Lasagne" labelPlacement="end" />
                            <ValidatedRadio label="Erbazzone" labelPlacement="end" />
                            <ValidatedRadio label="Pizza" labelPlacement="end" />
                        </FormGroup>
                    </div>
                    <ValidatedDragDrop
                        buttonStatus
                        displayForm
                        errorMessage="The 'File' field is required"
                        name="uploadFile"
                        onFileLoaded={() => console.log('ciao')}
                        validate={required}
                    />
                    <ValidatedFileUpload
                        displayForm
                        errorMessage="The 'File' field is required"
                        name="fileUpload"
                        onChange={() => console.log('ciao')}
                        validate={required}
                    />
                </GridLayout>
            </ValidatedForm>
            <Container maxWidth={false}>
                <Divider sx={{ my: 4 }} />
                <Typography>Form Data:</Typography>
                <Typography component="pre">{JSON.stringify(data, null, 2)}</Typography>
            </Container>
        </>
    );
};

export const Form = Template.bind({});
