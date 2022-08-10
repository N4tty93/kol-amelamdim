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
import {
  MAX_UPLOAD_FILE_SIZE,
  ALLWOED_FILE_TYPES,
  MAX_FILES_ALLOWED,
  UPLOAD_VALIDATION_ERRORS,
  MIN_FILES_ALLOWED,
  UPLOAD_SUBMISSION_ERROR,
} from '@kol-amelamdim/constants';
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
  const [submissionError, setSubmissionError] = useState('');

  const uploadFileValidationError = (file: File): string | null => {
    // if (file.length > MAX_FILES_ALLOWED) {
    //   return UPLOAD_VALIDATION_ERRORS.MAX_FILES_ALLOWED;
    // }

    if (!ALLWOED_FILE_TYPES.includes(file[0].type)) {
      return UPLOAD_VALIDATION_ERRORS.NOT_ALLOWED_TYPE;
    }

    if (file[0].size > MAX_UPLOAD_FILE_SIZE) {
      return UPLOAD_VALIDATION_ERRORS.MAX_UPLOAD_FILE_SIZE;
    }

    return null;
  };

  const handleFileSelection = (e: ChangeEvent<HTMLInputElement>) => {
    const filesList: FileList = e.target.files;

    if (filesList.length > MAX_FILES_ALLOWED) {
      setSubmissionError(UPLOAD_VALIDATION_ERRORS.MAX_FILES_ALLOWED);
    }

    if (filesList.length === 0) {
      setSubmissionError(UPLOAD_VALIDATION_ERRORS.MIN_FILES_ALLOWED);
    }
    setSelectedFile(filesList[0]);
  };

  const handleFileSubmission = async () => {
    const uploadValidationError = uploadFileValidationError(selectedFile);

    if (!uploadValidationError) {
      const formData = new FormData();
      formData.append('sharedFile', selectedFile, selectedFile.name);

      try {
        await axios.post('/api/upload-file', formData);
      } catch (e) {
        setSubmissionError(UPLOAD_SUBMISSION_ERROR);
      }
    } else {
      setSubmissionError(uploadValidationError);
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
      {submissionError}
    </Dialog>
  );
};

export default UploadFileDialog;
