import {
  styled,
  Container,
  Typography,
  Button,
  Grid,
  Divider,
  Card,
} from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { MOBILE_QUERY } from '../constants';
import { UploadFileDialog } from '../components';

const StyledPage = styled('div')`
  font-family: ${(props) => props.theme.fonts.regular};
  padding-top: 25px;
`;

const CategoryCard = styled(Card)`
  height: 90px;
  text-align: center;
  min-width: 200px;

  @media ${MOBILE_QUERY} {
    min-width: auto;
  }

  padding: 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-family: ${(props) => props.theme.fonts.bold};
  color: ${(props) => props.theme.palette.primary.light};
  background: ${(props) => props.theme.palette.primary.main};
  background: -webkit-linear-gradient(
    to right,
    ${(props) => props.theme.palette.secondary.main},
    ${(props) => props.theme.palette.primary.main}
  );
  background: linear-gradient(
    to right,
    ${(props) => props.theme.palette.secondary.main},
    ${(props) => props.theme.palette.primary.main}
  );
  transition: transform 0.6s;
  &:hover {
    transform: scale(1.03);
  }
`;

export function Home() {
  const [isUploadFileDialogOpen, setIsUploadFileDialogOpen] = useState(false);
  const router = useRouter();

  const handleShareContentButtonClick = () => {
    // TODO: Only logged in users can share new file (Add it after api for login is ready)
    setIsUploadFileDialogOpen(true);
  };

  return (
    <Container>
      <StyledPage>
        <Typography variant="h1" component="h1">
          כל המלמדים
        </Typography>
        <Typography variant="h3" component="h2" sx={{ mt: 2 }}>
          אתר שיתוף חומרי למידה המתקדם ביותר בישראל
        </Typography>
        <Grid container sx={{ mt: 2 }}>
          <Grid item sx={{ mr: '10px' }}>
            <Button variant="contained" onClick={handleShareContentButtonClick}>
              שיתוף חומרים
            </Button>
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

          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <CategoryCard
                onClick={() => router.push('/category/parashat-shavoa')}
              >
                פרשת השבוע
              </CategoryCard>
            </Grid>
            <Grid item xs={6}>
              <CategoryCard
                onClick={() => router.push('/category/learning-materials')}
              >
                חומרי למידה
              </CategoryCard>
            </Grid>
            <Grid item xs={6}>
              <CategoryCard onClick={() => router.push('/category/mivhanim')}>
                מבחנים
              </CategoryCard>
            </Grid>
            <Grid item xs={6}>
              <CategoryCard
                onClick={() => router.push('/category/art-and-activities')}
              >
                דפי יצירה ופעילות
              </CategoryCard>
            </Grid>
            <Grid item xs={6}>
              <CategoryCard onClick={() => router.push('/category/shonot')}>
                שונות
              </CategoryCard>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ pt: 7, mb: 7 }} />
      </StyledPage>
      <UploadFileDialog
        isOpen={isUploadFileDialogOpen}
        onClose={() => setIsUploadFileDialogOpen(false)}
      />
    </Container>
  );
}

export default Home;
