import {Meta} from '@storybook/react';
import React, {useState} from 'react';
import {  StoryFn } from '@storybook/react';
import {PaginationComponent} from "../../../components/components/pagination/Pagination";
import {Box} from "@mui/material";

/**
 *
 * The Pagination component enables users to select a specific page from a range of pages.
 */

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
				if: {
					arg: 'paginationType',
					eq: 'normal',
				},
		},
		totalElements:{
			label: 'Total Elements',
			type: 'number',
			if: {
				arg: 'paginationType',
				eq: 'table',
			},
		}
	},
};

export default meta;



const Template: StoryFn<typeof PaginationComponent> = (args) => {
	return (
		<Box>
			<PaginationComponent
				paginationType={args.paginationType}
				totalPages={args.totalPages}
				totalElements={args.totalElements}
			/>
		</Box>
		);
};

export const PaginationTemplate = Template.bind({});

PaginationTemplate.args = {
	paginationType:'normal',
	totalPages:22,
	totalElements:100
};

