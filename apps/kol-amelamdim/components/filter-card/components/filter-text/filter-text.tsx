import * as React from 'react';
import TextField from '@mui/material/TextField';

interface FilterTextProps {
  filterText: string;
  setFilterText: (filterText: string) => void;
}

export const FilterText = ({ filterText, setFilterText }: FilterTextProps) => {
  return (
    <TextField
      label="חיפוש שם קובץ"
      value={filterText}
      onChange={(e) => setFilterText(e.target.value)}
    />
  );
};
