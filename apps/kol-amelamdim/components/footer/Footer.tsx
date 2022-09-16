import { styled, Typography, Grid } from '@mui/material';
import { EmailIcon, WhatsappIcon } from 'react-share';

const StyledFooter = styled('footer')`
  min-height: 150px;
  background: #e4e3e3;
  padding: 24px;
  position: relative;
`;

const Rights = styled(Typography)`
  font-weight: bold;
`;

export const Footer = () => {
  return (
    <StyledFooter>
      <Rights align="center">כל הזכויות שמורות לאתר כל המלמדים&#169; </Rights>
      <Typography align="center" sx={{ mt: 2, mb: 2 }}>
        צרו קשר:
      </Typography>
      <Grid container justifyContent="center" spacing={4}>
        <Grid item>
          <WhatsappIcon
            round
            onClick={() => window.open('https://wa.me/+972556875251')}
          />
        </Grid>
        <Grid item>
          {/* TODO: ask Refael for his email */}
          <EmailIcon
            round
            onClick={() => {
              window.location.href = 'mailto:emailofnetanel@gmail.com';
            }}
          />
        </Grid>
      </Grid>
    </StyledFooter>
  );
};
