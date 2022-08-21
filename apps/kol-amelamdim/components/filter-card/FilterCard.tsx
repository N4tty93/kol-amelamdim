import React from 'react';
import { Card, Button, Grid } from '@mui/material';
import { FilterFileType } from './components/filter-file-type/filter-file-type';
import { FilterText } from './components/filter-text/filter-text';

export const FilterCard = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ height: '200px', mt: '20px', mb: 5 }}
    >
      <Grid item sx={{ height: '100%', width: '100%' }}>
        <Card sx={{ height: '100%', width: '100%' }}>
          <Grid
            container
            alignItems="center"
            justifyContent="flex-start"
            sx={{ height: '100%', width: '100%' }}
          >
            <FilterFileType />
            <FilterText />
            <Button variant="contained">סנן</Button>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};
