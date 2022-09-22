import {
  styled,
  Typography,
  Button,
  Grid,
  Divider,
  Card,
  TextField,
  useMediaQuery,
} from '@mui/material';
import { useState, ReactElement, useContext } from 'react';
import { useRouter } from 'next/router';
import { MOBILE_QUERY } from '@kol-amelamdim/constants';
import { Categories } from '@kol-amelamdim/types';
import { UploadFileDialog } from '../components';
import { AlertLayout } from '../layouts';
import { AuthContext } from '../context/auth-context-provider';
import { StyledPageContainer, FormError } from '@kol-amelamdim/styled';
import validator from 'validator';
import axios from '../api';
import { AlertContext } from '../context/alert-context-provider';
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

export function Home({ activeArticle }) {
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerQuestion, setCustomerQuestion] = useState('');
  const [formError, setFormError] = useState('');
  const { isAuthenticated } = useContext(AuthContext);
  const [isUploadFileDialogOpen, setIsUploadFileDialogOpen] = useState(false);
  const { setAlertMessage, setAlertType } = useContext(AlertContext);
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const router = useRouter();
  const submitButtonStyles = { ml: isMobile ? 0 : 2, mt: isMobile ? 2 : 0 };

  const handleShareContentButtonClick = () => {
    if (isAuthenticated) {
      setIsUploadFileDialogOpen(true);
    } else {
      router.push('/login');
    }
  };

  const handleSendCustomerQuestion = async (e) => {
    e.preventDefault();
    if (!customerQuestion || !customerEmail) {
      return setFormError('נא לוודא שכל השדות מלאים');
    } else if (!validator.isEmail(customerEmail)) {
      return setFormError('כתובת אימייל לא חוקית');
    }

    try {
      await axios.post('/api/contact-us', {
        customerEmail,
        customerQuestion,
        from: 'kol-amelamdim-website',
      });
      setFormError('');
      setCustomerEmail('');
      setCustomerQuestion('');
      setAlertType('success');
      setAlertMessage('הטופס נקלט בהצלחה.');
    } catch (e) {
      setFormError(e.response.data);
    }
  };

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
      <Grid container sx={{ mt: 3 }}>
        <Grid item sx={{ mr: '10px' }}>
          <Button
            size="large"
            variant="contained"
            onClick={handleShareContentButtonClick}
          >
            {t('share-btn')}
          </Button>
        </Grid>
        <Grid item>
          <Button
            size="large"
            variant="outlined"
            onClick={() => router.push('/#learn-categories')}
          >
            {t('download-btn')}
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ pt: 7, mb: 7 }} id="learn-categories" />

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

      {activeArticle && (
        <>
          <Grid container direction="column">
            <Typography variant="h3" component="h3">
              מאמר השבוע - {activeArticle?.title}
            </Typography>
            <Typography>{activeArticle?.description}</Typography>
            <Button
              variant="text"
              sx={{
                width: '165px',
                padding: 0,
                justifyContent: 'flex-start',
                mt: 1,
              }}
              onClick={() => router.push('/weekly-article')}
            >
              לקריאה לחצו כאן
            </Button>
          </Grid>
          <Divider sx={{ pt: 7, mb: 7 }} />
        </>
      )}

      <Grid container direction="column">
        <Grid item>
          <Typography variant="h3" component="h3">
            בואו נשאר בקשר
          </Typography>
        </Grid>
        <Grid item>
          <Typography>השאירו לנו הודעה ונחזור אליכם בהקדם</Typography>
        </Grid>

        <form onSubmit={handleSendCustomerQuestion}>
          <Grid item container sx={{ mt: 2 }} spacing={2} direction="column">
            <Grid item xs={12}>
              <TextField
                sx={{ width: isMobile ? '100%' : '450px' }}
                label="כתובת מייל"
                value={customerEmail}
                error={!!formError}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction={isMobile ? 'column' : 'row'}
              alignItems={isMobile ? 'flex-start' : 'flex-end'}
            >
              <TextField
                sx={{ width: isMobile ? '100%' : '450px' }}
                label="מה בא לכם לשאול אותנו?"
                rows="4"
                multiline
                error={!!formError}
                value={customerQuestion}
                onChange={(e) => setCustomerQuestion(e.target.value)}
              />
              <Button
                variant="contained"
                sx={submitButtonStyles}
                size="large"
                type="submit"
              >
                שליחה
              </Button>
            </Grid>
          </Grid>
          {formError && <FormError>{formError}</FormError>}
        </form>
      </Grid>

      <Divider sx={{ pt: 7, mb: 7 }} />

      <UploadFileDialog
        isOpen={isUploadFileDialogOpen}
        onClose={() => setIsUploadFileDialogOpen(false)}
      />
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

export default Home;
