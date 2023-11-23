// NsTable.tsx
import React from 'react';
import {CompactTable} from '@table-library/react-table-library/compact';
import {useTheme} from '@table-library/react-table-library/theme';
import { getTheme } from "@table-library/react-table-library/baseline";
import { TableLibraryColumnWithExport } from './table';

const BASELINE_THEME = {
  Table: `
    font-size: 1rem;
  `,
  HeaderRow: `
    .th {
      border: 1px solid #b1b4b6;
      background-color: #ebefef;
    }
  `,
  BaseCell: `
    border: 1px solid #b1b4b6;
    color: #000;
    padding: 8px 16px;

    &:not(:last-of-type) {
      border-right: 0;
    }
  `,
  Row: `
    &:hover {
      background-color: #fcfcfc;
    }
  `,
}

export interface NsTableProps<T extends { id: number }> {
  data: T[];
  onFrameClick?: (frame: number) => void;
  columns: TableLibraryColumnWithExport<T>[];
}

export const NsTable: React.FC<NsTableProps<any>> = ({ data, onFrameClick, columns }) => {
    const theme = useTheme([getTheme(), BASELINE_THEME])
    const nodes = {nodes: data}

    const virtualizedOptions = {
        rowHeight: () => 30,
    }

    console.table(columns);
    console.table(nodes);

    return (
        <>
          <div className="dnsQueryListContainer" style={{height: "500px"}}>
            <CompactTable
              columns={columns}
              data={nodes}
              theme={theme}
              rowProps={{
                onClick: (item: any) => {
                  if (item.frame !== undefined && onFrameClick !== undefined)
                    onFrameClick(item.frame)
                },
              }}
              virtualizedOptions={virtualizedOptions}
              layout={{custom: false, isDiv: true, fixedHeader: true}}
            />
           </div>
        </>
    )
}