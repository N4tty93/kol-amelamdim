import { useState } from 'react';
import NextLink from 'next/link';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Link as MUILink,
} from '@mui/material';
import { useRouter } from 'next/router';
import validator from 'validator';
import { StyledPageContainer, FormError } from '@kol-amelamdim/styled';
import { API_ERRORS } from '@kol-amelamdim/api-errors';
import axios from '../../api';

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validator.isEmail(email)) {
      try {
        const { data } = await axios.post('/api/register', {
          email,
          password,
        });
        if (data.success) {
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
    <StyledPageContainer>
      <form onSubmit={handleSubmit}>
        <Grid container direction={'column'}>
          <Typography variant="h3" component="h2" sx={{ mt: 2 }}>
            הרשמה
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
            הרשם
          </Button>
        </Grid>
      </form>
      <Grid container sx={{ mt: 2 }}>
        <Typography component="h4">כבר נרשמתם?&nbsp;</Typography>
        <NextLink href="/login" passHref>
          <MUILink>לחצו להתחברות</MUILink>
        </NextLink>
      </Grid>
      {error && <FormError>{error}</FormError>}
    </StyledPageContainer>
  );
};

export default Register;
