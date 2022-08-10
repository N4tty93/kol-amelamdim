import { forwardRef } from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps as MuiAlertProps } from '@mui/material/Alert';

interface AlertProps extends MuiAlertProps {
  open: boolean;
  autoHideDuration: number;
  handleClose: () => void;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  const { open, severity, autoHideDuration, handleClose } = props;
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <MuiAlert severity={severity} ref={ref} variant="filled" {...props} />
    </Snackbar>
  );
});
