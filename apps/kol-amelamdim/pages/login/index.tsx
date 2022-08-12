import { useRouter } from 'next/router';
import { useState } from 'react';
import { TextField, Button, Grid, Container, styled } from '@mui/material';
import validator from 'validator';
import { StyledPage } from '@kol-amelamdim/styled';
import instance from '../../api/api';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validator.isEmail(email)) {
      const { data } = await instance.post('/api/login', { email, password });
      if (data.success) {
        router.push('/');
      }
    } else {
      throw new Error('יש להזין אימייל תקני');
    }
  };

  return (
    <Container>
      <StyledPage>
        <form onSubmit={handleSubmit}>
          <Grid container direction={'column'}>
            <TextField
              sx={{ marginBottom: '10px' }}
              required
              id="outlined-required"
              label="אימייל"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              sx={{ marginBottom: '10px' }}
              value={password}
              label="סיסמא"
              type="password"
              required
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              type="submit"
              disabled={!email || !password}
            >
              התחבר
            </Button>
          </Grid>
        </form>
      </StyledPage>
    </Container>
  );
};
export default Login;
