import { ChangeEvent } from 'react';
import { Dialog, Typography, Divider, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface UploadFileDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UploadFileDialog = ({
  isOpen,
  onClose,
}: UploadFileDialogProps) => {
  const handleFileSelection = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('here');
    console.log(e.target.files);
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

      <Typography variant="h1" component="h3">
        שיתוף תוכן
      </Typography>
      <Typography variant="h3" component="h4">
        איזה תוכן ברצונך לשתף?
      </Typography>
      <Divider />
      <Button variant="outlined" component="label">
        Upload File
        <input type="file" onChange={handleFileSelection} hidden />
      </Button>
      <Button variant="contained">שיתוף</Button>
    </Dialog>
  );
};

export default UploadFileDialog;
