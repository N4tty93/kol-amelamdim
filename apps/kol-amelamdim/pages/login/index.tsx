import { useRouter } from 'next/router';
import { useState } from 'react';
import { TextField, Button, Grid, Container, styled } from '@mui/material';
import instance from '../../api/api';

const StyledPage = styled('div')`
  font-family: ${(props) => props.theme.fonts.regular};
  padding-top: 25px;
`;

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await instance.post('/api/login', { email, password });
    if (data.success) {
      router.push('/');
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
