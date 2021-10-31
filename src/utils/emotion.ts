import createCache, { StylisPlugin } from '@emotion/cache';
import { EmotionCache } from '@emotion/utils';
import rtlPlugin from 'stylis-plugin-rtl';

import { Locale } from '~type';

export const createEmotionCache = (locale: Locale): EmotionCache => {
  return createCache({
    key: 'css',
    stylisPlugins: [...(locale === 'fa' ? [rtlPlugin as StylisPlugin] : [])],
  });
};
