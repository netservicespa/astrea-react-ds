// ProgressBarComponent.jsx
import React from 'react';
import { LinearProgress, Typography, Box, IconButton } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';

export function NsProgress({
  icon: IconComponent = StorageIcon,
  percent = 0,
  percentSuffix = '',
  totalSize = 8,
}) {
  const usedSize = (percent / 100) * totalSize;

  return (
    <Box position="relative" width="100%">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        <Box display="flex" alignItems="center">
          <IconButton size="small" edge="start">
            <IconComponent />
          </IconButton>
          <Typography variant="body1">{`${percent}% ${percentSuffix}`}</Typography>
        </Box>
        <Typography variant="body1">{`${usedSize.toFixed(
          2
        )}MB of ${totalSize}GB`}</Typography>
      </Box>
      <LinearProgress variant="determinate" value={percent} />
    </Box>
  );
}
