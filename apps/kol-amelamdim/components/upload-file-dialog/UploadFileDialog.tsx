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
  useMediaQuery,
  TextField,
} from '@mui/material';
import { Dialog, FormError } from '@kol-amelamdim/styled';
import { Category } from '@kol-amelamdim/types';
import {
  MAX_FILES_ALLOWED,
  MOBILE_QUERY,
  UPLOAD_VALIDATION_ERRORS,
} from '@kol-amelamdim/constants';
import { uploadFileValidationError } from '@kol-amelamdim/utils';
import CloseIcon from '@mui/icons-material/Close';
import axios from '../../api';
import { API_ERRORS } from '@kol-amelamdim/api-errors';
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
  defaultCategory?: Category;
}

export const UploadFileDialog = ({
  isOpen,
  onClose,
  defaultCategory,
}: UploadFileDialogProps) => {
  const { setAlertMessage } = useContext(AlertContext);
  const [category, setCategory] = useState(defaultCategory || '');
  const [fileName, setFileName] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submissionError, setSubmissionError] = useState('');
  const [isUploadingInProcess, setIsUploadingInProcess] = useState(false);
  const [isUploadButtonDisabled, setIsUploadButtonDisabled] = useState(false);
  const isMobile = useMediaQuery(MOBILE_QUERY);

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
    setFileName('');
    setSelectedFile(null);
    setIsUploadButtonDisabled(false);
  };

  const handleCloseUploadFileDialog = () => {
    resetFormValues();
    onClose();
  };

  const handleFileSubmission = async () => {
    if (!category || !fileName) {
      return setSubmissionError(
        API_ERRORS.missingFieldsOnUploadFile.message.heb
      );
    }

    const uploadValidationError = uploadFileValidationError(selectedFile);

    if (!uploadValidationError) {
      setIsUploadButtonDisabled(true);
      setSubmissionError('');
      setIsUploadingInProcess(true);

      const formData = new FormData();
      formData.append('sharedFile', selectedFile, fileName);
      formData.append('category', category);

      try {
        const res = await axios.post('/api/upload-file', formData);
        if (res.data.isUploaded) {
          setAlertMessage('העלאה בוצעה בהצלחה. תודה רבה!');
          setIsUploadingInProcess(false);
          handleCloseUploadFileDialog();
        }
      } catch (e) {
        if (e.response) {
          setSubmissionError(e.response.data.message.heb);
        }
        setIsUploadingInProcess(false);
        setIsUploadButtonDisabled(false);
      }
    } else {
      setSubmissionError(uploadValidationError);
      setIsUploadButtonDisabled(false);
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
          error={!category && !!submissionError}
          onChange={(e: SelectChangeEvent) => setCategory(e.target.value)}
        >
          <MenuItem value={Category.parashat_shavoa}>פרשת השבוע</MenuItem>
          <MenuItem value={Category.learning_materials}>חומרי למידה</MenuItem>
          <MenuItem value={Category.mivhanim}>מבחנים</MenuItem>
          <MenuItem value={Category.art_and_activities}>
            דפי יצירה ופעילות
          </MenuItem>
          <MenuItem value={Category.shonot}>שונות</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="שם הקובץ"
        sx={{ mb: 3 }}
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        error={!fileName && !!submissionError}
      />
      <Button variant="outlined" component="label">
        בחירת קובץ
        <input type="file" onChange={handleFileSelection} hidden />
      </Button>
      {selectedFile?.name && (
        <Typography sx={{ mt: 1, fontSize: '16px' }}>
          {selectedFile.name}
        </Typography>
      )}

      <Button
        sx={{ mt: isMobile ? 7 : 'auto' }}
        variant="contained"
        onClick={handleFileSubmission}
        disabled={isUploadButtonDisabled}
      >
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
