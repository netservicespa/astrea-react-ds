import type { TableContainerProps } from '@mui/material';
import type { ColumnDef as BaseColumnDef } from '@tanstack/react-table';
import type React from 'react';
import type { NsDataGridEventHandler } from '@/components/components/datatable/events/NsDataGridEvents';
import type { FilterContainerProps } from '@/components/components/datatable/filtering/FilterContainer';
import type { NsDataGridOptions } from '@/components/components/datatable/NsDataGridBase';
import type { NsTablePagerProps } from '@/components/components/datatable/pagination/NsTablePager';

export type NsDataGridRenderFn = (
    FilterContainer: React.ReactElement,
    Table: React.ReactElement,
    Pager: React.ReactElement,
    ColumnVisibility?: React.ReactElement,
    children?: React.ReactNode,
    Loading?: React.ReactElement,
) => React.ReactElement;

export type ColumnDef<RowType, Value = any> = BaseColumnDef<RowType, Value> & {
    meta?: {
        hide?: boolean;
        [key: string]: any;
    };
};

export interface NsDataGridCommonProps<RowType extends object, FilterType extends object, KeyType = unknown>
    extends TableContainerProps {
    columns: ColumnDef<RowType, KeyType>[];
    defaultColumn?: Partial<ColumnDef<RowType, KeyType>>;
    eventListener?: NsDataGridEventHandler<RowType, FilterType>;
    PagerComponent?: React.ComponentType<NsTablePagerProps<RowType>>;
    FilterContainer?: React.ComponentType<FilterContainerProps<FilterType>>;
    options?: NsDataGridOptions<RowType>;
    render?: NsDataGridRenderFn;
    debug?: boolean;
    children?: React.ReactNode;
}

export interface PagedData<T> {
    data: T[];
    totalItems: number;
    totalPages: number;
    pageSize: number;
    currentPage: number;
}

export const DEFAULT_PAGE: PagedData<unknown> = {
    data: [],
    totalItems: 0,
    totalPages: 0,
    pageSize: 0,
    currentPage: 0,
};