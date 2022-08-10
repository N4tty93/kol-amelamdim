import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import theme from '../theme';
import { Navbar } from '../components';
import './styles.css';
import { AlertContextProvider } from '@kol-amelamdim/context';

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
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
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
            <CssBaseline />
            <Navbar />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </AlertContextProvider>
      </RTL>
    </>
  );
}

export default KolAmelamdimApp;
