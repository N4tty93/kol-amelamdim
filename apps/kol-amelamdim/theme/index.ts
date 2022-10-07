import { createTheme, ThemeOptions } from '@mui/material/styles';
import { heIL } from '@mui/material/locale';

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

const theme: ThemeOptions = createTheme(
  {
    direction: 'rtl',
    typography: {
      htmlFontSize: 10,
      fontFamily: [
        'OpenSansHebrew',
        '-apple-system',
        'BlinkMacSystemFont',
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
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: '22px',
            '@media (max-width: 600px)': {
              fontSize: '19px',
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            '@media (max-width: 600px)': {
              fontSize: '19px',
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            '@media (max-width: 600px)': {
              fontSize: '19px',
            },
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            '@media (max-width: 600px)': {
              fontSize: '19px',
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            '@media (max-width: 600px)': {
              fontSize: '19px',
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: 'OpenSansHebrewBold',
          },
          h1: {
            fontSize: '60px',
            '@media (max-width: 600px)': {
              fontSize: '50px',
            },
          },
          h2: {
            fontSize: '45px',
            '@media (max-width: 600px)': {
              fontSize: '30px',
            },
          },
          h3: {
            fontSize: '35px',
            '@media (max-width: 600px)': {
              fontSize: '27px',
            },
          },
          body1: {
            fontSize: '22px',
            fontFamily: 'OpenSansHebrew',
          },
        },
      },
    },
  },
  heIL
) as ThemeOptions;

export default theme;
