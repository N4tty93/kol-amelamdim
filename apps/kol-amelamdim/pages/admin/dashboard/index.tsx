import { Grid, Button } from '@mui/material';
import { StyledPageContainer } from '@kol-amelamdim/styled';
import { useRouter } from 'next/router';

const AdminDashboard = () => {
  const router = useRouter();

  return (
    <StyledPageContainer>
      <Grid container direction="column">
        <Grid item>
          <Button
            variant="text"
            onClick={() => router.push('/admin/dashboard/add-weekly-article')}
          >
            הוספת מאמר שבועי
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="text"
            onClick={() =>
              router.push('/admin/dashboard/list-of-weekly-articles')
            }
          >
            צפיה בכל מאמרי השבוע
          </Button>
        </Grid>
      </Grid>
    </StyledPageContainer>
  );
};

export default AdminDashboard;
