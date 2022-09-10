import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useState, useContext } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Link as MUILink,
} from '@mui/material';
import validator from 'validator';
import {
  StyledPageContainer,
  FormError,
  LoadingText,
} from '@kol-amelamdim/styled';
import { API_ERRORS } from '@kol-amelamdim/api-errors';
import { AuthContext } from '../../context/auth-context-provider';
import axios from '../../api';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { setAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validator.isEmail(email)) {
      setLoading(true);
      try {
        const { data } = await axios.post('/api/login', { email, password });
        if (data.success) {
          setAuthenticated(true);
          await router.push('/');
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setError(error.response.data.message.heb);
      }
    } else {
      setLoading(false);
      setError(API_ERRORS.invalidEmailError.message.heb);
    }
  };

  return (
    <StyledPageContainer>
      <>
        <form onSubmit={handleSubmit}>
          <Grid container direction={'column'}>
            <Typography variant="h3" component="h2" sx={{ mt: 2 }}>
              התחברות
            </Typography>
            <TextField
              sx={{ mt: 2 }}
              required
              id="outlined-required"
              label="אימייל"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error}
            />
            <TextField
              sx={{ mt: 2 }}
              value={password}
              label="סיסמא"
              type="password"
              required
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              error={!!error}
            />
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              type="submit"
              disabled={!email || !password || loading}
            >
              התחבר
            </Button>
            {loading && <LoadingText>רק עוד כמה רגעים...</LoadingText>}
          </Grid>
        </form>
        <Grid container sx={{ mt: 2 }}>
          <Typography component="h4">אין לכם משתמש?&nbsp;</Typography>
          <NextLink href="/register" passHref>
            <MUILink>לחצו להרשמה</MUILink>
          </NextLink>
        </Grid>
        {error && <FormError>{error}</FormError>}
      </>
    </StyledPageContainer>
  );
};
export default Login;
