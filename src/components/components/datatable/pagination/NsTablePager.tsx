import { TablePagination } from '@mui/material';
import { Table } from '@tanstack/react-table';
import React from 'react';
import { PagedData } from '../NsDataGridServer';
import TablePaginationActions from './DefaultPaginationActions';
import { useTranslation } from 'react-i18next';

/**
 * Controlled TablePager component Props.
 * This kind of pager is useful when you want to control the table pagination from outside the table.
 * Typically, for server-side pagination.
 */
export interface NsTablePagerControlledProps<T> {
    type: 'server';
    /**
     * The table that we are paging.
     */
    table: Table<T>;

    /**
     * The pagination information.
     */
    paginationInfo: Omit<PagedData<unknown>, 'data'>;

    /**
     * The available page sizes
     */
    rowsPerPageOptions?: number[];
}

/**
 * Uncontrolled TablePager component Props.
 * This kind of pager is useful when you want the table to handle its own pagination.
 * Typically for client-side pagination.
 */
export interface NsTablePagerUncontrolledProps<T> {
    type: 'client';
    /**
     * The table that we are paging.
     */
    table: Table<T>;
    /**
     * The available page sizes
     */
    rowsPerPageOptions?: number[];
}

export type NsTablePagerProps<T> = NsTablePagerControlledProps<T> | NsTablePagerUncontrolledProps<T>;

/**
 * Renders a MUI TablePagination component for a table.
 *
 * @param table - The table that we are paging.
 * @param type - The type of pager to render.
 * @param rest - The rest of the props, the contents depend on the type of pager.
 * @returns The rendered pagination component.
 */
export function NsTablePager<T>({ table, type, ...rest }: Readonly<NsTablePagerProps<T>>) {
    const { t } = useTranslation();

    let count, page, rowsPerPage, rowsPerPageOptions;

    if (type === 'server') {
        count = (rest as NsTablePagerControlledProps<T>).paginationInfo.totalItems;
        page = (rest as NsTablePagerControlledProps<T>).paginationInfo.currentPage;
        rowsPerPage = (rest as NsTablePagerControlledProps<T>).paginationInfo.pageSize;
        rowsPerPageOptions = (rest as NsTablePagerControlledProps<T>).rowsPerPageOptions;
    } else {
        count = table.getFilteredRowModel().rows.length;
        page = table.getState().pagination.pageIndex;
        rowsPerPage = table.getState().pagination.pageSize;
        rowsPerPageOptions = (rest as NsTablePagerControlledProps<T>).rowsPerPageOptions;
    }

    return (
        <TablePagination
            component="div"
            count={count}
            page={page}
            onPageChange={(_, page) => {
                table.setPageIndex(page);
            }}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
                const size = e.target.value ? Number(e.target.value) : 10;
                table.setPageSize(size);
            }}
            labelDisplayedRows={({ from, to, count }) => {
                return t('table.pagination.interval', { from, to, count });
            }}
            labelRowsPerPage={t('table.pagination.pageSize')}
            ActionsComponent={TablePaginationActions}
            rowsPerPageOptions={rowsPerPageOptions}
        />
    );
}
