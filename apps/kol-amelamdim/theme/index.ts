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
    // eslint-disable-next-line @typescript-eslint/ban-types
    overrides?: {};
  }
  interface ThemeOptions {
    // eslint-disable-next-line @typescript-eslint/ban-types
    fonts?: Fonts;
    // eslint-disable-next-line @typescript-eslint/ban-types
    overrides?: {};
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
      dark: '#4a4a4a',
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
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: {
          backgroundColor: themeParam.palette.primary.light,
          fontSize: '22px',
          color: '#4a4a4a',
          fontFamily: themeParam.fonts.regular,
        },
      }),
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: '80px',
          minHeight: '100vh',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: '60px',
          fontFamily: 'OpenSansHebrewBold',
          '@media (max-width: 600px)': {
            fontSize: '50px',
          },
        },
        h2: {
          fontSize: '45px',
          fontFamily: 'OpenSansHebrewBold',
        },
        h3: {
          fontSize: '35px',
          fontFamily: 'OpenSansHebrewBold',
          '@media (max-width: 600px)': {
            fontSize: '30px',
          },
        },
        body1: {
          fontSize: '22px',
          fontFamily: 'OpenSansHebrewBold',
        },
      },
    },
  },
}) as ThemeOptions;

export default theme;
