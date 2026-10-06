import { DEFAULT_PAGE } from '@/components/components/datatable/legacy/NsDataGridLegacy';
import { PagedData } from '@/components/components/datatable/legacy/NsDataGridServer';
import React from 'react';
import { useLoadingRef } from './useLoadingRef';

export function useDefaultTableData<T extends object>(
    dataQuery: PagedData<T>,
    isQueryLoading: boolean,
    fetcher: (pagination: any, sorting?: any, filters?: any) => Promise<PagedData<T>>,
): [PagedData<T>, boolean, (pagination: any, sorting?: any, filters?: any) => void] {
    const ref = useLoadingRef(
        {
            changed: false,
            data: DEFAULT_PAGE as PagedData<T>,
        },
        isQueryLoading,
    );
    const [isLoading, setLoading] = React.useState(false);

    const onChange = React.useCallback((pagination: any, sorting?: any, filters?: any) => {
        setLoading(true);
        fetcher(pagination, sorting, filters).then((data) => {
            ref.current = { data, changed: true };
            setLoading(false);
        });
    }, []);
    return [ref.current.changed ? ref.current.data : dataQuery, isLoading, onChange];
}
