import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';

export type HttpStatusProps = {
  httpCode: number;
  httpMessage?: string;
  message?: string;
  backButton?: boolean;
};

export const HttpStatus: React.FC<HttpStatusProps> = ({
  httpCode,
  httpMessage,
  message,
  backButton,
}) => {
  const theme: any = useTheme();
  const { t } = useTranslation();

  const getHttpMessage = () => {
    if (httpMessage) return httpMessage;
    switch (httpCode) {
      case 404:
        return t('httpStatus.404.title');
      case 500:
        return t('httpStatus.500.title');
      default:
        return '';
    }
  };

  const getDefaultMessage = () => {
    switch (httpCode) {
      case 404:
        return t('httpStatus.404.message');
      case 500:
        return t('httpStatus.500.message');
      default:
        return '';
    }
  };

  return (
    <Grid p={2}>
      <Box
        border={theme.custom.borders[1]}
        p={3}
        width={'50%'}
        borderRadius="5px"
      >
        <Typography
          color={'primary'}
          sx={{ fontSize: '4rem !important', fontWeight: 'bold' }}
          mb={2}
        >
          {httpCode}
        </Typography>
        <Typography variant="h2" mb={2}>
          {getHttpMessage()}
        </Typography>
        <Typography
          mb={3}
          variant="body1"
          dangerouslySetInnerHTML={{ __html: message || getDefaultMessage() }}
        />
        {backButton && (
          <Button
            variant="contained"
            color="primary"
            /* onClick={handleGoBack} */
          >
            {t('httpStatus.backButton')}
          </Button>
        )}
      </Box>
    </Grid>
  );
};
