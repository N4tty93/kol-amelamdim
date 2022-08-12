import styled from '@emotion/styled';

export const SomeComponentForExample = styled.div``;

export const StyledPage = styled('div')`
  font-family: ${(props) => props.theme.fonts.regular};
  padding-top: 25px;
`;
