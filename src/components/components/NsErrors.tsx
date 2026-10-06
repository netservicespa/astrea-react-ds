import { useFormState } from 'relay-forms';
import React from 'react';
import { Alert, Box, Stack } from '@mui/material';

export const NsErrors: React.FC<any> = () => {
  const formState = useFormState() || {};
  const { errors, isSubmitting, isValidating } = formState;
  return (
    <>
      {!isValidating &&
        !isSubmitting &&
        errors?.map((item) => {
          return (
            <Stack
              key={item?.key}
              spacing={2}
              sx={{
                marginTop: 2,
                width: '100%'
              }}>
              <Alert severity="error">
                <Box>* {item?.error}</Box>
              </Alert>
            </Stack>
          );
        })}
    </>
  );
};
