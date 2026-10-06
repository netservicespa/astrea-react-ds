import { FallbackProps } from './ErrorBoundary';
import React from 'react';
import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const createErrorReport = (errorData: Error) => {
    const err = JSON.stringify(errorData);
    const now = moment();
    const errorContents = `
${now}
----------------
dettagli errore:
${err}
`;
    const link = document.createElement('a');
    link.download = now + '_errorReport.txt';
    const blob = new Blob([errorContents], { type: 'text/plain' });
    link.href = window.URL.createObjectURL(blob);
    link.click();
};

export const FallbackPage: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
    const { t } = useTranslation();
    return (
        <Container>
            <Stack
                spacing={2}
                sx={{
                    mt: 4,
                }}
            >
                <Typography variant="h1">{t('common.error.title')}</Typography>
                <Typography>{t('common.error.content')}</Typography>
                <Grid container>
                    <Grid size={2}>
                        <Button onClick={() => createErrorReport(error)}>{t('common.error.downloadReport')}</Button>
                    </Grid>
                    <Grid size={2}>
                        <Button variant="contained" onClick={() => resetErrorBoundary()}>
                            {t('common.error.goBack')}
                        </Button>
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    );
};
