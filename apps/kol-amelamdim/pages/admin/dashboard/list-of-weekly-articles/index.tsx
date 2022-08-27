import { useState } from 'react';
import axios from '../../../../api';
import { useRouter } from 'next/router';
import { Button, Divider, Grid, Typography } from '@mui/material';
import { StyledPageContainer } from '@kol-amelamdim/styled';

const updateWeeklyArticle = async (id: string) => {
  return await axios.post('/api/admin/update-weekly-post', { id });
};

const getAllWeeklyArticles = async () => {
  return await axios.get('/api/admin/get-weekly-posts');
};

const ListOfWeeklyArticles = ({ weeklyPosts }) => {
  const [posts, setPosts] = useState(weeklyPosts);
  const router = useRouter();

  if (!weeklyPosts.length) return null;

  return (
    <StyledPageContainer>
      <Button onClick={() => router.push('/admin/dashboard')} sx={{ mb: 2 }}>
        חזור לדף ניהול
      </Button>
      {posts.map(({ _id, title, isActiveArticle }) => {
        return (
          <div key={_id}>
            <Grid container alignItems="center" spacing={4} sx={{ m: 2 }}>
              <Grid item xs={6}>
                <Typography>{title}</Typography>
              </Grid>

              <Grid item xs={6} container>
                <Button
                  variant="contained"
                  disabled={isActiveArticle}
                  onClick={async () => {
                    await updateWeeklyArticle(_id);
                    getAllWeeklyArticles().then((res) => {
                      setPosts(res.data);
                    });
                  }}
                >
                  קבע כפוסט השבועי
                </Button>
                <Button variant="outlined" sx={{ ml: 2 }}>
                  עריכת פוסט
                </Button>
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
    const weeklyPosts = await getAllWeeklyArticles();
    console.log(weeklyPosts);
    return { props: { weeklyPosts: weeklyPosts.data } };
  } catch (e) {
    return { props: {} };
  }
}

export default ListOfWeeklyArticles;
