import { Box, Button as NsButton, Stack } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import { CellContext, ColumnDef, createColumnHelper, PaginationState } from '@tanstack/react-table';
import React from 'react';
import { NsDataGrid } from '@/components/components/datatable/NsDataGrid';
import { NsDataGridOptions } from '@/components/components/datatable/NsDataGridBase';
import { ColumnSorting, PagedData } from '@/components/components/datatable/legacy/NsDataGridServer';

import Typography from '@mui/material/Typography';
import {
    NsDataGridEventHandler,
    NsDataGridEventType,
} from '@/components/components/datatable/events/NsDataGridEvents';
import { FilterContainerProps } from '@/components/components/datatable/filtering/FilterContainer';
import { NsTablePager } from '@/components/components/datatable/pagination/NsTablePager';
import { NsForm } from '@/components/components/form/NsForm';
import { NsNumberInput } from '@/components/components/form/fields/NsNumberInput';
import { NsTextInput } from '@/components/components/form/fields/NsTextInput';
import { makeData, Person } from './makeData';
import { mockPersonService } from './mockService';

import { NsSelectAutocomplete, SelectItem } from '@/components/components/form/fields/NsSelectAutocomplete';
import { NsGridLayout } from '@/components/layout/NsGridLayout';
import { DataGridDefaultRenderer } from '@/components/components/datatable/legacy/NsDataGridLegacy';

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
            control: 'object',
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
            control: 'object',
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
            control: 'object',
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
            control: 'object',
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
            control: 'object',
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
            control: 'object',
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
                <Typography variant="h4">Title</Typography>
                <NsButton variant="contained" color="primary">
                    Button
                </NsButton>
            </Box>
            <Typography variant="body1">This is a small paragraph under the title.</Typography>
        </Box>
    );
};

const FilterContainer = ({ activeFilters, onFilterChange }: FilterContainerProps<PersonFilters>) => {
    return (
        <NsForm
            onSubmit={(data: Partial<PersonFilters>) =>
                onFilterChange({ ...data, status: (data?.status as unknown as SelectItem)?.value })
            }
        >
            <NsGridLayout rowSize={2}>
                <NsTextInput label="First Name" name="firstName" defaultValue={activeFilters.firstName} />
                <NsTextInput label="Last Name" name="lastName" defaultValue={activeFilters.lastName} />
                <NsNumberInput label="Age" name="age" defaultValue={activeFilters.age} />
                <NsSelectAutocomplete
                    label="Status"
                    name="status"
                    defaultValue={activeFilters.status}
                    options={[
                        { label: 'Complicated', value: 'complicated' },
                        { label: 'Single', value: 'single' },
                        { label: 'Relationship', value: 'relationship' },
                    ]}
                />
            </NsGridLayout>
        </NsForm>
    );
};

// Here we use @tanstack/react-table's createColumnHelper to create a column helper
// It is also possible to create the column definitions manually, but this is a more type-safe way.
const columnHelper = createColumnHelper<Person>();

// Define columns
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: ColumnDef<Person, any>[] = [
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
        meta: { hide: true },
    }),
];

// Define a default column configuration, e.g. to set a maximum width for all columns
const defaultColumn: Partial<ColumnDef<Person, any>> = {
    minSize: 100,
    maxSize: 200,
};

// Additional customizations and optional features
const gridOptions: NsDataGridOptions<Person> = {
    resizable: true,
    sortable: true,
    rowSelection: 'single',
    customRowIdMapper: (row) => row.id,
    pagination: { rowsPerPageOptions: [5, 10] },
    defaultFilters: {},
};

const TemplateFetcher: StoryFn<typeof NsDataGrid> = (args) => {
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
            columns={columns}
            defaultColumn={defaultColumn}
            // NsTablePager is the default pager component and can be omitted, but you can provide your own
            PagerComponent={NsTablePager}
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

const TemplateFetcherClient: StoryFn<typeof NsDataGrid> = (args) => {
    const data = React.useMemo(() => makeData(200), []);

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

    const fetcher = React.useCallback(
        (pagination: PaginationState, sorting?: ColumnSorting<Person>, filters?: PersonFilters) => {
            let filteredData = data;
            if (filters?.age) {
                console.log('Filtering by age:', filters, filteredData);
                filteredData = filteredData.filter((item) => item.age == filters.age);
            }
            if (filters?.firstName) {
                filteredData = filteredData.filter((item) =>
                    item.firstName.toLowerCase().includes(filters.firstName!.toLowerCase()),
                );
            }
            if (filters?.lastName) {
                filteredData = filteredData.filter((item) =>
                    item.lastName.toLowerCase().includes(filters.lastName!.toLowerCase()),
                );
            }
            if (filters?.status) {
                filteredData = filteredData.filter((item) => item.status === filters.status);
            }
            if (sorting) {
                const entries = Object.entries(sorting);
                if (entries.length > 0) {
                    const [field, direction] = entries[0];
                    filteredData = [...filteredData].sort((a, b) => {
                        const aVal = a[field as keyof Person];
                        const bVal = b[field as keyof Person];
                        if (aVal !== undefined && bVal !== undefined) {
                            if (aVal < bVal) {
                                return direction === 'asc' ? -1 : 1;
                            }
                            if (aVal > bVal) {
                                return direction === 'asc' ? 1 : -1;
                            }
                        }
                        return 0;
                    });
                }
            }
            return Promise.resolve({
                data: filteredData.slice(
                    pagination.pageIndex * pagination.pageSize,
                    (pagination.pageIndex + 1) * pagination.pageSize,
                ),
                totalItems: filteredData.length,
                totalPages: Math.ceil(filteredData.length / pagination.pageSize),
                pageSize: pagination.pageSize,
                currentPage: pagination.pageIndex,
            } as PagedData<Person>);
        },
        [data],
    );

    return (
        <NsDataGrid
            fetcher={fetcher}
            columns={columns}
            defaultColumn={defaultColumn}
            // NsTablePager is the default pager component and can be omitted, but you can provide your own
            PagerComponent={NsTablePager}
            FilterContainer={args.FilterContainer}
            eventListener={customtableEventListener}
            options={gridOptions}
            render={args.render}
        >
            {args.children}
        </NsDataGrid>
    );
};
// const TemplateClient: StoryFn<typeof NsDataGrid> = (args) => {
//     // Here we use @tanstack/react-table's createColumnHelper to create a column helper
//     // It is also possible to create the column definitions manually, but this is a more type-safe way.
//     const columnHelper = createColumnHelper<Person>();

//     // Define columns
//     const columns = React.useMemo<ColumnDef<Person, any>[]>(
//         () => [
//             columnHelper.accessor('firstName', { header: 'First Name', enableHiding: false }),
//             columnHelper.accessor('lastName', { header: 'Last Name', enableHiding: false }),
//             columnHelper.accessor('age', { header: 'Age' }),
//             columnHelper.accessor('visits', { header: 'Visits' }),
//             // If you want to customize the cell rendering, you can provide a cell function
//             // This way you can format the data for display, but still use the raw value for sorting and filtering
//             columnHelper.accessor('status', {
//                 header: 'Status',
//                 cell: (props) => (props.getValue() as string).toUpperCase(),
//             }),
//             columnHelper.accessor('progress', {
//                 header: 'Profile Progress',
//                 cell: (props) => `${props.getValue()}%`,
//             }),
//         ],
//         [],
//     );

//     // Define a default column configuration, e.g. to set a maximum width for all columns
//     const defaultColumn = React.useMemo<Partial<ColumnDef<Person, any>>>(
//         () => ({
//             minSize: 100,
//             maxSize: 200,
//         }),
//         [],
//     );

//     // Generate dataset for the grid
//     const data = useMemo(() => makeData(200), []);

//     // Additional customizations and optional features
//     const gridOptions: NsDataGridOptions<Person> = {
//         resizable: true,
//         sortable: true,
//         rowSelection: 'single',
//         customRowIdMapper: (row) => row.id,
//         bodyTextAlign: 'right',
//         headerJustifyContent: 'flex-start',
//     };

//     return (
//         <NsDataGrid
//             type="client"
//             columns={columns}
//             defaultColumn={defaultColumn}
//             FilterContainer={FilterContainer}
//             PagerComponent={NsTablePager}
//             data={data}
//             options={gridOptions}
//         >
//             {args.children}
//         </NsDataGrid>
//     );
// };

export const ServerDataGrid = TemplateFetcher.bind({});
ServerDataGrid.args = {};

export const ServerDataGridCustomLayout = TemplateFetcher.bind({});
ServerDataGridCustomLayout.args = {
    children: <CustomHeader />,
    FilterContainer: FilterContainer,
    render: (
        FilterContainer: React.ReactElement,
        Table: React.ReactElement,
        Pager: React.ReactElement,
        children?: React.ReactElement,
    ) => (
        <Box>
            <Typography
                variant="h2"
                sx={{
                    my: 2,
                }}
            >
                Custom layout
            </Typography>
            <Box
                sx={{
                    p: 2,
                    border: 1,
                }}
            >
                <Typography variant="h3">Filters</Typography> {FilterContainer}
            </Box>
            <Stack
                sx={{
                    mt: 2,
                }}
            >
                {children}
                {Table}
                {Pager}
            </Stack>
        </Box>
    ),
};

export const ClientDataGrid = TemplateFetcherClient.bind({});
ClientDataGrid.args = {
    children: <CustomHeader />,
    FilterContainer: FilterContainer,
};
