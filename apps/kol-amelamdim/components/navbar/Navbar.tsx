import { useEffect, useContext } from 'react';
import {
  AppBar,
  Button,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
} from '@mui/material';
import Image from 'next/image';
import { i18n, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import axios from '../../api';
import { AuthContext } from '../../context/auth-context-provider';
import { AlertContext } from '../../context/alert-context-provider';
import { MOBILE_QUERY } from '@kol-amelamdim/constants';
import { AlertLayout } from '../../layouts';

const StyledNavbar = styled(AppBar)`
  background: ${(props) => props.theme.palette.primary.light};
  height: 90px;
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
  const { pathname, asPath, query } = router;
  const { t } = useTranslation('home');

  const { isAuthenticated, setAuthenticated, checkAuthentication } =
    useContext(AuthContext);
  const { setAlertMessage, setAlertType } = useContext(AlertContext);

  const handleLanguageChange = async (event: SelectChangeEvent) => {
    await router.push({ pathname, query }, asPath, {
      locale: event.target.value,
    });
  };

  useEffect(() => {
    checkAuthentication()
      .then((data) => {
        if (data.success) {
          setAuthenticated(true);
        }
      })
      .catch((error) => {
        if (error.response) {
          setAlertMessage(error.response.data.message[i18n.language]);
        }
        setAlertType('warning');
      });
  }, []);

  const logOut = async () => {
    try {
      await axios.post('/api/logout');
      setAuthenticated(false);
      router.push('/');
    } catch (error) {
      setAlertType('warning');
      setAlertMessage(error.response.data.message[i18n.language]);
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
          sx={{ position: 'relative' }}
        >
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={190}
            height={80}
            onClick={() => router.push('/')}
          />
        </Grid>
        <Grid
          item
          container
          xs={7}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={i18n.language || 'he'}
            onChange={handleLanguageChange}
            sx={{ height: '50px' }}
          >
            <MenuItem value={'he'}>עברית</MenuItem>
            <MenuItem value={'en'}>English(us)</MenuItem>
          </Select>
          {isAuthenticated ? (
            <Button variant="text" onClick={logOut}>
              {t('logout-btn')}
            </Button>
          ) : (
            <div>
              <Button variant="text" onClick={() => router.push('/login')}>
                {t('login-btn')}
              </Button>
              <Button variant="text" onClick={() => router.push('/register')}>
                {t('register-btn')}
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
