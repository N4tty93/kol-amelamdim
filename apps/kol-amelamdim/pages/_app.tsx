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

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

function RTL(props) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}

function KolAmelamdimApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>כל המלמדים</title>
      </Head>

      <main className="app">
        <RTL>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <Component {...pageProps} />
          </ThemeProvider>
        </RTL>
      </main>
    </>
  );
}

export default KolAmelamdimApp;
