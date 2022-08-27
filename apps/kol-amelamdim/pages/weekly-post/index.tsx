import { StyledPageContainer } from '@kol-amelamdim/styled';
import { Typography } from '@mui/material';
import axios from '../../api';

const Index = ({ activePost }) => {
  return (
    <StyledPageContainer>
      <Typography variant="h1" component="h1">
        {activePost.title}
      </Typography>
      <Typography variant="h2" component="h2">
        {activePost.description}
      </Typography>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: activePost.content }}
      ></div>
    </StyledPageContainer>
  );
};

export async function getServerSideProps() {
  try {
    const activePost = await axios.get('/api/get-active-weekly-post');
    return {
      props: { activePost: activePost.data },
    };
  } catch (e) {
    return { props: {} };
  }
}

export default Index;
