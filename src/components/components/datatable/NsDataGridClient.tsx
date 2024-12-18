import { Paper } from '@mui/material';
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    RowSelectionState,
    useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import { NsDataGridCommonProps, DataGridDefaultRenderer } from './NsDataGrid';
import { NsDataGridBase } from './NsDataGridBase';
import { NsTablePager } from './pagination/NsTablePager';
import { NsDataGridEventType } from './events/NsDataGridEvents';
import { ColumnVisibilityMenu } from './filtering/ColumnVisibilityMenu';

export interface NsDataGridClientProps<RowType extends object, FilterType extends object>
    extends NsDataGridCommonProps<RowType, FilterType> {
    type: 'client';
    data: RowType[];
}

export function NsDataGridClient<RowType extends object, FilterType extends object>({
    data,
    columns,
    defaultColumn,
    eventListener = () => {},
    FilterContainer,
    PagerComponent = NsTablePager,
    options = {},
    debug = false,
    render = DataGridDefaultRenderer,
    // Mui TableContainer props
    sx,
    component = Paper,
    children,
}: Readonly<NsDataGridClientProps<RowType, FilterType>>) {
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState({});

    // Notify event listener of row selection change
    React.useEffect(() => {
        // Convert the row selection state to a list of selected row IDs
        const keys = Object.entries(rowSelection)
            .filter(([, value]) => value === true)
            .map(([key]) => key as string);
        if (options.customRowIdMapper) {
            // Map the selected rows to the actual data
            // using the user-provided custom row ID mapper
            const selectedRows = keys.map((key) => [key, data.find((row) => options.customRowIdMapper!(row) === key)]);
            eventListener({
                type: NsDataGridEventType.SELECTION_CHANGE,
                payload: Object.fromEntries(selectedRows),
            });
        } else {
            // Default to using the row index as the row ID
            const selectedRows = keys.map((key) => [key, data[parseInt(key)]]);
            eventListener({
                type: NsDataGridEventType.SELECTION_CHANGE,
                payload: Object.fromEntries(selectedRows),
            });
        }
    }, [rowSelection]);

    const table = useReactTable<RowType>({
        data,
        columns: columns.filter((column) => !column.meta?.hide),
        defaultColumn,
        columnResizeMode: 'onChange',
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            rowSelection,
            columnFilters,
            columnVisibility,
        },
        onColumnVisibilityChange: setColumnVisibility,
        // Custom row selection
        enableRowSelection: options.rowSelection && options.rowSelection !== 'none',
        enableMultiRowSelection: options.rowSelection === 'multiple',
        onRowSelectionChange: setRowSelection,
        onColumnFiltersChange: setColumnFilters,
        getRowId: options.customRowIdMapper,
        // Debugging
        debugTable: debug,
        debugHeaders: debug,
        debugColumns: debug,
    });

    const FilterContainerComponent = FilterContainer ? (
        <FilterContainer
            activeFilters={writeFilters(columnFilters)}
            onFilterChange={(newFilters) => {
                setColumnFilters(readFilters(newFilters));
            }}
        />
    ) : (
        <></>
    );
    const TableComponent = <NsDataGridBase {...{ table, options, debug, sx, component }} />;
    const ColumnVisibilityComponent = <ColumnVisibilityMenu table={table} />;
    const TablePagerComponent = (
        <PagerComponent type="client" table={table} rowsPerPageOptions={options?.pagination?.rowsPerPageOptions} />
    );
    return render(
        FilterContainerComponent,
        TableComponent,
        TablePagerComponent,
        ColumnVisibilityComponent, 
        children && React.isValidElement(children) ? children : undefined
    );
}

function readFilters<T>(filterState: Partial<Record<keyof T, unknown>>): ColumnFiltersState {
    return Object.entries(filterState)
        .filter(([, value]) => value !== undefined)
        .map(([id, value]) => ({ id, value }));
}

function writeFilters<T>(filterState: ColumnFiltersState): Partial<Record<keyof T, unknown>> {
    const filters: { [key: string]: unknown } = {};
    filterState.forEach((f) => {
        filters[f.id] = f.value;
    });
    return filters as Partial<Record<keyof T, unknown>>;
}