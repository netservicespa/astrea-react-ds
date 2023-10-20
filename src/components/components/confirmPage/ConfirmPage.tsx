import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, Grid, Typography } from '@mui/material';
import * as React from 'react';

export interface ConfirmPageProps {
  title: string;
    description: string;
    showDetailButton?: boolean;
    detailLink?: string;
}

  
const ConfirmPage: React.FC<ConfirmPageProps> = ({ title, description, showDetailButton, detailLink }) => {
  
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
          onClick={() => (console.log('torna al indietro'), window.close())}
        >
          Torna indietro
        </Button>
        
        {showDetailButton && 
        <Button
          sx={{ marginLeft: '10px' }}
          variant="contained"
          color="primary"
          type="button"
          onClick={() => (console.log('visualizza dettaglio'), window.open(detailLink))}
        >
          Visualizza Dettaglio
        </Button>
        }
      </Grid>
    </Grid>
  );
}

export default ConfirmPage;
