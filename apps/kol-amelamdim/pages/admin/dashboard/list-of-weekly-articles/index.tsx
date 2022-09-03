import { ReactElement, useContext, useState } from 'react';
import axios from '../../../../api';
import { useRouter } from 'next/router';
import { Button, Divider, Grid, Typography, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { StyledPageContainer } from '@kol-amelamdim/styled';
import { AlertContext } from '../../../../context/alert-context-provider';
import { AlertLayout } from '../../../../layouts';

const getAllWeeklyArticles = async () => {
  return await axios.get('/api/admin/get-weekly-articles');
};

const ListOfWeeklyArticles = ({ weeklyArticles }) => {
  const [articles, setArticles] = useState(weeklyArticles);
  const { setAlertMessage, setAlertType } = useContext(AlertContext);
  const router = useRouter();

  const toggleActiveWeeklyArticle = async (id: string) => {
    try {
      await axios.post('/api/admin/toggle-active-weekly-article', { id });
      const { data } = await getAllWeeklyArticles();
      if (data.length) {
        setArticles(data);
      }
    } catch (e) {
      setAlertType('warning');
      setAlertMessage(e.response.data.message.heb);
    }
  };

  const deleteWeeklyArticle = async (id: string) => {
    try {
      await axios.post('/api/admin/delete-weekly-article', { id });
      const { data } = await getAllWeeklyArticles();
      setArticles(data);
    } catch (e) {
      setAlertType('warning');
      setAlertMessage(e.response.data.message.heb);
    }
  };

  if (!articles.length) return null;

  return (
    <StyledPageContainer>
      <Button onClick={() => router.push('/admin/dashboard')} sx={{ mb: 2 }}>
        חזור לדף ניהול
      </Button>
      {articles.map(({ _id, title, isActiveArticle }) => {
        return (
          <div key={_id}>
            <Grid container alignItems="center" spacing={4} sx={{ m: 2 }}>
              <Grid item xs={4}>
                <Typography>{title}</Typography>
              </Grid>

              <Grid item xs={8} container justifyContent="flex-end">
                <Button
                  variant="contained"
                  disabled={isActiveArticle}
                  onClick={() => toggleActiveWeeklyArticle(_id)}
                >
                  החל
                </Button>
                <Button
                  variant="outlined"
                  sx={{ ml: 2 }}
                  onClick={() =>
                    router.push(`/admin/dashboard/add-weekly-article?id=${_id}`)
                  }
                >
                  עריכה
                </Button>
                <IconButton
                  sx={{ ml: 2 }}
                  onClick={() => deleteWeeklyArticle(_id)}
                >
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>

            <Divider />
          </div>
        );
      })}
    </StyledPageContainer>
  );
};

export async function getServerSideProps() {
  try {
    const weeklyArticles = await getAllWeeklyArticles();
    return { props: { weeklyArticles: weeklyArticles.data } };
  } catch (e) {
    return { props: {} };
  }
}

ListOfWeeklyArticles.getLayout = function getLayout(page: ReactElement) {
  return <AlertLayout>{page}</AlertLayout>;
};

export default ListOfWeeklyArticles;
