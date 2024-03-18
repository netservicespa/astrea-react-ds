import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { NsForm } from '../../../../components/components/form/NsForm';
import { NsRadio } from '../../../../components/components/form/fields/NsRadio';
import { FormGroup, FormLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default {
  title: 'Components/Form/Radio',
  component: NsRadio,
} as Meta<typeof NsRadio>;

const Template: StoryFn<typeof NsRadio> = (args) => {
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = React.useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <NsForm onSubmit={() => {}} buttonsSlot={false}>
      <FormLabel component="legend">
        {t('Choose your favourite meal')}
      </FormLabel>
      <FormGroup>
        <NsRadio
          label="Tortellini"
          value="Tortellini"
          checked={selectedValue === 'Tortellini'}
          onChange={handleChange}
        />
        <NsRadio
          label="Lasagne"
          value="Lasagne"
          checked={selectedValue === 'Lasagne'}
          onChange={handleChange}
        />
        <NsRadio
          label="Erbazzone"
          value="Erbazzone"
          checked={selectedValue === 'Erbazzone'}
          onChange={handleChange}
        />
        <NsRadio
          label="Pizza"
          value="Pizza"
          checked={selectedValue === 'Pizza'}
          onChange={handleChange}
        />
      </FormGroup>
    </NsForm>
  );
};
export const Radio = Template.bind({});
