import { Paper, Theme, useMediaQuery } from '@mui/material';

import {
    getCoreRowModel,
    OnChangeFn,
    PaginationState,
    SortingState,
    Updater,
    useReactTable,
} from '@tanstack/react-table';
import React from 'react';

import { useQueryTable } from './utils/useQueryTable';

import { NsFullPageSpinner } from '@/components/NsFullPageSpinner';
import { NsDataGridEvent, NsDataGridEventType } from './events/NsDataGridEvents';
import { ColumnVisibilityMenu } from './filtering/ColumnVisibilityMenu';
import { NsDataGridCommonProps } from './legacy/NsDataGridLegacy';
import { NsDataGridBase } from './NsDataGridBase';
import { NsDataGridCard } from './NsDataGridCard';
import { ColumnSorting, DataFetcher, PagedData } from './legacy/NsDataGridServer';
import { NsTablePager } from './pagination/NsTablePager';
import { DataGridDefaultRenderer } from './utils/Render';
import { useDeepStableValue } from './utils/useDeepStableValue';
import { useDefaultTableData } from './utils/useDefaultTableData';
import { useLoadingRef } from './utils/useLoadingRef';
import { buildSortingMap } from './utils/buildSorting';
import { TableFilters } from './filtering/FilterContainer';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_INDEX = 0;

interface InnerTableState {
    pagination: PaginationState;
    sorting: SortingState;
    selectedRow: Record<string, boolean>;
    rowSelection: Record<string, boolean> | 'none' | 'multiple' | undefined;
}

function buildInitialTableState(options: any): InnerTableState {
    return {
        pagination: { ...options.pagination },
        sorting: [...(options.sorting ?? [])],
        selectedRow: { ...options.selectedRow },
        rowSelection: undefined,
    };
}

export type NsDataGridNextProps<RowType extends object, FilterType extends object> =
    | NsDataGridNextFetcherProps<RowType, FilterType>
    | NsDataGridNextHooksProps<RowType, FilterType>;

export interface NsDataGridNextCommonProps<RowType extends object, FilterType extends object>
    extends Omit<NsDataGridCommonProps<RowType, FilterType>, 'type'> {
    LoadingComponent?: React.ReactElement;
}

export interface NsDataGridNextFetcherProps<RowType extends object, FilterType extends object>
    extends NsDataGridNextCommonProps<RowType, FilterType> {
    /**
     * A function that fetches data for the grid.
     * It takes a `PaginationState` object as a parameter and returns a `Promise` that resolves to a `PagedData` object.
     */
    fetcher: DataFetcher<RowType, FilterType>;
}

export interface NsDataGridNextHooksProps<RowType extends object, FilterType extends object>
    extends NsDataGridNextCommonProps<RowType, FilterType> {
    useQueryFetch: typeof useQueryTable;
    useTableData: (
        ...args: any[]
    ) => [PagedData<RowType>, boolean, (pagination: any, sorting?: any, filters?: any) => void];
}

/**
 * A data grid component that fetches data from a server,
 * using the @tanstack/react-table library for managing the grid.
 *
 * It supports server-side pagination and sorting and column resizing.
 */
export function NsDataGrid<RowType extends object, FilterType extends object>({
    columns,
    defaultColumn,
    PagerComponent = NsTablePager,
    LoadingComponent = <NsFullPageSpinner isOpen value={100} variant="indeterminate" />,
    eventListener = () => {},
    options = {},
    render = DataGridDefaultRenderer,
    debug = false,
    // Mui TableContainer props
    sx,
    component = Paper,
    children,
    FilterContainer,
    ...rest
}: Readonly<NsDataGridNextProps<RowType, FilterType>>) {
    // If default options or filters change, reset to initial state and let useQueryFetch handle the new fetch
    const [filters, setFilters] = React.useState<FilterType | undefined>(options.defaultFilters as FilterType);

    // Get the appropriate data fetching and state management hooks based on the actual props
    const useQueryFetch = (rest as NsDataGridNextHooksProps<RowType, FilterType>).useQueryFetch ?? useQueryTable;
    const useTableData = (rest as NsDataGridNextHooksProps<RowType, FilterType>).useTableData ?? useDefaultTableData;
    const fetcher = (rest as NsDataGridNextFetcherProps<RowType, FilterType>).fetcher;

    const defaultOptions = useDeepStableValue({
        filters: options.defaultFilters ?? null,
        sorting: options.defaultSorting ?? [],
        selectedRow: Object.keys(options.selectedRow ?? {})[0]
            ? { [Object.keys(options.selectedRow ?? {})[0]]: true }
            : {},
        enableCard: options.enableCard ?? true,
        resizable: options.resizable,
        pagination: {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
            ...(options.pagination ?? {}),
        },
        customRowIdMapper: options.customRowIdMapper,
    });

    const FilterContainerComponent = FilterContainer ? (
        <FilterContainer
            activeFilters={filters || options.defaultFilters || {}}
            onFilterChange={(newFilters: TableFilters<FilterType>) => {
                setFilters((prev: FilterType | undefined) => ({ ...(prev ?? {}), ...newFilters }) as FilterType);
            }}
        />
    ) : (
        <></>
    );

    const skip = !filters;

    const { data: dataQuery, isLoading, error } = useQueryFetch(fetcher, defaultOptions, filters as FilterType, skip);

    const ref = useLoadingRef(buildInitialTableState(defaultOptions), isLoading);

    const [page, isLoadingTableData, fetch] = useTableData(dataQuery, isLoading, fetcher);

    const stateRef = ref.current;

    const pageSize = stateRef.pagination.pageSize;

    const internalPage = React.useMemo(() => {
        return {
            ...page,
            totalPages: page && page.totalItems ? Math.ceil(page.totalItems / pageSize) : 0,
            data: page && page.data ? page.data : [],
        };
    }, [page, pageSize]);

    const onChangeSelection = React.useCallback(
        (rowSelectionFunction: any) => {
            const rowSelection = rowSelectionFunction();
            ref.current.selectedRow = rowSelection;
            const keys = Object.entries(rowSelection)
                .filter(([, value]) => value)
                .map(([key]) => key);

            const selectedRows = keys.map((key) => [
                key,
                options.customRowIdMapper
                    ? internalPage.data.find((row: any) => options.customRowIdMapper!(row) === key)
                    : internalPage.data[parseInt(key)],
            ]);
            eventListener({
                type: NsDataGridEventType.SELECTION_CHANGE,
                payload: Object.fromEntries(selectedRows),
            });
        },
        [eventListener, options, internalPage],
    );

    const [columnVisibility, setColumnVisibility] = React.useState({});

    const isTabletOrSmaller = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
    const showCardView = isTabletOrSmaller && (options?.enableCard ?? true);

    const state = React.useMemo(() => {
        return {
            pagination: stateRef.pagination,
            sorting: stateRef.sorting,
            rowSelection: stateRef.selectedRow,
            columnVisibility,
        };
    }, [stateRef, stateRef.sorting, stateRef.rowSelection, columnVisibility]);

    const onChange = React.useCallback(
        (pagination?: (p: PaginationState) => PaginationState, sorting?: (s: SortingState) => SortingState) => {
            let type: NsDataGridEventType = NsDataGridEventType.SORT_CHANGE;
            if (pagination) {
                type = NsDataGridEventType.PAGINATION_CHANGE;
                ref.current.pagination = pagination(ref.current.pagination);
            } else {
                ref.current.sorting = sorting?.(ref.current.sorting) || [];
            }
            ref.current.selectedRow = {};

            const mySorting: ColumnSorting<RowType> = buildSortingMap(ref.current.sorting as ColumnSorting<RowType>[]);

            const payload = {
                pagination: ref.current.pagination,
                sorting: mySorting,
                filters: filters,
            };

            eventListener({
                type,
                payload: payload as NsDataGridEvent<RowType, FilterType>['payload'],
            });
            fetch(ref.current.pagination, mySorting, filters);
        },
        [eventListener, fetch, filters],
    );

    const onChangeSorting: OnChangeFn<SortingState> = React.useCallback(
        (sorting: Updater<SortingState>) => {
            onChange(undefined, sorting as (s: SortingState) => SortingState);
        },
        [onChange],
    );

    const onChangePagination = React.useCallback(
        (pagination: Updater<PaginationState>) => {
            onChange(pagination as (p: PaginationState) => PaginationState, undefined);
        },
        [onChange],
    );

    // @tanstack/react-table setup
    const table = useReactTable({
        data: internalPage.data,
        columns: columns.filter((column: any) => !column.meta?.hide),
        defaultColumn,
        enableColumnResizing: options?.resizable,
        columnResizeMode: 'onChange',
        getCoreRowModel: getCoreRowModel(),
        // Pagination filtering and sorting setup
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,
        state: state,
        enableSortingRemoval: false,
        // Custom filtering
        onColumnVisibilityChange: setColumnVisibility,
        // Custom pagination
        onPaginationChange: onChangePagination,
        // Custom sorting
        onSortingChange: onChangeSorting,
        rowCount: internalPage.totalItems,
        // Custom row selection
        enableRowSelection: stateRef.rowSelection && stateRef.rowSelection !== 'none',
        enableMultiRowSelection: stateRef.rowSelection === 'multiple',
        onRowSelectionChange: onChangeSelection,
        getRowId: options.customRowIdMapper,
        // Debugging
        debugTable: debug,
        debugHeaders: debug,
        debugColumns: debug,
    });

    if (debug) {
        console.debug('Redraw table');
    }

    const TableComponent = showCardView ? (
        <NsDataGridCard table={table} />
    ) : (
        <NsDataGridBase {...{ table, options, debug, sx, component }} />
    );
    const TablePagerComponent = (
        <PagerComponent
            type="server"
            table={table}
            paginationInfo={{
                ...stateRef.pagination,
                currentPage: stateRef.pagination.pageIndex,
                totalItems: internalPage.totalItems,
                totalPages: internalPage.totalPages,
            }}
            rowsPerPageOptions={options?.pagination?.rowsPerPageOptions}
        />
    );
    const ColumnVisibilityComponent = <ColumnVisibilityMenu table={table} />;

    if (!filters) {
        return render(FilterContainerComponent, <></>, <></>, <></>, <></>);
    }

    if (isLoading) {
        return render(FilterContainerComponent, <></>, <></>, <></>, <></>, LoadingComponent);
    }

    return render(
        FilterContainerComponent,
        TableComponent,
        TablePagerComponent,
        ColumnVisibilityComponent,
        children,
        isLoadingTableData ? LoadingComponent : undefined,
    );
}
