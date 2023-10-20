import React from 'react';
import { Button } from '@mui/material';

export const NsButton = (props: any) => {
  const { variant = 'contained', color = 'primary', ...otherProps } = props;

  return <Button variant={variant} color={color} {...otherProps} />;
};
