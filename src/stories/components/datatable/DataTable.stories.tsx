import { Box, Button as NsButton, Paper, Stack } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import { CellContext, ColumnDef, createColumnHelper, PaginationState } from '@tanstack/react-table';
import React, { useEffect, useMemo } from 'react';
import { NsDataGridOptions } from 'src/components/components/datatable/NsDataGridBase';
import { ColumnSorting, PagedData } from 'src/components/components/datatable/NsDataGridServer';
import { NsDataGrid } from 'src/components/components/datatable/NsDataGrid';

import {
    FilterContainerProps,
    FilterFieldDefinition,
    NsDynamicFilterForm,
} from 'src/components/components/datatable/filtering/FilterContainer';
import { NsTablePager } from 'src/components/components/datatable/pagination/NsTablePager';
import { makeData, Person } from './makeData';
import { mockPersonService } from './mockService';
import {
    NsDataGridEventHandler,
    NsDataGridEventType,
} from 'src/components/components/datatable/events/NsDataGridEvents';
import Typography from '@mui/material/Typography';

const meta: Meta<typeof NsDataGrid> = {
    title: 'Components/DataGrid',
    component: NsDataGrid,
};

export default meta;

type PersonFilters = Partial<{
    firstName: string;
    lastName: string;
    age: number;
    status: string;
}>;

const TemplateServer: StoryFn<typeof NsDataGrid> = ({ render }) => {
    // Here we use @tanstack/react-table's createColumnHelper to create a column helper
    // It is also possible to create the column definitions manually, but this is a more type-safe way.
    const columnHelper = createColumnHelper<Person>();

    // Define columns
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const columns = React.useMemo<ColumnDef<Person, any>[]>(
        () => [
            columnHelper.accessor('firstName', { header: 'First Name' }),
            columnHelper.accessor('lastName', { header: 'Last Name' }),
            columnHelper.accessor('age', { header: 'Age' }),
            columnHelper.accessor('visits', { header: 'Visits' }),
            // If you want to customize the cell rendering, you can provide a cell function
            // This way you can format the data for display, but still use the raw value for sorting and filtering
            columnHelper.accessor('status', {
                header: 'Status',
                cell: (props: CellContext<Person, string>) => (props.getValue() as string).toUpperCase(),
            }),
            columnHelper.accessor('progress', {
                header: 'Profile Progress',
                cell: (props: CellContext<Person, number>) => `${props.getValue()}%`,
            }),
        ],
        [],
    );

    // Define a default column configuration, e.g. to set a maximum width for all columns
    const defaultColumn = React.useMemo<Partial<ColumnDef<Person, any>>>(
        () => ({
            minSize: 100,
            maxSize: 200,
        }),
        [],
    );

    // Define a fetcher function that fetches data from a mock service
    const fetcher = React.useCallback(
        (pagination: PaginationState, sorting?: ColumnSorting<Person>, filters?: PersonFilters) =>
            mockPersonService(
                pagination.pageSize,
                pagination.pageIndex,
                sorting
                    ? Object.entries(sorting).map(([field, direction]) => ({
                        field: field as keyof Person,
                        direction: direction as 'asc' | 'desc',
                    }))
                    : [],
                filters,
            ).then(
                (result) =>
                    ({
                        // here everything has the same name, but in a real-world scenario,
                        // you may have to remap the data
                        data: result.data,
                        totalItems: result.totalItems,
                        totalPages: result.totalPages,
                        pageSize: result.pageSize,
                        currentPage: result.currentPage,
                    }) as PagedData<Person>,
            ),
        [],
    );

    const [selectedRows, setSelectedRows] = React.useState<Record<string, Person>>({});

    useEffect(() => {
        console.log('Selected rows:', selectedRows);
    }, [selectedRows]);

    // Additional customizations and optional features
    const gridOptions: NsDataGridOptions<Person> = {
        resizable: true,
        sortable: true,
        rowSelection: 'single',
        customRowIdMapper: (row) => row.id,
        pagination: { rowsPerPageOptions: [5, 10] },
    };

    const customtableEventListener: NsDataGridEventHandler<Person, PersonFilters> = React.useCallback((event) => {
        switch (event.type) {
        case NsDataGridEventType.FILTER_CHANGE:
            console.log('Filter change:', event.payload);
            break;
        case NsDataGridEventType.SORT_CHANGE:
            console.log('Sort change:', event.payload);
            break;
        case NsDataGridEventType.SELECTION_CHANGE:
            console.log('Selection change:', event.payload);
            break;
        default:
            console.error('Unknown event type:', event.type);
            break;
        }
    }, []);

    const CustomHeader = () => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 2,
                    paddingBottom: '30px',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100% !important' }}>
                    <Typography variant="h4">Titolo</Typography>
                    <NsButton variant="contained" color="primary">
                        Button
                    </NsButton>
                </Box>
                <Typography variant="body1">This is a small paragraph under the title.</Typography>
            </Box>
        );
    };

    return (
        <NsDataGrid
            type="server"
            debug // Enable debug logging
            columns={columns}
            defaultColumn={defaultColumn}
            // NsTablePager is the default pager component and can be omitted, but you can provide your own
            PagerComponent={NsTablePager}
            FilterContainer={MagicFilterContainer}
            fetcher={fetcher}
            eventListener={customtableEventListener}
            options={gridOptions}
            render={render}
        >
            {CustomHeader()}
        </NsDataGrid>
    );
};

const TemplateClient: StoryFn<typeof NsDataGrid> = () => {
    // Here we use @tanstack/react-table's createColumnHelper to create a column helper
    // It is also possible to create the column definitions manually, but this is a more type-safe way.
    const columnHelper = createColumnHelper<Person>();

    // Define columns
    const columns = React.useMemo<ColumnDef<Person, any>[]>(
        () => [
            columnHelper.accessor('firstName', { header: 'First Name' }),
            columnHelper.accessor('lastName', { header: 'Last Name' }),
            columnHelper.accessor('age', { header: 'Age' }),
            columnHelper.accessor('visits', { header: 'Visits' }),
            // If you want to customize the cell rendering, you can provide a cell function
            // This way you can format the data for display, but still use the raw value for sorting and filtering
            columnHelper.accessor('status', {
                header: 'Status',
                cell: (props) => (props.getValue() as string).toUpperCase(),
            }),
            columnHelper.accessor('progress', {
                header: 'Profile Progress',
                cell: (props) => `${props.getValue()}%`,
            }),
        ],
        [],
    );

    // Define a default column configuration, e.g. to set a maximum width for all columns
    const defaultColumn = React.useMemo<Partial<ColumnDef<Person, any>>>(
        () => ({
            minSize: 100,
            maxSize: 200,
        }),
        [],
    );

    // Generate dataset for the grid
    const data = useMemo(() => makeData(200), []);

    const [selectedRows, setSelectedRows] = React.useState<Record<string, Person>>({});

    useEffect(() => {
        console.log('Selected rows:', selectedRows);
    }, [selectedRows]);

    // Additional customizations and optional features
    const gridOptions: NsDataGridOptions<Person> = {
        resizable: true,
        sortable: true,
        rowSelection: 'single',
        customRowIdMapper: (row) => row.id,
    };
    const CustomHeader = () => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 2,
                    paddingBottom: '30px',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100% !important' }}>
                    <Typography variant="h4">Titolo</Typography>
                    <NsButton variant="contained" color="primary">
                        Bottone
                    </NsButton>
                </Box>
                <Typography variant="body1">Questo è un piccolo paragrafo sotto il titolo.</Typography>
            </Box>
        );
    };
    return (
        <NsDataGrid
            type="client"
            debug // Enable debug logging
            columns={columns}
            defaultColumn={defaultColumn}
            onRowSelectionChange={setSelectedRows}
            // NsTablePager is the default pager component and can be omitted, but you can provide your own
            PagerComponent={NsTablePager}
            FilterContainer={MagicFilterContainer}
            data={data}
            options={gridOptions}
        >
            {CustomHeader()}
        </NsDataGrid>
    );
};

function MagicFilterContainer({ activeFilters, onFilterChange }: FilterContainerProps<PersonFilters>) {
    const filterDefs: FilterFieldDefinition<PersonFilters>[] = React.useMemo(
        () => [
            {
                key: 'firstName',
                label: 'First Name',
                type: 'text',
            },
            {
                key: 'lastName',
                label: 'Last Name',
                type: 'text',
            },
            {
                key: 'age',
                label: 'Age',
                type: 'number',
            },
            {
                key: 'status',
                label: 'Status',
                type: 'select',
                options: [
                    { label: 'Complicated', value: 'complicated' },
                    { label: 'Single', value: 'single' },
                    { label: 'Relationship', value: 'relationship' },
                ],
            },
        ],
        [],
    );
    return (
        <Paper>
            <NsDynamicFilterForm activeFilters={activeFilters} onFilterChange={onFilterChange} fieldDefs={filterDefs} />
        </Paper>
    );
}

export const ServerDataGrid = TemplateServer.bind({});
export const ServerDataGridCustomLayout = TemplateServer.bind({});
ServerDataGridCustomLayout.args = {
    render: (
        FilterContainer: React.ReactElement,
        Table: React.ReactElement,
        Pager: React.ReactElement,
        children?: React.ReactElement,
    ) => (
        <Box>
            <Typography my={2} variant="h2">
                Custom layout
            </Typography>
            <Box p={2} border={1}>
                <Typography variant="h3">Filters</Typography> {FilterContainer}
            </Box>
            <Stack mt={2}>
                {children}
                {Table}
                {Pager}
            </Stack>
        </Box>
    ),
};
export const ClientDataGrid = TemplateClient.bind({});
