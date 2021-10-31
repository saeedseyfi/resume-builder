import 'styles/globals.css';

import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider as EmotionCacheProvider } from '@emotion/react';
import Head from 'next/head';

import { RTL_THEME, THEME } from '~conf/mui';
import { I18nProvider } from '~ctx/i18n';
import { createEmotionCache } from '~util/emotion';
import { ensureLocale } from '~util/i18n/is-locale-valid';

const MyApp: React.FC<AppProps> = ({
  Component,
  pageProps,
  router: { locale: rawLocale },
}: AppProps) => {
  const locale = ensureLocale(rawLocale);
  const emotionCache = createEmotionCache(locale);

  useEffect(() => {
    const html = document.querySelector('html');
    html?.setAttribute('dir', locale === 'fa' ? 'rtl' : 'ltr');
  }, [locale]);

  return (
    <>
      <Head>
        <meta content="initial-scale=1, width=device-width" name="viewport" />
        <title>Resume Builder</title>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>

      <EmotionCacheProvider value={emotionCache}>
        <ThemeProvider theme={locale === 'fa' ? RTL_THEME : THEME}>
          <CssBaseline />
          <I18nProvider locale={locale}>
            <Component {...pageProps} />
          </I18nProvider>
        </ThemeProvider>
      </EmotionCacheProvider>
    </>
  );
};

export default MyApp;
