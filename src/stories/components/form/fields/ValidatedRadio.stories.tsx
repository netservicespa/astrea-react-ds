import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { ValidatedForm } from '../../../../components/components/form/ValidatedForm';
import { ValidatedRadio } from '../../../../components/components/form/fields/ValidatedRadio';
import { FormGroup, FormLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default {
  title: 'Components/Form/Radio',
  component: ValidatedRadio,
} as Meta<typeof ValidatedRadio>;

const Template: StoryFn<typeof ValidatedRadio> = (args) => {
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = React.useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <ValidatedForm onSubmit={() => {}} buttonsSlot={false}>
      <FormLabel component="legend">{t('Choose your favourite meal')}</FormLabel>
      <FormGroup>
        <ValidatedRadio label="Tortellini" value="Tortellini" checked={selectedValue === "Tortellini"} onChange={handleChange} />
        <ValidatedRadio label="Lasagne" value="Lasagne" checked={selectedValue === "Lasagne"} onChange={handleChange} />
        <ValidatedRadio label="Erbazzone" value="Erbazzone" checked={selectedValue === "Erbazzone"} onChange={handleChange} />
        <ValidatedRadio label="Pizza" value="Pizza" checked={selectedValue === "Pizza"} onChange={handleChange} />
      </FormGroup>
    </ValidatedForm>
  );
};
export const Radio = Template.bind({});
