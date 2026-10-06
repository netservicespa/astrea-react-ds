import { ColumnSorting } from  '@/components/components/datatable/legacy/NsDataGridServer';


export function buildSortingMap(sorting: ColumnSorting<any>[] = []) {
    return Object.fromEntries(sorting.map((sort: ColumnSorting<any>) => [sort.id, sort.desc ? 'desc' : 'asc']));
}
