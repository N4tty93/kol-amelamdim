import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useState, useContext } from 'react';
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Link as MUILink,
} from '@mui/material';
import validator from 'validator';
import { StyledPage, FormError } from '@kol-amelamdim/styled';
import { API_ERRORS } from '@kol-amelamdim/api-errors';
import { AuthContext } from '../../context/auth-context-provider';
import axios from '../../api';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const { setAuthenticated } = useContext(AuthContext);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validator.isEmail(email)) {
      try {
        const { data } = await axios.post('/api/login', { email, password });
        if (data.success) {
          setAuthenticated(true);
          router.push('/');
        }
      } catch (error) {
        setError(error.response.data.message.heb);
      }
    } else {
      setError(API_ERRORS.invalidEmailError.message.heb);
    }
  };

  return (
    <Container>
      <StyledPage>
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
              disabled={!email || !password}
            >
              התחבר
            </Button>
          </Grid>
        </form>
        <Grid container sx={{ mt: 2 }}>
          <Typography component="h4">עוד אין לכם משתמש?&nbsp;</Typography>
          <NextLink href="/register" passHref>
            <MUILink>לחצו עלי להרשמה</MUILink>
          </NextLink>
        </Grid>
        {error && <FormError>{error}</FormError>}
      </StyledPage>
    </Container>
  );
};
export default Login;
