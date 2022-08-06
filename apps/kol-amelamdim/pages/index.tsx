import { styled, Container } from '@mui/material';

const StyledPage = styled('div')`
  background: ${(props) => props.theme.palette.primary.light};
  min-height: 100vh;
  font-family: ${(props) => props.theme.fonts.regular};
`;

export function Index() {
  return (
    <StyledPage>
      <Container>כל המלמדים</Container>
    </StyledPage>
  );
}

export default Index;
