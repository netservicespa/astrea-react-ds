import {Meta} from '@storybook/react';
import React from 'react';
import {  StoryFn } from '@storybook/react';
import {PaginationComponent} from "../../../components/components/pagination/Pagination";
import {Box} from "@mui/material";


const meta: Meta<typeof PaginationComponent> = {
	title: 'Components/Pagination',
	component: PaginationComponent,
	argTypes:{
		paginationType: {
			label: 'Paginator Type',
			control: { type: 'radio' },
			options: ['normal', 'table'],
			defaultValue:'normal'
		},
		totalPages: {
			label: 'Total Pages',
			type: 'number',
		},
		pageNumber: {
			label: 'Page',
			type: 'number',
		},
		totalElements:{
			label: 'Total Elements',
			type: 'number',
		}
	},
};

export default meta;



const Template: StoryFn<typeof PaginationComponent> = (args) => {
	const setPageNumber = (index: number) => {
		let after;
		if (index === 1) {
			after = null;
		} else {
			after = args.pageNumber * index;
		}
		args.pageNumber=index;
	};
	return (
		<Box>
			<PaginationComponent
				paginationType={args.paginationType}
				page={args.pageNumber}
				totalPages={args.totalPages}
				totalElements={args.totalElements}
				onChangePage={(page: number) => setPageNumber(page)}
			/>
		</Box>
		);
};

export const PaginationTemplate = Template.bind({});

PaginationTemplate.args = {
	paginationType:'normal',
	totalPages:22,
	pageNumber:5,
	totalElements:100
};

