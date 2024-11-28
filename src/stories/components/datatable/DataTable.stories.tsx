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
    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },
    },
    argTypes: {
        columns: {
            description: 'An array of column definitions for the grid.',
            control: 'object',
            table: {
                type: {
                    summary: 'ColumnDef<RowType>[]',
                },
                defaultValue: {
                    summary: '[]',
                },
            },
        },
        defaultColumn: {
            description: 'An optional definition to set common defaults for all columns.',
            control: 'object',
            table: {
                type: {
                    summary: 'Partial<ColumnDef<RowType>>',
                },
                defaultValue: {
                    summary: '{}',
                },
            },
        },
        eventListener: {
            description: 'Callback to handle table events.',
            control: 'function',
            table: {
                type: {
                    summary: 'NsDataGridEventHandler<RowType, FilterType>',
                },
                defaultValue: {
                    summary: '() => {}',
                },
            },
        },
        PagerComponent: {
            description: 'Optional component to render a custom pager.',
            control: 'elementType',
            table: {
                type: {
                    summary: 'React.ComponentType<NsTablePagerProps<RowType>>',
                },
                defaultValue: {
                    summary: 'NsTablePager',
                },
            },
        },
        FilterContainer: {
            description: 'Optional component to render the filter container.',
            control: 'elementType',
            table: {
                type: {
                    summary: 'React.ComponentType<FilterContainerProps<FilterType>>',
                },
                defaultValue: {
                    summary: 'null',
                },
            },
        },
        options: {
            description: 'Optional configuration options for the grid.',
            control: 'object',
            table: {
                type: {
                    summary: 'NsDataGridOptions<RowType>',
                },
                defaultValue: {
                    summary: '{}',
                },
            },
        },
        render: {
            description: 'Optional render function to customize the layout of the grid.',
            control: 'function',
            table: {
                type: {
                    summary: 'NsDataGridRenderFn',
                },
                defaultValue: {
                    summary: 'DefaultRenderer',
                },
            },
        },
        debug: {
            description: 'Enable debug mode for the grid.',
            control: 'boolean',
            table: {
                type: {
                    summary: 'boolean',
                },
                defaultValue: {
                    summary: 'false',
                },
            },
        },
        children: {
            description: 'React children to be rendered inside the grid container.',
            control: 'node',
            table: {
                type: {
                    summary: 'React.ReactNode',
                },
                defaultValue: {
                    summary: 'null',
                },
            },
        },
        fetcher: {
            description: 'A function that fetches data for the grid (for server-side rendering).',
            control: 'function',
            table: {
                type: {
                    summary: 'DataFetcher<RowType, FilterType>',
                },
                defaultValue: {
                    summary: 'undefined',
                },
            },
        },
        type: {
            description: 'Determines if the grid uses client-side or server-side data fetching.',
            control: 'select',
            options: ['client', 'server'],
            table: {
                type: {
                    summary: '"client" | "server"',
                },
                defaultValue: {
                    summary: '"client"',
                },
            },
        },
        data: {
            description: 'The data to be displayed in the grid (for client-side rendering).',
            control: 'object',
            table: {
                type: {
                    summary: 'RowType[]',
                },
                defaultValue: {
                    summary: '[]',
                },
            },
        },
    },
};

export default meta;

type PersonFilters = Partial<{
    firstName: string;
    lastName: string;
    age: number;
    status: string;
}>;

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
const MagicFilterContainer = ({ activeFilters, onFilterChange }: FilterContainerProps<PersonFilters>) => {
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
};

const TemplateServer: StoryFn<typeof NsDataGrid> = (args) => {
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
                meta: { hide: true }
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
            ).then((result) => {
                // Check if there's data and select the first row
                if (result.data.length > 0) {
                    setSelectedRows({ [result.data[0].id]: result.data[0] });
                }

                return {
                    // Return the fetched data in the proper format
                    data: result.data,
                    totalItems: result.totalItems,
                    totalPages: result.totalPages,
                    pageSize: result.pageSize,
                    currentPage: result.currentPage,
                } as PagedData<Person>;
            }),
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
        selectedRow: selectedRows,
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

    return (
        <NsDataGrid
            type="server"
            columns={columns}
            defaultColumn={defaultColumn}
            // NsTablePager is the default pager component and can be omitted, but you can provide your own
            PagerComponent={NsTablePager}
            onRowSelectionChange={setSelectedRows}
            FilterContainer={args.FilterContainer}
            fetcher={fetcher}
            eventListener={customtableEventListener}
            options={gridOptions}
            render={args.render}
        >
            {args.children}
        </NsDataGrid>
    );
};

const TemplateClient: StoryFn<typeof NsDataGrid> = (args) => {
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
        // Quando i dati sono pronti, seleziona la prima riga
        if (data.length > 0) {
            setSelectedRows({ [data[0].id]: data[0] });
        }
    }, [data]);

    // Additional customizations and optional features
    const gridOptions: NsDataGridOptions<Person> = {
        resizable: true,
        sortable: true,
        rowSelection: 'single',
        customRowIdMapper: (row) => row.id,
        bodyTextAlign: 'right',
        headerJustifyContent: 'flex-start',
    };

    return (
        <NsDataGrid
            type="client"
            columns={columns}
            defaultColumn={defaultColumn}
            onRowSelectionChange={setSelectedRows}
            PagerComponent={NsTablePager}
            data={data}
            options={gridOptions}
        >
            {args.children}
        </NsDataGrid>
    );
};

export const ServerDataGrid = TemplateServer.bind({});
ServerDataGrid.args = {};

export const ServerDataGridCustomLayout = TemplateServer.bind({});
ServerDataGridCustomLayout.args = {
    children: <CustomHeader />,
    FilterContainer: MagicFilterContainer,
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
ClientDataGrid.args = {
    children: <CustomHeader />,
};
