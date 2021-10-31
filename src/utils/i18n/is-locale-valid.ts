import { LOCALES } from '~conf/i18n';
import { Locale } from '~type';

type RawLocale = unknown;

export const isLocaleValid = (locale: RawLocale): boolean =>
  typeof locale === 'string' && LOCALES.includes(locale as Locale);

export const ensureLocale = (
  locale: RawLocale,
  error = new Error(`Locale(${locale}) is not valid`)
): Locale => {
  if (isLocaleValid(locale)) {
    return locale as Locale;
  }

  throw error;
};
