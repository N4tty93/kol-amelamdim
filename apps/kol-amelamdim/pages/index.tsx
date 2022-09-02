import { styled, Typography, Button, Grid, Divider, Card } from '@mui/material';
import { useState, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { MOBILE_QUERY } from '@kol-amelamdim/constants';
import { Category } from '@kol-amelamdim/types';
import { UploadFileDialog } from '../components';
import { AlertLayout } from '../layouts';
import { StyledPageContainer } from '@kol-amelamdim/styled';

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

  return (
    <StyledPageContainer>
      <Typography variant="h1" component="h1">
        כל המלמדים
      </Typography>
      <Typography variant="h3" component="h2" sx={{ mt: 2 }}>
        אתר שיתוף חומרי למידה המתקדם ביותר בישראל
      </Typography>
      <Grid container sx={{ mt: 2 }}>
        <Grid item sx={{ mr: '10px' }}>
          <Button
            variant="contained"
            onClick={() => setIsUploadFileDialogOpen(true)}
          >
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
              onClick={() =>
                router.push(`/category/${Category.parashat_shavoa}`)
              }
            >
              פרשת השבוע
            </CategoryCard>
          </Grid>
          <Grid item xs={6}>
            <CategoryCard
              onClick={() =>
                router.push(`/category/${Category.learning_materials}`)
              }
            >
              חומרי למידה
            </CategoryCard>
          </Grid>
          <Grid item xs={6}>
            <CategoryCard
              onClick={() => router.push(`/category/${Category.mivhanim}`)}
            >
              מבחנים
            </CategoryCard>
          </Grid>
          <Grid item xs={6}>
            <CategoryCard
              onClick={() =>
                router.push(`/category/${Category.art_and_activities}`)
              }
            >
              דפי יצירה ופעילות
            </CategoryCard>
          </Grid>
          <Grid item xs={6}>
            <CategoryCard
              onClick={() => router.push(`/category/${Category.shonot}`)}
            >
              שונות
            </CategoryCard>
          </Grid>
        </Grid>
      </Grid>

      <Divider sx={{ pt: 7, mb: 7 }} />
      {isUploadFileDialogOpen && (
        <UploadFileDialog
          isOpen={isUploadFileDialogOpen}
          onClose={() => setIsUploadFileDialogOpen(false)}
        />
      )}
    </StyledPageContainer>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <AlertLayout>{page}</AlertLayout>;
};

export default Home;
