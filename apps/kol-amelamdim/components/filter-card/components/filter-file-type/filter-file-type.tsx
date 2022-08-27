import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FILE_TYPES_DICTIONARY } from '@kol-amelamdim/constants';

interface FilterFileTypeProps {
  fileType: string;
  setFileType: (fileType: string) => void;
}

export const FilterFileType = ({
  fileType,
  setFileType,
}: FilterFileTypeProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    setFileType(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, marginRight: '20px' }}>
      <FormControl fullWidth>
        <InputLabel>סוג קובץ</InputLabel>
        <Select value={fileType} label="סוג קובץ" onChange={handleChange}>
          <MenuItem value={10}>{FILE_TYPES_DICTIONARY[10]}</MenuItem>
          <MenuItem value={20}>{FILE_TYPES_DICTIONARY[20]}</MenuItem>
          <MenuItem value={30}>{FILE_TYPES_DICTIONARY[30]}</MenuItem>
          <MenuItem value={40}>{FILE_TYPES_DICTIONARY[40]}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
