import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface PanelProps {
  type?: 'primary' | 'secondary';
  title: string;
  subtitle: string;
}
const StyledCard = styled(Card)<any>(({ theme, type }) => ({
  border: '1px solid',
  borderColor: '#b1b4b6',
  boxSizing: 'border-box',
  boxShadow: 'none',
  borderRadius: '0px',
}));

export const NsPanel = ({ type = 'primary', title, subtitle }: PanelProps) => {
  return (
    <StyledCard type={type}>
      <Card
        sx={{
          borderRadius: '0px',
          backgroundColor: type === 'secondary' ? '#2e5a6019' : undefined,
        }}
      >
        <CardContent>
          <Typography variant={'h3'} fontWeight={900} gutterBottom>
            {title}
          </Typography>
          <Typography variant={'h4'} fontWeight={400}>
            {subtitle}
          </Typography>
        </CardContent>
      </Card>
    </StyledCard>
  );
};
