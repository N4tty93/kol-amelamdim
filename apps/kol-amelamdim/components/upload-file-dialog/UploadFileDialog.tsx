import { useState, ChangeEvent } from 'react';
import {
  Typography,
  Divider,
  IconButton,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  styled,
} from '@mui/material';
import { Dialog } from '@kol-amelamdim/styled';
import { Category } from '@kol-amelamdim/types';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const CategoryLabel = styled(InputLabel)`
  &.MuiFormLabel-root {
    background: ${(props) => props.theme.palette.primary.light};
    padding: 0 5px;
  }
`;

interface UploadFileDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UploadFileDialog = ({
  isOpen,
  onClose,
}: UploadFileDialogProps) => {
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleFileSelection = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileSubmission = async () => {
    const formData = new FormData();
    formData.append('sharedFile', selectedFile, selectedFile.name);

    try {
      await axios.post('/api/upload-file', formData);
    } catch (e) {
      // TODO: Handle errors
    }
  };

  return (
    <Dialog open={isOpen}>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}

      <Typography variant="h2" component="h3" sx={{ mt: 1 }}>
        שיתוף תוכן
      </Typography>
      <Typography component="h4">
        תודה שבחרת לשתף חומרי לימוד ולהגדיל תורה בישראל!
      </Typography>

      <Divider sx={{ mt: 4, mb: 4 }} />

      <FormControl sx={{ mb: 3 }}>
        <CategoryLabel id="category-selection">
          לאיזה קטגוריה שייך הקובץ?
        </CategoryLabel>
        <Select labelId="category-selection" id="demo-simple-select">
          <MenuItem value={Category['parashat-shavoa']}>פרשת השבוע</MenuItem>
          <MenuItem value={Category['learning-materials']}>
            חומרי למידה
          </MenuItem>
          <MenuItem value={Category.mivhanim}>מבחנים</MenuItem>
          <MenuItem value={Category['art-and-activities']}>
            דפי יצירה ופעילות
          </MenuItem>
          <MenuItem value={Category.shonot}>שונות</MenuItem>
        </Select>
      </FormControl>

      <Button variant="outlined" component="label" sx={{ mb: 'auto' }}>
        בחירת קובץ
        <input type="file" onChange={handleFileSelection} hidden />
      </Button>

      <Button variant="contained" onClick={handleFileSubmission}>
        שיתוף
      </Button>
    </Dialog>
  );
};

export default UploadFileDialog;
