import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { NsPagination } from 'src/components/components/pagination/NsPagination';
import { Box } from '@mui/material';
import { TablePaginationActions as defaultActions } from 'src/components/components/pagination/NsPaginationActions';

const meta: Meta<typeof NsPagination> = {
    title: 'Components/Pagination',
    component: NsPagination,
    argTypes: {
        paginationType: {
            label: 'Paginator Type',
            control: { type: 'radio' },
            options: ['default', 'table', 'custom'],
            defaultValue: 'normal',
        },
        totalPages: {
            label: 'Total Pages',
            type: 'number',
        },
        page: {
            label: 'Page',
            type: 'number',
        },
        totalElements: {
            label: 'Total Elements',
            type: 'number',
        },
    },
};

export default meta;

const Template: StoryFn<typeof NsPagination> = (args) => {
    const setPageNumber = (index: number) => {
        let after;
        if (index === 1) {
            after = null;
        } else {
            after = args.pageNumber * index;
        }
        args.pageNumber = index;
    };
    return (
        <Box>
            <NsPagination
                paginationType={args.paginationType}
                page={args.page}
                totalPages={args.totalPages}
                totalElements={args.totalElements}
                onChangePage={(page: number) => setPageNumber(page)}
                showLastButton={args.showLastButton}
                showFirstButton={args.showFirstButton}
                TablePaginationAction={args.TablePaginationAction}
                rowsPerPageOptions={args.rowsPerPageOptions}
            />
        </Box>
    );
};

export const PaginationTemplate = Template.bind({});

PaginationTemplate.args = {
    paginationType: 'table',
    totalPages: 22,
    page: 5,
    totalElements: 100,
    showLastButton: true,
    showFirstButton: false,
    TablePaginationAction: defaultActions,
    rowsPerPageOptions: [
        { label: 'Five', value: 5 },
        { label: 'Ten', value: 10 },
        { label: 'Twenty Five', value: 25 },
    ],
};
