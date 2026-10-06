import { Grid } from '@mui/material';
import React from 'react';

export interface NsGridFormLayoutProps {
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
 *    <NsTextField label="uno" />
 *    <NsTextField label="due" />
 * </GridLayout>
 * ```
 */
export const NsGridLayout: React.FC<React.PropsWithChildren<NsGridFormLayoutProps>> = ({ children, rowSize = 2 }) => {
    const childrenList = React.useMemo(() => React.Children.toArray(children), [children]);
    if (childrenList.length === 0) {
        return <></>;
    } else if (childrenList.length === 1) {
        return <>{children}</>;
    } else {
        return (
            <Grid container spacing={4}>
                {childrenList.map((elem, i) => (
                    <Grid key={i} size={12 / rowSize}>
                        {elem}
                    </Grid>
                ))}
            </Grid>
        );
    }
};
