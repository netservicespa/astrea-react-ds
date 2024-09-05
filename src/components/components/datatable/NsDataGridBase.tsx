import React, { useEffect, useRef, useState } from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import {
    Box,
    Paper,
    Stack,
    styled,
    Table as MuiTable,
    TableBody as MuiTableBody,
    TableCell,
    TableContainer,
    TableContainerProps,
    TableHead,
    TableRow,
    Typography,
    alpha,
} from '@mui/material';
import { ColumnResizeMode, flexRender, Header, Table } from '@tanstack/react-table';

const DEFAULT_ASC_ICON = <ArrowUpwardIcon fontSize="small" />;
const DEFAULT_DESC_ICON = <ArrowDownwardIcon fontSize="small" />;
const DEFAULT_UNORDERED_ICON = <ImportExportIcon fontSize="small" />;

/**
 * Optional configuration object that can be passed to configure the DataGrid family of components.
 */
export interface NsDataGridOptions<RowType extends object> {
    /** Globally allow the columns to be resized. Resizing can still be disabled on individual columns */
    resizable?: boolean;
    /** Globally allow the columns to be sorted. Sorting can still be disabled on individual columns */
    sortable?: boolean;
    /**
     * Allow the user to select rows.
     * Can be 'single' for single row selection, 'multiple' for multi-row selection,
     * or 'none' to disable row selection entirely
     */
    rowSelection?: 'single' | 'multiple' | 'none';
    /**
     *  Specify how to extract a custom row identifier from a table rows.
     *  By default, the row index is used as the row ID.
     */
    customRowIdMapper?: (row: RowType) => string;
    /** Allow to specify a custom icon to be displayed in the header to show the currently applied sorting */
    customSortingIcons?: {
        asc: React.ReactNode | string;
        desc: React.ReactNode | string;
        unordered: React.ReactNode | string;
    };
}

export interface NsDataGridBaseProps<RowType extends object> extends TableContainerProps {
    table: Table<RowType>;
    options?: NsDataGridOptions<RowType>;
    debug?: boolean;
    bodyTextAlign?: 'center' | 'left' | 'right';
    headerJustifyContent?: 'space-evenly' | 'flex-start' | 'flex-end';
}

/**
 * Base component for rendering a Table component from the @tanstack/react-table library.
 * This component is designed to be used as a base for other components that provide additional functionality
 * such as server-side pagination, filtering, etc.
 * @param table The Table instance to render
 * @param options Optional configuration object to customize the behavior of the DataGrid
 * @param debug Optional flag to enable debug logging
 */

/*TEMPORARY COLOUR CONSTANT*/
const TABLE_BG_HEADER_COLOR = '#ebefef';
const BORDER_PIXEL = 1;
const MuiTableBodyStyled = styled(MuiTableBody)<any>(({ theme }) => ({
    border: `${BORDER_PIXEL}px solid ${theme.palette.borderColor.main}`,
}));

const TableHeadStyled = styled(TableHead)<any>(({ theme }) => ({
    border: `${BORDER_PIXEL}px solid ${theme.palette.borderColor.main}`,
    position: 'relative',
    fontWeight: 'bold',
    backgroundColor: TABLE_BG_HEADER_COLOR,
}));

const TableCellHeadStyled = styled(TableCell)<any>(({ theme }) => ({
    padding: '2em 0 2em',
    borderRight: `${BORDER_PIXEL}px solid ${theme.palette.borderColor.main}`,
    '&:last-child': { borderRight: 'none' },
}));
const HeaderBoxStyled = styled(Box)<any>(({ theme, headerJustifyContent }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: headerJustifyContent,
}));

const TableRowStyled = styled(TableRow)<any>(({ theme, isSelected }) => ({
    backgroundColor: isSelected ? alpha(theme.palette.primary.main, 0.2) : 'inherit',
    borderBottom: `${BORDER_PIXEL}px solid ${theme.palette.borderColor.main}`,
    padding: '1em 0 1em',
    boxShadow: isSelected ? `inset 0 0 0 1px  ${theme.palette.primary.main}` : 'none',
    '&:last-child': {
        borderBottom: 'none',
    },
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.4),
        boxShadow: `inset 0 0 0 1px  ${theme.palette.primary.main}`,
    },
}));
const TableCellStyled = styled(TableCell)<any>(({ theme, isSelected, bodyTextAlign }) => ({
    borderRight: `${BORDER_PIXEL}px solid ${theme.palette.borderColor.main}`,
    '&:last-child': { borderRight: 'none' },
    textAlign: bodyTextAlign,
    'td.MuiTableCell-body': {
        border: isSelected
            ? `${BORDER_PIXEL}px solid ${theme.palette.primary.main}`
            : `${BORDER_PIXEL}px solid ${theme.palette.borderColor.main}`,
    },
}));

export function NsDataGridBase<RowType extends object>({
    table,
    options = {},
    debug = false,
    headerJustifyContent,
    bodyTextAlign,
    // Mui TableContainer props
    sx,
    component = Paper,
}: Readonly<NsDataGridBaseProps<RowType>>) {
    const sortingIcons = {
        asc: options.customSortingIcons?.asc ?? DEFAULT_ASC_ICON,
        desc: options.customSortingIcons?.desc ?? DEFAULT_DESC_ICON,
        unordered: options.customSortingIcons?.unordered ?? DEFAULT_UNORDERED_ICON,
    };

    /**
     * Instead of calling `column.getSize()` on every render for every header
     * and especially every data cell (very expensive),
     * we will calculate all column sizes at once at the root table level in a useMemo
     * and pass the column sizes down as CSS variables to the <table> element.
     */
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <TableContainer component={component} sx={{ display: 'block', maxWidth: '100%', overflowY: 'hidden' }}>
            {/* Here in the <table> equivalent element (surrounds all table head and data cells), we will define our CSS variables for column sizes */}
            <MuiTable
                sx={{
                    ...sx,
                    width: '100%',
                }}
            >
                <TableHeadStyled>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const canSort = options.sortable && header.column.getCanSort();
                                const canResize = options.resizable && header.column.getCanResize();
                                return (
                                    <TableCellHeadStyled
                                        key={header.id}
                                        sx={{
                                            position: 'relative',
                                            width: header.getSize(),
                                            cursor: canSort ? 'pointer' : 'inherit',
                                        }}
                                        onClick={() => {
                                            if (canSort) {
                                                header.column.toggleSorting();
                                            }
                                        }}
                                    >
                                        <HeaderBoxStyled headerJustifyContent={headerJustifyContent || 'space-evenly'}>
                                            <Typography variant="h3">
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(header.column.columnDef.header, header.getContext())}
                                            </Typography>
                                            {(canSort &&
                                                {
                                                    asc: sortingIcons.asc,
                                                    desc: sortingIcons.desc,
                                                }[header.column.getIsSorted() as string]) ??
                                                sortingIcons.unordered}
                                        </HeaderBoxStyled>
                                        {canResize && (
                                            <Resizer
                                                header={header}
                                                table={table}
                                                //resizeMode={'onEnd'}
                                            />
                                        )}
                                    </TableCellHeadStyled>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeadStyled>
                <TableBody debug={debug} table={table} bodyTextAlign={bodyTextAlign} />
            </MuiTable>
        </TableContainer>
    );
}

//un-memoized normal table body component - see memoized version below
function TableBody<T>({
    table,
    debug = false,
    bodyTextAlign = 'center',
}: Readonly<{ table: Table<T>; debug?: boolean; bodyTextAlign?: 'center' | 'left' | 'right' }>) {
    const [hoveredRow, setHoveredRow] = useState<string | null>(null);
    const handleHover = (id: string | null) => {
        setHoveredRow(id);
    };
    if (debug) {
        console.log('Real TableBody render');
    }
    return (
        <MuiTableBodyStyled>
            {table.getRowModel().rows.map((row) => (
                <TableRowStyled
                    isSelected={row.getIsSelected()}
                    key={row.id}
                    onClick={() => row.toggleSelected()}
                    onMouseEnter={() => handleHover(row.id)}
                    onMouseLeave={() => handleHover(null)}
                    // isHover={hoveredRow === row.id}
                >
                    {row.getVisibleCells().map((cell) => {
                        return (
                            <TableCellStyled
                                isSelected={row.getIsSelected()}
                                key={cell.id}
                                bodyTextAlign={bodyTextAlign}
                                sx={{ width: cell.column.getSize() }}
                            >
                                <Typography>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Typography>
                            </TableCellStyled>
                        );
                    })}
                </TableRowStyled>
            ))}
        </MuiTableBodyStyled>
    );
}

//special memoized wrapper for our table body that we will use during column resizing
const MemoizedTableBody = React.memo(
    TableBody,
    (prev, next) => prev.table.options.data === next.table.options.data,
) as typeof TableBody;

interface ResizerProps {
    header: Header<any, unknown>;
    table: Table<any>;
    resizeMode?: ColumnResizeMode;
}

const ResizerDiv = styled('div')<ResizerProps>(({ header, table, resizeMode }) => ({
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '4px',
    cursor: 'col-resize',
    userSelect: 'none',
    touchAction: 'none',
    left: table.options.columnResizeDirection === 'rtl' ? 0 : 'inherit',
    right: table.options.columnResizeDirection === 'ltr' ? 0 : 'inherit',
    transform:
        resizeMode === 'onEnd' && header.column.getIsResizing()
            ? `translateX(${
                  (table.options.columnResizeDirection === 'rtl' ? -1 : 1) *
                  (table.getState().columnSizingInfo.deltaOffset ?? 0)
              }px)`
            : '',
    //opacity: header.column.getIsResizing() ? 1 : 0,
    '&:hover': {
        opacity: 1,
    },
}));

const Resizer: React.FC<ResizerProps> = (props) => {
    return (
        <ResizerDiv
            {...props}
            onDoubleClick={() => props.header.column.resetSize()}
            onMouseDown={props.header.getResizeHandler()}
            onTouchStart={props.header.getResizeHandler()}
        />
    );
};
