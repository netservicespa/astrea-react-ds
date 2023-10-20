import { Grid } from '@mui/material';
import React from 'react';

export interface GridFormLayoutProps {
  /** Number of columns per each row. */
  rowSize?: number;
}

/**
 * Automatic grid layout.
 * You can specify the desired number of columns for each row.
 * The number of columns is the same for all the rows.
 *
 * @param props
 * @param props.rowSize Number of columns per each row.
 * @param props.children Children elements.
 * @returns The children components laid out in a grid, with `rowSize` children for each row.
 * @example
 * ```jsx
 * <GridLayout rowSize={2}>
 *    <ValidatedTextField label="uno" />
 *    <ValidatedTextField label="due" />
 * </GridLayout>
 * ```
 */
export const GridLayout: React.FC<
  React.PropsWithChildren<GridFormLayoutProps>
> = ({ children, rowSize = 2 }) => {
  const childrenList = React.useMemo(
    () => React.Children.toArray(children),
    [children]
  );
  if (childrenList.length === 0) {
    return <></>;
  } else if (childrenList.length === 1) {
    return <>{children}</>;
  } else {
    const lastRowLen = childrenList.length % rowSize;
    const rows = childrenList.length / rowSize;
    const grid: (typeof childrenList)[] = [];
    for (let i = 0; i < rows; i++) {
      const row: typeof childrenList = [];
      for (let j = 0; j < rowSize; j++) {
        row.push(childrenList[i * rowSize + j]);
      }
      grid.push(row);
    }
    if (lastRowLen > 0) {
      const row: typeof childrenList = [];
      for (let i = 0; i < lastRowLen; i++) {
        row.push(childrenList[rows + i]);
      }
      grid.push(row);
    }
    return (
      <Grid container>
        {grid.map((row, i) => (
          <Grid key={i} spacing={4} container>
            {row.map((elem, j) => (
              <Grid my={2} key={j} item sm={12 / row.length}>
                {elem}
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    );
  }
};
