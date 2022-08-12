import {useState,useEffect} from 'react';
import { AppBar, Button, Grid, styled, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import instance from '../../api/api';
import { MOBILE_QUERY } from '../../constants';

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
  const [authorized, setAuthorized] = useState<boolean>(false);

  useEffect(() => {
    checkAuthentication();
  }, [router.pathname])
  
  const checkAuthentication = async () => {
    try {
      const {data} = await instance.get('/api/me');
      if(data.success){
        setAuthorized(true);
      } 
    }catch (error){
        console.error(error)
      }
 
  }


  const logOut = async() => {
    try {
      await instance.post('/api/logout');
      setAuthorized(false);
    } catch (error){
      console.error(error)
    }
  
    
  }


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
         {authorized ? <Button variant="text" onClick={logOut}>
            התנתק
          </Button> : <div>
          <Button variant="text" onClick={() => router.push('/login')}>
            התחברות
          </Button>
          <Button variant="text" onClick={() => router.push('/register')}>
            הרשמה
          </Button>
         </div> } 
        </Grid>
      </Grid>
    </StyledNavbar>
  );
};
