import { styled } from '@mui/material';
import { Dialog as MuiDialog } from '@mui/material';
import { MOBILE_QUERY } from '@kol-amelamdim/constants';

export const Dialog = styled(MuiDialog)`
  .MuiPaper-root {
    width: 750px;
    min-height: 550px;
    padding: 30px;

    @media ${MOBILE_QUERY} {
      width: auto;
      min-height: 450px;
      padding: 15px;
      margin: 15px;
    }
  }
`;

export const FormError = styled('div')`
  margin: 10px 0;
  color: ${(props) => props.theme.palette.error.main};
`;

export const StyledPage = styled('div')`
  font-family: ${(props) => props.theme.fonts.regular};
  padding-top: 25px;
`;
