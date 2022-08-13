import { useState, useContext } from 'react';
import { TextField, Button, Grid, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import validator from 'validator';
import { StyledPage, FormError } from '@kol-amelamdim/styled';
import { API_ERRORS } from '@kol-amelamdim/api-errors';
import { AlertLayout } from '../../layouts';
import { AlertContext } from '../../context/alert-context-provider';
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
    <Container>
      <StyledPage>
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
              error={!validator.isEmail(email)}
            />
            <TextField
              sx={{ mt: 2 }}
              value={password}
              label="סיסמא"
              type="password"
              required
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              error={!password}
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
        {error && <FormError>{error}</FormError>}
      </StyledPage>
    </Container>
  );
};
Register.getLayout = function getLayout(page: React.ReactElement) {
  return <AlertLayout>{page}</AlertLayout>;
};

export default Register;
