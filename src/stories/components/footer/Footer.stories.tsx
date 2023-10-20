import React from 'react';
import {Meta,StoryObj} from '@storybook/react';
import {Footer} from "../../../components/components/footer/Footer";


/**
 * Dynamic Footer  Stories
 * @author vadim.chilinciuc
 */


const meta: Meta<typeof Footer> = {
	title: 'Patterns/Footer',
	component: Footer,
};



export const IFooterSimple: Story = {
	args: {
		type: 'simple',
		logoPath: '../../images/u11.png',
		links: [
			{ href: '#', text: 'Accessibility' },
			{ href: '#', text: 'Sitemap' },
			{ href: '#', text: 'Cookies' },
			{ href: '#', text: 'Privacy' },
		],
		columns: [
			{
				title: 'Column 1',
				links: [
					{ href: '#', text: 'Navigation item 1' },
					{ href: '#', text: 'Navigation item 2' },
					{ href: '#', text: 'Navigation item 3' },
					{ href: '#', text: 'Navigation item 4' },
				],
			},
			{
				title: 'Column 2',
				links: [
					{ href: '#', text: 'Navigation item 1' },
					{ href: '#', text: 'Navigation item 2' },
					{ href: '#', text: 'Navigation item 3' },
				],
			},
		],
		rowSize: 3,
	},
	argTypes: {
		columns: {
			if: {
				arg: 'type',
				eq: 'multiColumn',
			},
			control: { type: 'array' },
		},
		rowSize: {
			if: {
				arg: 'type',
				eq: 'multiColumn',
			},
			control: { type: 'number' },
		},
		links: {
			if: {
				arg: 'type',
				eq: 'simple',
			},
			control: { type: 'array' },
		},
	},
};


export const IFooterMultiColumn: Story = {
	args: {
		type: 'multiColumn',
		logoPath: '../../images/u11.png',
		links: [
			{ href: '#', text: 'Accessibility' },
			{ href: '#', text: 'Sitemap' },
			{ href: '#', text: 'Cookies' },
			{ href: '#', text: 'Privacy' },
		],
		columns: [
			{
				title: 'Column 1',
				links: [
					{ href: '#', text: 'Navigation item 1' },
					{ href: '#', text: 'Navigation item 2' },
					{ href: '#', text: 'Navigation item 3' },
					{ href: '#', text: 'Navigation item 4' },
				],
			},
			{
				title: 'Column 2',
				links: [
					{ href: '#', text: 'Navigation item 1' },
					{ href: '#', text: 'Navigation item 2' },
					{ href: '#', text: 'Navigation item 3' },
				],
			},
		],
		rowSize: 3,
	},
	argTypes: {
		columns: {
			if: {
				arg: 'type',
				eq: 'multiColumn',
			},
			control: { type: 'array' },
		},
		rowSize: {
			if: {
				arg: 'type',
				eq: 'multiColumn',
			},
			control: { type: 'number' },
		},
		links: {
			if: {
				arg: 'type',
				eq: 'simple',
			},
			control: { type: 'array' },
		},
	},
}


export default meta;
type Story = StoryObj<typeof Footer>;


