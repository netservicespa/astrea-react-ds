import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

/**
 * Represents a column definition for a table.
 * @template T The type of the data objects.
 */
export interface NsTableColumn<T> {
    /** The key in the data object. */
    key: keyof T;
    /** The header text, or a react component to use as the header. */
    header?: React.ReactNode | string;
    /** A custom cell renderer. */
    renderCell?: (value: T[keyof T], row: T) => React.ReactNode;
}

// Define the props interface with type parameter T
export interface NsTableProps<T> {
    columns: NsTableColumn<T>[]; // Array of column definitions
    data: T[]; // Array of data objects
}

export const NsTable2 = <T,>({ columns, data }: NsTableProps<T>): React.JSX.Element => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column.key as string}>
                                {typeof column.header === 'string' ? (
                                    <Typography variant="h3" component="h2">
                                        {column.header}
                                    </Typography>
                                ) : (
                                    column.header
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {columns.map((column) => (
                                <TableCell key={`${rowIndex}-${column.key as string}`}>
                                    {column.renderCell ? (
                                        column.renderCell(row[column.key], row)
                                    ) : (
                                        <Typography sx={{ whiteSpace: 'pre-line' }}>
                                            {row[column.key] as string}
                                        </Typography>
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
