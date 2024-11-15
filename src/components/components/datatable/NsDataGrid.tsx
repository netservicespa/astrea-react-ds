import { TableContainerProps } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { NsDataGridOptions } from './NsDataGridBase';
import { NsDataGridClient, NsDataGridClientProps } from './NsDataGridClient';
import { NsDataGridServer, NsDataGridServerProps } from './NsDataGridServer';
import { FilterContainerProps } from './filtering/FilterContainer';
import { NsTablePagerProps } from './pagination/NsTablePager';
import { NsDataGridEventHandler } from './events/NsDataGridEvents';

export type NsDataGridType = 'client' | 'server';

export type NsDataGridProps<RowType extends object, FilterType extends object> =
    | NsDataGridServerProps<RowType, FilterType>
    | NsDataGridClientProps<RowType, FilterType>;

export type NsDataGridRenderFn = (
    FilterContainer: React.ReactElement,
    Table: React.ReactElement,
    Pager: React.ReactElement,
    children?: React.ReactNode,
    ColumnVisibility?: React.ReactElement,
) => React.ReactElement;

export type NsDataGridClientRenderFn = (
    Table: React.ReactElement,
    Pager: React.ReactElement,
    ColumnVisibility?: React.ReactElement,
    children?: React.ReactNode,
) => React.ReactElement;

export interface NsDataGridCommonProps<RowType extends object, FilterType extends object> extends TableContainerProps {
    /**
     * An array of column definitions for the grid.
     */
    columns: ColumnDef<RowType>[];

    /**
     * An optional definition to set common defaults for all columns.
     */
    defaultColumn?: Partial<ColumnDef<RowType>>;

    /**
     * A callback to handle table change events.
     * See {@link NsDataGridEvent} for a list of supported events.
     */
    eventListener?: NsDataGridEventHandler<RowType, FilterType>;

    /**
     * An optional component to render a custom pager.
     */
    PagerComponent?: React.ComponentType<NsTablePagerProps<RowType>>;

    /**
     * An optional component to render the filter container.
     */
    FilterContainer?: React.ComponentType<FilterContainerProps<FilterType>>;

    /**
     * Optional configuration options for the grid.
     */
    options?: NsDataGridOptions<RowType>;

    /**
     * Optional render function to customize the layout of the grid.
     */
    render?: NsDataGridRenderFn;

    /**
     * Whether to enable debug mode for the grid.
     */
    debug?: boolean;

    children?: React.ReactNode;
}

export function NsDataGrid<RowType extends object, FilterType extends object>(
    props: Readonly<NsDataGridProps<RowType, FilterType>>,
) {
    if (props.type === 'server') {
        return <NsDataGridServer {...props} />;
    } else {
        return <NsDataGridClient {...props} />;
    }
}
