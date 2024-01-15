import React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';

export interface NsTableProps {
  rows: any | any[];
  columns: Column[];
}

export interface Column {
  id: string | any;
  label?: string;
  minWidth?: number;
  align?: 'left' | 'right' | 'center';
  format?: (value: number) => string;
  renderBodyCell?: (cell: any, row?: any, index?: number) => any;
  renderHeadCell?: (cell: any, rows?: any, index?: number) => any;
  fontWeight?: number;
  fontSize?: string;
}

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '0px',
  borderTop: '1px solid #b1b4b6',
  borderRight: '1px solid #b1b4b6',

  'td.MuiTableCell-root.MuiTableCell-body': {
    borderLeft: '1px solid #b1b4b6',
    borderBottom: '1px solid #b1b4b6',
  },
  'th.MuiTableCell-root.MuiTableCell-head': {
    borderBottom: '1px solid #b1b4b6',
    borderLeft: '1px solid #b1b4b6',
  },
}));

const StyledTableCell: any = styled(TableCell)(({ theme }) => ({
  '&:not(:last-of-type)': {
    borderRight: '0',
  },
  '&.MuiTableCell-root': {
    borderRadius: '0px',
  },
  '&.MuiTableCell-head': {
    backgroundColor: '#EBEFEF',
    color: '#000',
    fontSize: '18px',
    fontWeight: 600,
    border: '0',
    borderRadius: '0px',
  },
}));

export const NsTable = ({ rows, columns }: NsTableProps) => {
  return (
    <>
      <StyledTableContainer>
        <TableContainer sx={{ borderBottom: 'unset' }} component={Paper}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead sx={{}}>
                <TableRow>
                  {columns?.map((column: any, i: number) => {
                    return (
                      <StyledTableCell key={i}>
                        <Box component="span">
                          {column.renderHeadCell
                            ? column.renderHeadCell(column.label, rows)
                            : column.label}
                        </Box>
                      </StyledTableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.map((row: any, i: number) => {
                  return (
                    <TableRow hover tabIndex={-1} key={i}>
                      {columns?.map((column: any, index: number) => {
                        const value = row[column?.id];
                        if (column.renderBodyCell) {
                          return column.renderBodyCell(column, row, index);
                        }

                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              fontWeight: column.fontWeight,
                              fontSize: column.fontSize,
                            }}
                            sx={{
                              borderBottom: '1px solid rgba(224, 224, 224, 1)',
                            }}
                          >
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </TableContainer>
      </StyledTableContainer>
    </>
  );
};
