import React from 'react';
import { Box, FormLabel, Typography } from '@mui/material';
import uniqueId from '../../util/uniqueId';

export interface LabelProps {
  nameHtml?: string;
  label?: React.ReactNode;
}

export const LabelInput: React.FC<React.PropsWithChildren<LabelProps>> = ({
  nameHtml,
  label,
  children,
}) => {
  const id = React.useMemo(() => nameHtml || uniqueId('u_label-'), [nameHtml]);
  return (
    <Box pr={1}>
      <FormLabel htmlFor={id}>
        <Typography marginBottom={1}><span style={{fontSize:'1.2rem'}}>{label}</span></Typography>
      </FormLabel>
      {React.Children.map(children, (element, idx) => {
        return idx === 0 && React.isValidElement(element)
          ? React.cloneElement(
              element as React.ReactElement<
                any,
                string | React.JSXElementConstructor<any>
              >,
              { id }
            )
          : element;
      })}
    </Box>
  );
};
