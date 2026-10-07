import React from 'react';
import { Box, Container } from '@mui/material';
import type { NsDataGridRenderFn } from '@/components/components/datatable/NsDataGridTypes';

export const DataGridDefaultRenderer: NsDataGridRenderFn = (
    FilterContainer,
    Table,
    Pager,
    ColumnVisibility,
    children,
    Loading,
) => {
    const hasFilterContainer = (FilterContainer?.props && Object.keys(FilterContainer.props).length > 0) as boolean;
    return (
        <Container maxWidth="xl">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
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
                {Loading}
            </Box>
        </Container>
    );
};
