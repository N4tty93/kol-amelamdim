import { useEffect, useContext } from 'react';
import { AppBar, Button, Grid, styled, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import axios from '../../api';
import { AuthContext } from '../../context/auth-context-provider';
import { AlertContext } from '../../context/alert-context-provider';
import { MOBILE_QUERY } from '@kol-amelamdim/constants';
import { AlertLayout } from '../../layouts';

const StyledNavbar = styled(AppBar)`
  background: ${(props) => props.theme.palette.primary.light};
  height: 82px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding: 0 60px;

  @media ${MOBILE_QUERY} {
    padding: 0 10px;
  }

  color: ${(props) => props.theme.palette.primary.main};
  font-weight: ${(props) => props.theme.fonts.bold};
`;

export const Navbar = () => {
  const router = useRouter();

  const { isAuthenticated, setAuthenticated, checkAuthentication } =
    useContext(AuthContext);
  const { setAlertMessage, setAlertType } = useContext(AlertContext);

  useEffect(() => {
    checkAuthentication()
      .then((data) => {
        if (data.success) {
          setAuthenticated(true);
        }
      })
      .catch((error) => {
        setAlertType('warning');
        setAlertMessage(error.response.data.message.heb);
      });
  }, []);

  const logOut = async () => {
    try {
      await axios.post('/api/logout');
      setAuthenticated(false);
    } catch (error) {
      setAlertType('warning');
      setAlertMessage(error.response.data.message.heb);
    }
  };

  return (
    <StyledNavbar>
      <Grid container>
        <Grid
          item
          container
          xs={5}
          alignItems="center"
          onClick={() => router.push('/')}
        >
          <Typography>הלוגו יהיה כאן</Typography>
        </Grid>
        <Grid
          item
          container
          xs={7}
          alignItems="center"
          justifyContent="flex-end"
        >
          {isAuthenticated ? (
            <Button variant="text" onClick={logOut}>
              התנתקות
            </Button>
          ) : (
            <div>
              <Button variant="text" onClick={() => router.push('/login')}>
                התחברות
              </Button>
              <Button variant="text" onClick={() => router.push('/register')}>
                הרשמה
              </Button>
            </div>
          )}
        </Grid>
      </Grid>
    </StyledNavbar>
  );
};
Navbar.getLayout = function getLayout(page: React.ReactElement) {
  return <AlertLayout>{page}</AlertLayout>;
};
