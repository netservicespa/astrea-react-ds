// NsTable.stories.tsx
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import NsTable, { NsTableProps } from '../../components/components/table/NsTable';
import { TableLibraryColumnWithExport } from '../../components/components/table/table';

type ExampleDataType = {
    id: number;
    frame?: number;
    client?: string;
    type?: string;
    response_frame?: number;
    response_code?: string;
};

const columns: TableLibraryColumnWithExport<any>[] = [
    {
        label: 'Frame',
        renderCell: (item) => (item.frame !== undefined ? item.frame.toString() : '-'),
        resize: true,
        exportField: (item) => (item.frame !== undefined ? item.frame.toString() : '-'),
    },
    {
        label: 'Client',
        renderCell: (item) => (item.client !== undefined ? item.client.toString() : '-'),
        resize: true,
        exportField: (item) => (item.client !== undefined ? item.client.toString() : '-'),
    },
    {
        label: 'Type',
        renderCell: (item) => (item.client !== undefined ? item.client.toString() : '-'),
        resize: true,
        exportField: (item) => (item.client !== undefined ? item.client.toString() : '-'),
    },
    {
        label: 'Response Frame',
        renderCell: (item) => (item.client !== undefined ? item.client.toString() : '-'),
        resize: true,
        exportField: (item) => (item.client !== undefined ? item.client.toString() : '-'),
    },
    {
        label: 'Response Code',
        renderCell: (item) => (item.client !== undefined ? item.client.toString() : '-'),
        resize: true,
        exportField: (item) => (item.client !== undefined ? item.client.toString() : '-'),
    },
    // ... altre definizioni di colonne
];

export default {
  title: 'Components/Table',
  component: NsTable,
  argTypes: {
    onFrameClick: { action: 'onFrameClick' }
  }
} as Meta;

const Template: StoryFn<NsTableProps<ExampleDataType>> = (args) => <NsTable {...args} />;

export const Default = Template.bind({});
Default.args = {
    data: [
        { id: 1, frame: 1, client: '192.168.0.1', type: 'A', response_frame: 2, response_code: 'No Error' },
        { id: 2, frame: 2, client: '192.168.0.2', type: 'MX', response_frame: 3, response_code: 'No Error' },
        { id: 3, frame: 3, client: '192.168.0.2', type: 'MX', response_frame: 3, response_code: 'No Error' },
        { id: 4, frame: 4, client: '192.168.0.2', type: 'MX', response_frame: 3, response_code: 'No Error' },
        { id: 5, frame: 5, client: '192.168.0.2', type: 'MX', response_frame: 3, response_code: 'No Error' },
    ],
    columns: columns
};
