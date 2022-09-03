import { StyledPageContainer } from '@kol-amelamdim/styled';
import { Typography, styled } from '@mui/material';
import axios from '../../api';

const WeeklyArticleContainer = styled(StyledPageContainer)`
  padding: 125px 0 70px;
  h1,
  h2,
  p {
    margin: 0;
  }
`;

const Index = ({ activeArticle }) => {
  return (
    <WeeklyArticleContainer>
      <Typography variant="h1" component="h1">
        {activeArticle.title}
      </Typography>
      <Typography variant="h2" component="h2">
        {activeArticle.description}
      </Typography>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: activeArticle.content }}
      ></div>
    </WeeklyArticleContainer>
  );
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
