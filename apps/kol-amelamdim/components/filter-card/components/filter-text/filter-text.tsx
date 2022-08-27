import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

interface FilterTextProps {
  filterText: string;
  setFilterText: (filterText: string) => void;
}

export const FilterText = ({ filterText, setFilterText }: FilterTextProps) => {
  return (
    <Stack spacing={2} sx={{ width: 300, marginRight: '20px' }}>
      <TextField
        label="חיפוש שם קובץ"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
    </Stack>
  );
};
