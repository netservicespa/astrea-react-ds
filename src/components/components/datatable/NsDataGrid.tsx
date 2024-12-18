import { TableContainerProps } from '@mui/material';
import { ColumnDef as BaseColumnDef } from '@tanstack/react-table';
import React from 'react';
import { NsDataGridOptions } from './NsDataGridBase';
import { NsDataGridClient, NsDataGridClientProps } from './NsDataGridClient';
import { NsDataGridServer, NsDataGridServerProps } from './NsDataGridServer';
import { FilterContainerProps } from './filtering/FilterContainer';
import { NsTablePagerProps } from './pagination/NsTablePager';
import { NsDataGridEventHandler } from './events/NsDataGridEvents';
import { Box, Container } from '@mui/system';

export type NsDataGridProps<RowType extends object, FilterType extends object> =
    | NsDataGridServerProps<RowType, FilterType>
    | NsDataGridClientProps<RowType, FilterType>;

export type NsDataGridRenderFn = (
    FilterContainer: React.ReactElement,
    Table: React.ReactElement,
    Pager: React.ReactElement,
    ColumnVisibility?: React.ReactElement,
    children?: React.ReactNode,
) => React.ReactElement;

export type ColumnDef<RowType, Value = any> = BaseColumnDef<RowType, Value> & {
    meta?: {
        hide?: boolean; // Proprietà per nascondere le colonne
        [key: string]: any;
    };
};

export interface NsDataGridCommonProps<RowType extends object, FilterType extends object, KeyType = unknown>
    extends TableContainerProps {

    /**
     * An array of column definitions for the grid.
     */
    columns: ColumnDef<RowType, KeyType>[];

    /**
     * An optional definition to set common defaults for all columns.
     */
    defaultColumn?: Partial<ColumnDef<RowType, KeyType>>;

    /**
     * A callback to handle table change events.
     * See {@link NsDataGridEventType} for a list of supported events.
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

export const DataGridDefaultRenderer: NsDataGridRenderFn = (
    FilterContainer,
    Table,
    Pager,
    ColumnVisibility,
    children,
) => {
    const hasFilterContainer = FilterContainer?.props && Object.keys(FilterContainer.props).length > 0;
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
                {hasFilterContainer && <Box sx={{ border: '1px solid gray', padding: '10px' }}>{FilterContainer}</Box>}
                {children}
                {ColumnVisibility}
                {Table}
                {Pager}
            </Box>
        </Container>
    );
};
