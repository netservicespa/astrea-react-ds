import {TableNode} from '@table-library/react-table-library'
import {Column} from '@table-library/react-table-library/types/compact'

export type ExportableColumn<T> = {
    label: string
    hide?: boolean
    exportField?: (node: T) => string | number
    filterableWithType?: FilterableFieldType
    filterKey?: string
}

export type TableLibraryColumnWithExport<T extends TableNode> = Column<T> & {
    filterableWithType?: FilterableFieldType
    filterKey?: string
    exportField?: (node: T) => string | number
}

export enum FilterableFieldType {
    TEXT = 'text',
    NUMBER = 'number',
    DATE = 'date',
}

export type FilterableFieldBase = {
    label: string
    key: string
}

export type FilterableFieldText = FilterableFieldBase & {
    type: FilterableFieldType.TEXT
    value: string
}

export type FilterableFieldNumber = FilterableFieldBase & {
    type: FilterableFieldType.NUMBER
    lte: string
    gte: string
}

export type FilterableFieldDate = FilterableFieldBase & {
    type: FilterableFieldType.DATE
    lte: string
    gte: string
}

export type FilterableField = FilterableFieldText | FilterableFieldNumber | FilterableFieldDate;