import * as React from 'react';
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  useMediaQuery,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FILE_TYPES_DICTIONARY } from '@kol-amelamdim/types';
import { MOBILE_QUERY } from '@kol-amelamdim/constants';

interface FilterFileTypeProps {
  fileType: string;
  setFileType: (fileType: string) => void;
}

export const FilterFileType = ({
  fileType,
  setFileType,
}: FilterFileTypeProps) => {
  const isMobile = useMediaQuery(MOBILE_QUERY);

  const handleChange = (event: SelectChangeEvent) => {
    setFileType(event.target.value);
  };

  return (
    <Box
      sx={{
        minWidth: isMobile ? '100px' : '120px',
        marginRight: isMobile ? '10px' : '20px',
      }}
    >
      <FormControl fullWidth>
        <InputLabel>סוג קובץ</InputLabel>
        <Select value={fileType} label="סוג קובץ" onChange={handleChange}>
          <MenuItem value={FILE_TYPES_DICTIONARY.all}>
            {FILE_TYPES_DICTIONARY.all}
          </MenuItem>
          <MenuItem value={FILE_TYPES_DICTIONARY.pdf}>
            {FILE_TYPES_DICTIONARY.pdf}
          </MenuItem>
          <MenuItem value={FILE_TYPES_DICTIONARY.png}>
            {FILE_TYPES_DICTIONARY.png}
          </MenuItem>
          <MenuItem value={FILE_TYPES_DICTIONARY.jpeg}>
            {FILE_TYPES_DICTIONARY.jpeg}
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
