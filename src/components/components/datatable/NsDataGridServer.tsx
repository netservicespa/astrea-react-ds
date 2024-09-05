import React from 'react';

import { Paper } from '@mui/material';
import { border, Box, Container } from '@mui/system';
import {
    PaginationState,
    RowSelectionState,
    SortingState,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { NsDataGridCommonProps, NsDataGridRenderFn } from './NsDataGrid';
import { NsDataGridBase } from './NsDataGridBase';
import { TableFilters } from './filtering/FilterContainer';
import { NsTablePager } from './pagination/NsTablePager';
import { NsDataGridEventType } from './events/NsDataGridEvents';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_INDEX = 0;

/**
 * Represents a paged data structure.
 *
 * @template T - The type of the data items.
 */
export interface PagedData<T> {
    /** The data items for the current page. */
    data: T[];
    /** The total number of items. */
    totalItems: number;
    /** The total number of pages. */
    totalPages: number;
    /** The page size. */
    pageSize: number;
    /** The current page index. */
    currentPage: number;
}

export interface NsDataGridServerProps<RowType extends object, FilterType extends object>
    extends NsDataGridCommonProps<RowType, FilterType> {
    type: 'server';
    /**
     * A function that fetches data for the grid.
     * It takes a `PaginationState` object as a parameter and returns a `Promise` that resolves to a `PagedData` object.
     */
    fetcher: DataFetcher<RowType, FilterType>;
}

/**
 * Represents a column sorting state.
 *
 * @template T - The type of the data items.
 */
export type ColumnSorting<T extends object> = Partial<Record<keyof T, 'asc' | 'desc' | undefined>>;

/**
 * Represents a function that fetches data for a data grid.
 * @template T The type of the data items in the grid.
 * @param pagination The current pagination state of the grid.
 * @param sorting The current sorting state of the grid (optional).
 * @param filters The current filter state of the grid (optional).
 * @returns A promise that resolves to the fetched data.
 */
export type DataFetcher<RowType extends object, FilterType> = (
    pagination: PaginationState,
    sorting?: ColumnSorting<RowType>,
    filters?: TableFilters<FilterType>,
) => Promise<PagedData<RowType>>;

/**
 * A data grid component that fetches data from a server,
 * using the @tanstack/react-table library for managing the grid.
 *
 * It supports server-side pagination and sorting and column resizing.
 */
export function NsDataGridServer<RowType extends object, FilterType extends object>({
    fetcher,
    columns,
    defaultColumn,
    PagerComponent = NsTablePager,
    FilterContainer,
    eventListener = () => {},
    options = {},
    render = DefaultRenderer,
    debug = false,
    // Mui TableContainer props
    sx,
    component = Paper,
    children,
}: Readonly<NsDataGridServerProps<RowType, FilterType>>) {
    // Track paginations state
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: DEFAULT_PAGE_INDEX,
        pageSize: DEFAULT_PAGE_SIZE,
    });

    // Current page
    const [page, setPage] = React.useState<PagedData<RowType>>({
        data: [],
        totalItems: 0,
        totalPages: 0,
        pageSize: DEFAULT_PAGE_SIZE,
        currentPage: DEFAULT_PAGE_INDEX,
    });

    // Current sorting state
    const [sorting, setSorting] = React.useState<SortingState>([]);

    // Active filters
    const [filters, setFilters] = React.useState<TableFilters<FilterType>>({});

    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

    // Notify event listener of filter change
    React.useEffect(() => {
        eventListener({
            type: NsDataGridEventType.FILTER_CHANGE,
            payload: filters,
        });
    }, [filters]);

    // Notify event listener of sorting change
    React.useEffect(() => {
        // Convert sorting state to a map
        const mySorting = Object.fromEntries(
            sorting.map((sort) => [sort.id, sort.desc ? 'desc' : 'asc']),
        ) as ColumnSorting<RowType>;
        eventListener({
            type: NsDataGridEventType.SORT_CHANGE,
            payload: mySorting,
        });
    }, [sorting]);

    // Notify event listener of row selection change
    React.useEffect(() => {
        // Convert the row selection state to a list of selected row IDs
        const keys = Object.entries(rowSelection)
            .filter(([, value]) => value === true)
            .map(([key]) => key);
        if (options.customRowIdMapper) {
            // Map the selected rows to the actual data
            // using the user-provided custom row ID mapper
            const selectedRows = keys.map((key) => [
                key,
                page.data.find((row) => options.customRowIdMapper!(row) === key),
            ]);
            eventListener({
                type: NsDataGridEventType.SELECTION_CHANGE,
                payload: Object.fromEntries(selectedRows),
            });
        } else {
            // Default to using the row index as the row ID
            const selectedRows = keys.map((key) => [key, page.data[parseInt(key)]]);
            eventListener({
                type: NsDataGridEventType.SELECTION_CHANGE,
                payload: Object.fromEntries(selectedRows),
            });
        }
    }, [rowSelection]);

    // Refetch on pagination change
    React.useEffect(() => {
        if (debug) {
            console.debug('Fetch page', pagination, sorting);
        }
        // Convert sorting state to a map
        const mySorting = Object.fromEntries(
            sorting.map((sort) => [sort.id, sort.desc ? 'desc' : 'asc']),
        ) as ColumnSorting<RowType>;
        // Call fetcher with pagination and sorting
        fetcher(pagination, mySorting, filters).then(setPage);
    }, [pagination, sorting, filters, fetcher]);

    // Reset pagination on filter change
    React.useEffect(() => {
        if (debug) {
            console.debug('Filter change', filters);
            console.debug('Resetting pagination');
        }
        setPagination({
            ...pagination,
            pageIndex: DEFAULT_PAGE_INDEX,
        });
    }, [filters, fetcher]);

    // @tanstack/react-table setup
    const table = useReactTable({
        data: page.data,
        columns,
        defaultColumn,
        enableColumnResizing: options?.resizable,
        columnResizeMode: 'onChange',
        getCoreRowModel: getCoreRowModel(),
        // Pagination filtering and sorting setup
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,
        state: {
            pagination,
            sorting,
            rowSelection,
        },
        // Custom pagination
        onPaginationChange: setPagination,
        // Custom sorting
        onSortingChange: setSorting,
        rowCount: page.totalItems,
        // Custom row selection
        enableRowSelection: options.rowSelection && options.rowSelection !== 'none',
        enableMultiRowSelection: options.rowSelection === 'multiple',
        onRowSelectionChange: setRowSelection,
        getRowId: options.customRowIdMapper,
        // Debugging
        debugTable: debug,
        debugHeaders: debug,
        debugColumns: debug,
    });

    if (debug) {
        console.debug('Redraw table');
    }

    const FilterContainerComponent = FilterContainer ? (
        <FilterContainer activeFilters={filters} onFilterChange={setFilters} />
    ) : (
        <></>
    );
    const TableComponent = <NsDataGridBase {...{ table, options, debug, sx, component }} />;
    const TablePagerComponent = <PagerComponent type="server" table={table} paginationInfo={page} />;
    return render(FilterContainerComponent, TableComponent, TablePagerComponent, children);
}

const DefaultRenderer: NsDataGridRenderFn = (FilterContainer, Table, Pager, children) => (
    <Container maxWidth="xl">
        <Box display="flex" flexDirection="column" gap="50px">
            {children ? (
                <>
                    <Box sx={{ border: '1px solid gray', padding: '10px' }}>{FilterContainer}</Box>
                    <Box sx={{ border: '1px solid gray', padding: '10px' }}>
                        {children}
                        {Table}
                        {Pager}
                    </Box>
                </>
            ) : (
                <>
                    {FilterContainer}
                    {Table}
                    {Pager}
                </>
            )}
        </Box>
    </Container>
);
