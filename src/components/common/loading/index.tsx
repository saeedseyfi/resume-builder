import { CircularProgress, Grid } from '@mui/material';
import React from 'react';

export const Loading: React.FC = () => (
  <Grid
    alignItems={'center'}
    height={'100vh'}
    justifyContent={'center'}
    container
  >
    <CircularProgress color={'primary'} size={24} />
  </Grid>
);
