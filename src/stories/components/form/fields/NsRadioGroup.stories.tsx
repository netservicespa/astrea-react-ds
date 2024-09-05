import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { NsForm } from 'src/components/components/form/NsForm';
import { FormGroup, FormLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { NsRadio, NsRadioGroup } from '../../../../components/components/form/fields/NsRadioGroup';
import Typography from '@mui/material/Typography';

const meta: Meta<typeof NsRadioGroup> = {
    title: 'Components/Form/RadioGroup',
    component: NsRadioGroup,
};

export default meta;

const Template: StoryFn<typeof NsRadioGroup> = () => {
    const { t } = useTranslation();
    const [selectedValue, setSelectedValue] = React.useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    return (
        <>
            <NsForm onSubmit={(data: { meal: string }) => {
                setSelectedValue(data.meal);
            }} buttonsSlot={false}>
                <FormLabel component="legend">
                    {t('Choose your favourite meal')}
                </FormLabel>
                <FormGroup>
                    <NsRadioGroup
                        name="meal"
                        onChange={handleChange}
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
            </NsForm>
            <Typography>You chose: {selectedValue}</Typography>
        </>
    );
};

export const Radio: unknown = Template.bind({});
