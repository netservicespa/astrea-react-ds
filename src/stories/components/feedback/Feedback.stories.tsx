import React from 'react';
import {Meta, StoryFn } from '@storybook/react';
import Feedback from "../../../components/components/feedback/Feedback";

import {Button, Container, Divider} from "@mui/material";


export default {
	title: 'Components/Feedback',
	component: Feedback,
	argTypes: {
		severity: {
				label: 'Notification Type',
				control: { type: 'radio' },
				options: ["error","warning","info","success"],
			},
		message: {
				type: 'string',
			},
		submessage: {
			type: 'string',
		},
		autoHideDuration: {
			type: 'number',
		},
		openNotifier: {
			type: 'boolean',
		}
		},
} as Meta<typeof Feedback>;


const Template: StoryFn<typeof Feedback> = (args) => {
	const [open, setIsOpen] = React.useState(args.openNotifier);
	function onCloseSnack() {
		setIsOpen(false);
	}
	return (
		<>
			<Container maxWidth={false}>
				<Divider sx={{ my: 4 }} />
				Clicca il pulsante per mostrare la notifica.
				<Button  style={{marginLeft:'30%',marginTop:'3%',width:'40%'}} variant="outlined" onClick={()=>{setIsOpen(true)}}>
					Invia Notifica
				</Button>
				<Feedback openNotifier={open} onCloseSnack={onCloseSnack} message={args.message} submessage={args.submessage} severity={args.severity} autoHideDuration={args.autoHideDuration} />

			</Container>
		</>
	);
};

export const FeedbackComponent = Template.bind({});

FeedbackComponent.args = {
	severity:"success",
	message:'This is a success message!',
	submessage:'This is text to show more information',
	autoHideDuration:4000,
	openNotifier:false,
};
