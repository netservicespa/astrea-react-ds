import { useFormState } from 'relay-forms';
import React from 'react';
import { Alert, Box, Stack } from '@mui/material';

export const NsErrors: React.FC<any> = () => {
  const { errors, isSubmitting, isValidating } = useFormState();
  return (
    <>
      {!isValidating &&
        !isSubmitting &&
        errors?.map((item) => {
          return (
            <Stack
              key={item?.key}
              marginTop={2}
              sx={{ width: '100%' }}
              spacing={2}
            >
              <Alert severity="error">
                <Box>* {item?.error}</Box>
              </Alert>
            </Stack>
          );
        })}
    </>
  );
};
