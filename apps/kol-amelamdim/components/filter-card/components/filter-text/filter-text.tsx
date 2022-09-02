import * as React from 'react';
import TextField from '@mui/material/TextField';

interface FilterTextProps {
  filterText: string;
  setFilterText: (filterText: string) => void;
}

export const FilterText = ({ filterText, setFilterText }: FilterTextProps) => (
  <TextField
    label="חיפוש"
    value={filterText}
    onChange={(e) => setFilterText(e.target.value)}
    sx={{ mr: '20px' }}
  />
);
