import { Box, Paper } from '@mui/material';
import { Container } from '@mui/system';
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    RowSelectionState,
    useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import { NsDataGridCommonProps, NsDataGridClientRenderFn } from './NsDataGrid';
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
    PagerComponent = NsTablePager,
    options = {},
    debug = false,
    render = DefaultClientRenderer as NsDataGridClientRenderFn,
    // Mui TableContainer props
    sx,
    component = Paper,
    children,
}: Readonly<NsDataGridClientProps<RowType, FilterType>>) {
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
    const [columnVisibility, setColumnVisibility] = React.useState({})

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
            columnVisibility,
        },
        onColumnVisibilityChange: setColumnVisibility,
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

    const TableComponent = <NsDataGridBase {...{ table, options, debug, sx, component }} />;
    const TablePagerComponent = <PagerComponent type="client" table={table} />;
    const ColumnVisibilityComponent = <ColumnVisibilityMenu table={table} />;

    return render(TableComponent, TablePagerComponent, ColumnVisibilityComponent, children);
}

const DefaultClientRenderer: NsDataGridClientRenderFn = (Table, Pager, ColumnVisibility, children) => {
    return (
        <Container maxWidth="xl">
            <Box
                display="flex"
                flexDirection="column"
                gap="10px"
                sx={{
                    ...(children && {
                        border: '1px solid gray',
                        padding: '10px',
                    }),
                }}
            >
                {children}
                {ColumnVisibility}
                {Table}
                {Pager}
            </Box>
        </Container>
    );
};
