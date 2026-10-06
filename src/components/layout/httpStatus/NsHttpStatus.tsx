import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';

export type NsHttpStatusProps = {
  httpCode: number;
  httpMessage?: string;
  message?: string;
  backButton?: boolean;
};

export const NsHttpStatus: React.FC<NsHttpStatusProps> = ({
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
    <Grid sx={{
      p: 2
    }}>
      <Box
        sx={{
          border: theme.custom.borders[1],
          p: 3,
          width: '50%',
          borderRadius: "0px"
        }}>
        <Typography
          color={'primary'}
          sx={{
            mb: 2,
            fontSize: '4rem !important',
            fontWeight: 'bold'
          }}>
          {httpCode}
        </Typography>
        <Typography variant="h2" sx={{
          mb: 2
        }}>
          {getHttpMessage()}
        </Typography>
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{ __html: message || getDefaultMessage() }}
          sx={{
            mb: 3
          }}
        />
        {backButton && (
          <Button variant="contained" color="primary">
            {t('httpStatus.backButton')}
          </Button>
        )}
      </Box>
    </Grid>
  );
};
