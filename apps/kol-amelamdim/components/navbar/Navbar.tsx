import { AppBar, Button, Grid, styled, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const StyledNavbar = styled(AppBar)`
  background: ${(props) => props.theme.palette.primary.light};
  height: 72px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding: 0 10px;
  color: ${(props) => props.theme.palette.primary.main};
  font-weight: ${(props) => props.theme.fonts.bold};
`;

export const Navbar = () => {
  const router = useRouter();

  return (
    <StyledNavbar>
      <Grid container>
        <Grid
          item
          container
          xs={6}
          alignItems="center"
          onClick={() => router.push('/')}
        >
          <Typography>הלוגו יהיה כאן</Typography>
        </Grid>
        <Grid
          item
          container
          xs={6}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Button variant="text" onClick={() => router.push('/login')}>
            התחברות
          </Button>
          <Button variant="text" onClick={() => router.push('/register')}>
            הרשמה
          </Button>
        </Grid>
      </Grid>
    </StyledNavbar>
  );
};
