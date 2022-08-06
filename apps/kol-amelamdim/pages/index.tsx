import {
  styled,
  Container,
  Typography,
  Button,
  Grid,
  Divider,
  useMediaQuery,
} from '@mui/material';
import { useRouter } from 'next/router';
import { MOBILE_QUERY } from '../constants';

const StyledPage = styled('div')`
  font-family: ${(props) => props.theme.fonts.regular};
  padding-top: 25px;
`;

export function Home() {
  const isSmallScreen = useMediaQuery(MOBILE_QUERY);
  const router = useRouter();

  return (
    <Container>
      <StyledPage>
        <Typography variant="h1" component="h1">
          כל המלמדים
        </Typography>
        <Typography variant="h3" component="h2" sx={{ mt: 2 }}>
          אתר שיתוף חומרי למידה המתקדם ביותר בישראל
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item>
            <Button variant="contained">שיתוף חומרים</Button>
          </Grid>
          <Grid item>
            <Button variant="outlined">הורדת חומרים</Button>
          </Grid>
        </Grid>

        <Divider sx={{ pt: 7, mb: 7 }} />

        <Grid>
          <Typography variant="h3" component="h3">
            מה בא לך ללמוד?
          </Typography>
          <Grid
            container
            justifyContent={isSmallScreen ? 'flex-start' : 'space-between'}
            sx={{ mt: 2 }}
          >
            <Grid item>
              <Button onClick={() => router.push('/category/parashat-shavoa')}>
                פרשת השבוע
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => router.push('/category/learning-materials')}
              >
                חומרי למידה
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={() => router.push('/category/mivhanim')}>
                מבחנים
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => router.push('/category/art-and-activities')}
              >
                דפי יצירה ופעילות
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={() => router.push('/category/shonot')}>
                שונות
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ pt: 7, mb: 7 }} />
      </StyledPage>
    </Container>
  );
}

export default Home;
