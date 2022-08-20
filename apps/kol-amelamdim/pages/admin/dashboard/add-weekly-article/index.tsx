import { useState } from 'react';
import { styled, Button, Grid } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <div>loading content editor...</div>,
});
import { StyledPageContainer } from '@kol-amelamdim/styled';
import { useRouter } from 'next/router';

const ContentEditor = styled(QuillNoSSRWrapper)`
  & .ql-editor {
    direction: rtl;
    font-family: ${(props) => props.theme.fonts.regular};
    h1,
    h2,
    ul,
    li,
    p {
      text-align: left;
    }
  }

  & .ql-container {
    height: 445px;
  }
`;

const AddWeeklyArticle = () => {
  const [weeklyArticleContent, setWeeklyArticleContent] = useState('');
  const router = useRouter();

  return (
    <StyledPageContainer>
      <Button onClick={() => router.push('/admin/dashboard')} sx={{ mb: 2 }}>
        חזור לדף ניהול
      </Button>

      <ContentEditor
        value={weeklyArticleContent}
        onChange={setWeeklyArticleContent}
        modules={editorModules}
      />
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Button variant="contained" sx={{ mt: 2 }}>
            הוספת מאמר שבועי
          </Button>
        </Grid>
      </Grid>
    </StyledPageContainer>
  );
};

const editorModules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    [{ direction: 'rtl' }],
  ],
};

export default AddWeeklyArticle;
