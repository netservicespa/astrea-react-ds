import {
  Container,
  Divider,
  FormGroup,
  FormLabel,
  MenuItem,
  Typography,
} from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { NsForm } from '../../components/components/form/NsForm';
import { NsTextInput } from '../../components/components/form/fields/NsTextInput';
import { NsTextArea } from '../../components/components/form/fields/NsTextArea';
import { NsDateCalendar } from '../../components/components/form/fields/NsDateCalendar';
import { NsCheckbox } from '../../components/components/form/fields/NsCheckbox';
import { NsSelect } from '../../components/components/form/fields/NsSelect';
import { NsSelectAutocomplete } from '../../components/components/form/fields/NsSelectAutocomplete';
import { NsRadio } from '../../components/components/form/fields/NsRadio';
import { NsDragDrop } from '../../components/components/form/fields/NsDragDrop';
import { NsFileUpload } from '../../components/components/form/fields/NsFileUpload';
import { required } from '../../components/components/form/validators';
import { NsGridLayout } from '../../components/layout/NsGridLayout';

export default {
  title: 'Components/Forms',
  component: NsForm,
  parameters: {
    docs: { source: { type: 'code' } },
  },
} as Meta<typeof NsForm>;

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
  const [selectedMeal, setSelectedMeal] = React.useState(null);

  const handleRadioChange = (event) => {
    setSelectedMeal(event.target.value);
  };

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
            <FormLabel component="legend">Choose your favourite meal</FormLabel>
            <FormGroup>
              <NsRadio
                label="Tortellini"
                labelPlacement="end"
                onChange={() => {}}
                checked={false}
                value={''}
              />
              <NsRadio
                label="Lasagne"
                labelPlacement="end"
                onChange={() => {}}
                checked={false}
                value={''}
              />
              <NsRadio
                label="Erbazzone"
                labelPlacement="end"
                onChange={() => {}}
                checked={false}
                value={''}
              />
              <NsRadio
                label="Pizza"
                labelPlacement="end"
                onChange={() => {}}
                checked={false}
                value={''}
              />
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
