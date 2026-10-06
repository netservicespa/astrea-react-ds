import { DEFAULT_PAGE } from '@/components/components/datatable/legacy/NsDataGridLegacy';
import { DataFetcher, PagedData } from '@/components/components/datatable/legacy/NsDataGridServer';
import React from 'react';
import { buildSortingMap } from './buildSorting';

type UseQueryResult<T> = {
    data: T;
    isLoading: boolean;
    error: any;
};

export function useQueryTable<RowType extends object, FilterType extends object>(
    fetcher: DataFetcher<RowType, FilterType>,
    options: any,
    filters: FilterType,
    skip: boolean,
): UseQueryResult<PagedData<RowType>> {
    const [data, setData] = React.useState<PagedData<RowType>>(DEFAULT_PAGE as PagedData<RowType>);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<any>(null);

    const fetchIdRef = React.useRef(0);

    const execute = React.useCallback(() => {
        if (skip) {
            return;
        }
        const fetchId = ++fetchIdRef.current;

        setIsLoading(true);
        setError(null);

        const mySorting = buildSortingMap(options.sorting);

        fetcher(options.pagination, mySorting, filters)
            .then((result) => {
                if (fetchId === fetchIdRef.current) {
                    setData(result);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                if (fetchId === fetchIdRef.current) {
                    setError(err);
                    setIsLoading(false);
                }
            });
    }, [fetcher, options, filters, skip]);

    // mount + change filters
    React.useEffect(() => {
        execute();
    }, [execute]);

    return {
        data,
        isLoading,
        error,
    };
}
