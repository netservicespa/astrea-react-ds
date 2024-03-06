import { Meta } from '@storybook/react';
import React from 'react';
import { StoryFn } from '@storybook/react';
import { NsPagination } from '../../../components/components/pagination/NsPagination';
import { Box } from '@mui/material';

const meta: Meta<typeof NsPagination> = {
  title: 'Components/Pagination',
  component: NsPagination,
  argTypes: {
    paginationType: {
      label: 'Paginator Type',
      control: { type: 'radio' },
      options: ['normal', 'table'],
      defaultValue: 'normal',
    },
    totalPages: {
      label: 'Total Pages',
      type: 'number',
    },
    pageNumber: {
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
  paginationType: 'normal',
  totalPages: 22,
  pageNumber: 5,
  totalElements: 100,
};
