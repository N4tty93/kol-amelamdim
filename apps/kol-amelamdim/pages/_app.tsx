import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { i18n } from 'next-i18next';
import { prefixer } from 'stylis';
import theme from '../theme';
import { Navbar, Footer } from '../components';
import './styles.css';
import { AlertContextProvider } from '../context/alert-context-provider';
import { AuthProvider } from '../context/auth-context-provider';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

function RTL(props) {
  if (i18n.language === 'he') {
    return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
  } else return props.children;
}

function KolAmelamdimApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>כל המלמדים</title>
      </Head>

      <RTL>
        <AlertContextProvider>
          <ThemeProvider theme={theme}>
            <AuthProvider>
              <CssBaseline />

              {getLayout(
                <>
                  <Navbar />
                  <Component {...pageProps} />
                  <Footer />
                </>
              )}
            </AuthProvider>
          </ThemeProvider>
        </AlertContextProvider>
      </RTL>
    </>
  );
}

export default appWithTranslation(KolAmelamdimApp);
