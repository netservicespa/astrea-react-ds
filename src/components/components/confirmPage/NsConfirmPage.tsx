import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, Grid, Typography } from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

export interface NsConfirmPageProps {
  title: string;
  description: string;
  showDetailButton?: boolean;
  detailLink?: string;
}

export const NsConfirmPage: React.FC<NsConfirmPageProps> = ({
  title,
  description,
  showDetailButton,
  detailLink,
}) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CheckCircleIcon sx={{ fontSize: 60, color: 'green', margin: 2 }} />
        <Typography variant="h1" sx={{ margin: 2 }}>
          {title}
        </Typography>
        <Typography variant="h6" sx={{ margin: 2 }}>
          {description}
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: 4, margin: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          type="button"
          onClick={() => window.close()}
        >
          {t('confirmPage.comeBack')}
        </Button>

        {showDetailButton && (
          <Button
            sx={{ marginLeft: '10px' }}
            variant="contained"
            color="primary"
            type="button"
            onClick={() => window.open(detailLink)}
          >
            {t('confirmPage.viewDetail')}
          </Button>
        )}
      </Grid>
    </Grid>
  );
};
