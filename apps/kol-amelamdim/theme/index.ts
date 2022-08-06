import { createTheme, ThemeOptions } from '@mui/material/styles';

type Fonts = {
  regular: string;
  bold: string;
  italic: string;
  light: string;
};

declare module '@mui/material/styles' {
  interface Theme {
    fonts?: Fonts;
  }
  interface ThemeOptions {
    // eslint-disable-next-line @typescript-eslint/ban-types
    fonts?: Fonts;
  }
}

const theme: ThemeOptions = createTheme({
  direction: 'rtl',
  typography: {
    htmlFontSize: 10,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      'OpenSansHebrew',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#356559',
      light: '#FEFDFD',
    },
    secondary: {
      main: '#D48245',
    },
  },
  fonts: {
    regular: 'OpenSansHebrew',
    bold: 'OpenSansHebrewBold',
    italic: 'OpenSansHebrewItalic',
    light: 'OpenSansHebrewLight',
  },
}) as ThemeOptions;

export default theme;
