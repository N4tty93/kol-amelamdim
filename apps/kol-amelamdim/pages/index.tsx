import { styled, Typography, Button, Grid, Divider, Card } from '@mui/material';
import { useState, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { MOBILE_QUERY } from '@kol-amelamdim/constants';
import { Categories } from '@kol-amelamdim/types';
import { UploadFileDialog } from '../components';
import { AlertLayout } from '../layouts';
import { StyledPageContainer } from '@kol-amelamdim/styled';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPropsContext } from 'next';
import i18nConfig from '../next-i18next.config';
import { useTranslation } from 'next-i18next';

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

  const translation = useTranslation('home');
  const { t, i18n } = translation;

  return (
    <StyledPageContainer>
      <Typography variant="h1" component="h1">
        {t('h1')}
      </Typography>
      <Typography variant="h3" component="h2" sx={{ mt: 2 }}>
        {t('h2')}
      </Typography>
      <Grid container sx={{ mt: 2 }}>
        <Grid item sx={{ mr: '10px' }}>
          <Button
            variant="contained"
            onClick={() => setIsUploadFileDialogOpen(true)}
          >
            {t('share-btn')}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined">{t('download-btn')}</Button>
        </Grid>
      </Grid>

      <Divider sx={{ pt: 7, mb: 7 }} />

      <Grid>
        <Typography variant="h3" component="h3">
          {t('categories-title')}
        </Typography>

        <Grid container sx={{ mt: 2 }}>
          {Categories.map((category) => (
            <Grid key={category.URL} item xs={6}>
              <CategoryCard
                onClick={() => router.push(`/category/${category.URL}`)}
              >
                {category[i18n.language]}
              </CategoryCard>
            </Grid>
          ))}
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

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['home'], i18nConfig)),
    },
  };
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <AlertLayout>{page}</AlertLayout>;
};

export default Home;
