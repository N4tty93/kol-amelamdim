import { useState } from 'react';
import { styled, Button, Grid, TextField, Typography } from '@mui/material';
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
    font-family: ${(props) => props.theme.fonts.regular};
    h1 {
      font-size: 50px;
    }

    h2 {
      font-size: 45px;
    }

    ul,
    li,
    p {
      text-align: left;
      font-size: 25px;
    }
  }

  & .ql-container {
    height: 445px;
  }
`;

export const StyledGrid = styled(Grid)`
  & .MuiTextField-root {
    width: 100%;
  }
`;

const AddWeeklyArticle = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [weeklyArticleContent, setWeeklyArticleContent] = useState('');
  const router = useRouter();

  return (
    <StyledPageContainer>
      <Button onClick={() => router.push('/admin/dashboard')} sx={{ mb: 2 }}>
        חזור לדף ניהול
      </Button>

      <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
        הוספת מאמר שבועי
      </Typography>
      <StyledGrid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <TextField
            label="כותרת המאמר"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="תיאור המאמר"
            value={description}
            multiline
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
      </StyledGrid>

      <ContentEditor
        value={weeklyArticleContent}
        onChange={setWeeklyArticleContent}
        modules={editorModules}
      />
      <Grid container justifyContent="flex-end" sx={{ pb: '100px' }}>
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