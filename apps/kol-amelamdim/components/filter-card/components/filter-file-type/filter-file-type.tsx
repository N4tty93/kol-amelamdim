import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export const FilterFileType = () => {
  const [fileType, setFileType] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setFileType(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120, marginRight: '20px' }}>
      <FormControl fullWidth>
        <InputLabel>סוג קובץ</InputLabel>
        <Select value={fileType} label="סוג קובץ" onChange={handleChange}>
          <MenuItem value={10}>pdf</MenuItem>
          <MenuItem value={20}>doc</MenuItem>
          <MenuItem value={30}>png</MenuItem>
          <MenuItem value={30}>jpeg</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
