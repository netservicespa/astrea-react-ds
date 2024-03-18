import React from 'react';
import { Box, Typography } from '@mui/material';
import uniqueId from '../../util/uniqueId';

export interface NsLabelProps {
  nameHtml?: string;
  label?: React.ReactNode;
}

export const NsLabelInput: React.FC<React.PropsWithChildren<NsLabelProps>> = ({
  nameHtml,
  label,
  children,
}) => {
  const id = React.useMemo(() => nameHtml || uniqueId('u_label-'), [nameHtml]);
  const isRequired = React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.props.required
  );

  return (
    <Box pr={1}>
      <Typography
        component="span"
        marginBottom={1}
        style={{ display: 'inline', fontSize: '1.2rem' }}
      >
        {isRequired && <span style={{ color: 'red' }}>*</span>}
        {label}
      </Typography>

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
