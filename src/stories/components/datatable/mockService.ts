import { PagedData } from 'src/components/components/datatable/NsDataGridServer';
import { Person, makeData } from './makeData';

// Mock data
const data = makeData(200);

type ValueOf<T> = T[keyof T];

export function mockPersonService(
    pageSize: number,
    startPage: number,
    orderBy: { field: keyof Person; direction: 'asc' | 'desc' }[],
    filters: Partial<Record<keyof Person, ValueOf<Person>>> = {},
): Promise<PagedData<Person>> {
    // Apply filters
    const filteredData = data.filter((item) => {
        for (const key in filters) {
            if (filters[key as keyof Person] === undefined) {
                continue;
            }
            switch (typeof filters[key as keyof Person]) {
                case 'string':
                    if (
                        !String(item[key as keyof Person])
                            .toUpperCase()
                            .includes((filters[key as keyof Person] as string).toUpperCase())
                    ) {
                        return false;
                    }
                    break;
                case 'number':
                    if (Number(item[key as keyof Person]) !== filters[key as keyof Person]) {
                        return false;
                    }
                    break;
                default:
                    continue;
            }
        }
        return true;
    });

    // Apply ordering
    const orderedData = filteredData.sort((a, b) => {
        for (const { field, direction } of orderBy) {
            const valueA = a[field] || null;
            const valueB = b[field] || null;

            if (valueA === null && valueB === null) {
                continue;
            }
            if (valueA === null) {
                return direction === 'asc' ? -1 : 1;
            }
            if (valueB === null) {
                return direction === 'asc' ? 1 : -1;
            }

            if (valueA < valueB) {
                return direction === 'asc' ? -1 : 1;
            }
            if (valueA > valueB) {
                return direction === 'asc' ? 1 : -1;
            }
        }
        return 0;
    });

    // Calculate pagination
    const totalItems = orderedData.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = startPage * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = orderedData.slice(startIndex, endIndex);

    const resultPayload: PagedData<Person> = {
        data: paginatedData,
        totalItems,
        totalPages,
        pageSize,
        currentPage: startPage,
    };

    console.log('filters', filters);
    console.log('called mockPersonService: ', resultPayload);

    // Simulate API delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(resultPayload);
        }, 500); // Adjust the delay as needed
    });
}
