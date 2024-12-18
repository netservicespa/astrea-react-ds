import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Table, flexRender } from '@tanstack/react-table';

export interface NsDataGridCardProps<RowType extends object> {
  table: Table<RowType>;
}

const StyledCard = styled(Card)(({ theme }) => ({
  border: `1px solid ${theme.palette.borderColor?.main || '#C0C2C4'}`,
  boxShadow: '0px 2px 4px 0px rgba(6, 7, 60, 0.04)',
  padding: '8px',
}));

export function NsDataGridCard<RowType extends object>({ table }: NsDataGridCardProps<RowType>) {
  return (
    <Grid container spacing={2}>
      {table.getRowModel().rows.map((row) => (
        <Grid item xs={12} sm={6} md={4} key={row.id}>
          <StyledCard>
            <CardContent>
              {row.getVisibleCells().map((cell) => (
                <Typography variant="body2" key={cell.id}>
                  <strong>{cell.column.columnDef.header as string}:</strong>{' '}
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Typography>
              ))}
            </CardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
}
