import { useState, ChangeEvent, useContext } from 'react';
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
  SelectChangeEvent,
} from '@mui/material';
import { Dialog, FormError } from '@kol-amelamdim/styled';
import { Category } from '@kol-amelamdim/types';
import {
  MAX_FILES_ALLOWED,
  UPLOAD_VALIDATION_ERRORS,
  UPLOAD_SUBMISSION_ERROR,
} from '@kol-amelamdim/constants';
import { uploadFileValidationError } from '@kol-amelamdim/utils';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { AlertContext } from '../../context/alert-context-provider';

const CategoryLabel = styled(InputLabel)`
  &.MuiFormLabel-root {
    background: ${(props) => props.theme.palette.primary.light};
    padding: 0 5px;
  }
`;

const UploadingIndicatorText = styled(Typography)`
  color: ${(props) => props.theme.palette.primary.main};
  margin-top: 10px;
`;

interface UploadFileDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UploadFileDialog = ({
  isOpen,
  onClose,
}: UploadFileDialogProps) => {
  const { setAlertMessage } = useContext(AlertContext);
  const [category, setCategory] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submissionError, setSubmissionError] = useState('');
  const [isUploadingInProcess, setIsUploadingInProcess] = useState(false);

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

  const resetFormValues = () => {
    setSubmissionError('');
    setCategory('');
    setSelectedFile(null);
  };

  const handleCloseUploadFileDialog = () => {
    resetFormValues();
    onClose();
  };

  const handleFileSubmission = async () => {
    const uploadValidationError = uploadFileValidationError(selectedFile);

    if (!uploadValidationError) {
      setSubmissionError('');
      setIsUploadingInProcess(true);
      const formData = new FormData();
      formData.append('sharedFile', selectedFile, selectedFile.name);

      try {
        await axios.post('/api/upload-file', formData);
        setAlertMessage('העלאה בוצעה בהצלחה. תודה רבה!');
        setIsUploadingInProcess(false);
        handleCloseUploadFileDialog();
      } catch (e) {
        setIsUploadingInProcess(false);
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
          onClick={handleCloseUploadFileDialog}
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
        <Select
          value={category}
          labelId="category-selection"
          id="demo-simple-select"
          onChange={(e: SelectChangeEvent) => setCategory(e.target.value)}
        >
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
      {isUploadingInProcess && !submissionError && (
        <UploadingIndicatorText>רק עוד כמה רגעים...</UploadingIndicatorText>
      )}
      <FormError>{submissionError}</FormError>
    </Dialog>
  );
};

export default UploadFileDialog;
