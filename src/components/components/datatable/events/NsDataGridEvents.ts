import { ColumnSorting } from '../NsDataGridServer';
import { TableFilters } from '../filtering/FilterContainer';

export enum NsDataGridEventType {
    FILTER_CHANGE = 'filter',
    SORT_CHANGE = 'sort',
    /* The callback receives an array of selected row IDs.
     * If a custom row ID mapper is not provided, the row IDs will be the row index by default.
     */
    SELECTION_CHANGE = 'select',
}

export interface NsDataGridEvent<RowType extends object = object, FilterType extends object = object> {
    type: NsDataGridEventType;
    payload: TableFilters<FilterType> | ColumnSorting<RowType> | RowType[];
}

export type NsDataGridEventHandler<RowType extends object = object, FilterType extends object = object> = (
    event: NsDataGridEvent<RowType, FilterType>,
) => void;
