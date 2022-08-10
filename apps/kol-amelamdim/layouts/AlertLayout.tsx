import { PropsWithChildren, useContext } from 'react';
import { AlertContext } from '@kol-amelamdim/context';
import { Alert } from '../components';

export const AlertLayout = (props: PropsWithChildren) => {
  const { alertMessage, setAlertMessage, alertType } = useContext(AlertContext);

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertMessage('');
  };

  return (
    <>
      <Alert
        open={!!alertMessage}
        severity={alertType}
        handleClose={handleCloseAlert}
        autoHideDuration={6000}
      >
        {alertMessage}
      </Alert>
      {props.children}
    </>
  );
};
