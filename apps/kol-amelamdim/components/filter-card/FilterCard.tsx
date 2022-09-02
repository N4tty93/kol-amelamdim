import React from 'react';
import { Card, Button, Grid } from '@mui/material';
import { FilterFileType } from './components/filter-file-type/filter-file-type';
import { FilterText } from './components/filter-text/filter-text';

interface FilterCardProps {
  setFileType: (fileType: string) => void;
  fileType: string;
  filterText: string;
  setFilterText: (filterText: string) => void;
  onClick: () => void;
}

export const FilterCard = ({
  fileType,
  setFileType,
  filterText,
  setFilterText,
  onClick,
}: FilterCardProps) => (
  <Grid
    container
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
          <FilterFileType setFileType={setFileType} fileType={fileType} />
          <FilterText filterText={filterText} setFilterText={setFilterText} />
          <Button variant="contained" onClick={onClick}>
            סנן
          </Button>
        </Grid>
      </Card>
    </Grid>
  </Grid>
);
