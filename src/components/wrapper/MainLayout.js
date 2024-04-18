import React from 'react';
import { Grid } from '@mui/material';
import TemporaryDrawer from '../appBar/NavBar';

export default function MainLayout({ children }) {
  return (
    <Grid container>
      <Grid item xs={2}> 
        <TemporaryDrawer open={true} setOpenDialog={() => {}} />
      </Grid>
      <Grid item xs={10}> 
        {children}
  
      </Grid>
    </Grid>
  );
}
