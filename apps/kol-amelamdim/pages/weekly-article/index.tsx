import { StyledPageContainer } from '@kol-amelamdim/styled';
import { Typography, styled } from '@mui/material';
import axios from '../../api';

const WeeklyArticleContainer = styled(StyledPageContainer)`
  padding: 125px 0 70px;
  h1,
  p {
    margin: 0;
  }
`;

const Index = ({ activeArticle }) => {
  if (activeArticle.content && activeArticle.title) {
    return (
      <WeeklyArticleContainer>
        <Typography variant="h1" component="h1">
          {activeArticle.title}
        </Typography>
        <Typography variant="h2" component="h2" sx={{ mb: 3 }}>
          {activeArticle.description}
        </Typography>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: activeArticle.content }}
        ></div>
      </WeeklyArticleContainer>
    );
  } else {
    return (
      <WeeklyArticleContainer>
        <Typography variant="h2" align="center">
          לא הצלחנו להציג את המאמר המבוקש.
        </Typography>
        <Typography variant="h3" align="center">
          נא לנסות שוב מאוחר יותר
        </Typography>
      </WeeklyArticleContainer>
    );
  }
};

export async function getServerSideProps() {
  try {
    const activeArticle = await axios.get('/api/get-active-weekly-article');
    return {
      props: { activeArticle: activeArticle.data },
    };
  } catch (e) {
    return { props: {} };
  }
}

export default Index;
