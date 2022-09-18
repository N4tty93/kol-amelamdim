import { StyledPageContainer } from '@kol-amelamdim/styled';
import { Typography, styled } from '@mui/material';
import axios from '../../api';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../next-i18next.config';
import { useTranslation } from 'next-i18next';

const WeeklyArticleContainer = styled(StyledPageContainer)`
  padding: 125px 0 70px;
  h1,
  h2,
  p {
    margin: 0;
  }
`;

const Index = ({ activeArticle }) => {
  const { t } = useTranslation('weekly-article');
  if (activeArticle.content && activeArticle.title) {
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
  } else {
    return (
      <WeeklyArticleContainer>
        <Typography variant="h2" align="center">
          {t('no-article-h2')}
        </Typography>
        <Typography variant="h3" align="center">
          {t('no-article-h3')}
        </Typography>
      </WeeklyArticleContainer>
    );
  }
};

export async function getServerSideProps({ locale }) {
  try {
    const activeArticle = await axios.get('/api/get-active-weekly-article');
    return {
      props: {
        activeArticle: activeArticle.data,
        ...(await serverSideTranslations(
          locale,
          ['weekly-article'],
          i18nConfig
        )),
      },
    };
  } catch (e) {
    return {
      props: {
        ...(await serverSideTranslations(
          locale,
          ['weekly-article'],
          i18nConfig
        )),
      },
    };
  }
}

export default Index;
