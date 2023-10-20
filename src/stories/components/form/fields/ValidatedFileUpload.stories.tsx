import { Grid } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { ValidatedForm } from '../../../../components/components/form/ValidatedForm';
import {required} from "../../../../components/components/form/validators";
import {useTranslation} from "react-i18next";
import FileUpload from "../../../../components/components/FileUpload";
import ValidatedFileUpload from "../../../../components/components/form/fields/ValidatedFileUpload";

export default {
	title: 'Components/Form/File Upload',
	component: FileUpload,
	argTypes: {},
} as Meta<typeof FileUpload>;

const Template: StoryFn<typeof FileUpload> = (args) => {
	const { t } = useTranslation();
	const [data, setData] = React.useState<any>(undefined);

	const onSubmit = () => {
		console.log("Form Data", data);
	};


	const handleFileChange = (file: File) => {
		setData(file)
		console.log("file :", file);
	};



	return (
		<ValidatedForm onSubmit={onSubmit} onReset={() => setData(undefined)}>
			<Grid container>
				<Grid item xs={3} md={6}>
					<ValidatedFileUpload
						name="fileUpload"
						defaultValue={data}
						onChange={handleFileChange}
						validate={required}
						displayForm={true}
						errorMessage={t('form.errors.required', { field: 'File' })}
					/>
				</Grid>
			</Grid>
		</ValidatedForm>
	);
};


export const FileUploadComponent = Template.bind({});
