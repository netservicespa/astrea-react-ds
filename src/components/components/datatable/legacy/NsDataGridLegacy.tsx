import React from 'react';
import { DataGridDefaultRenderer } from '../utils/Render';
import type { NsDataGridCommonProps } from '../NsDataGridTypes';
import { NsDataGridClient, NsDataGridClientProps } from './NsDataGridClient';
import { NsDataGridServer, NsDataGridServerProps } from './NsDataGridServer';

export * from '../NsDataGridTypes';
export { DataGridDefaultRenderer };

export type NsDataGridProps<RowType extends object, FilterType extends object> =
    | NsDataGridServerProps<RowType, FilterType>
    | NsDataGridClientProps<RowType, FilterType>;

export function NsDataGridLegacy<RowType extends object, FilterType extends object>(
    props: Readonly<NsDataGridProps<RowType, FilterType>>,
) {
    if (props.type === 'server') {
        return <NsDataGridServer {...props} />;
    } else if (props.type === 'client') {
        return <NsDataGridClient {...props} />;
    }
}

export { DEFAULT_PAGE } from '../NsDataGridTypes';
