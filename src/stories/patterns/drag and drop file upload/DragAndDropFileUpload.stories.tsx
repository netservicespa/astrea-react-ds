import {Grid, Typography} from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import {useTranslation} from "react-i18next";
import {DragDrop} from "../../../components/components/DragDrop";

/**
 * The DragDrop component allows users to select and upload files easily through a drag-and-drop interface.
 *
 */
export default {
	title: 'Patterns/Drag and Drop File Upload',
	component: DragDrop,
} as Meta<typeof DragDrop>;

const Template: StoryFn<typeof DragDrop> = (args) => {
	const { t } = useTranslation();
	const [files, setFiles] = React.useState<any[]>([]);

	return (
			<Grid container>
				<Grid item xs={3} md={6}>
					<Typography component="h1" variant="h1" margin={3} padding={0}> Upload a File</Typography>
					<DragDrop
						value={files}
						onChange={setFiles}
						displayForm={true}
						multiple={args.multiple}
						loadText={args.loadText?args.loadText:'Uploaded Files:'}
					/>
				</Grid>
			</Grid>
	);
};

export const DragDropComponent = Template.bind({});
