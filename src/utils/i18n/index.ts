import { JsonValue } from 'type-fest';
import { setLocale } from 'yup';
import tmpl from 'tmpl';

import { Locale, Translate, Translations } from '~type';

import { isLocaleValid } from './is-locale-valid';

type GetTranslations = (
  locale?: Locale | JsonValue
) => Promise<Translations | undefined>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const untranslated = (global.untranslated = new Set<string>());

export const getTranslations: GetTranslations = async locale => {
  if (!isLocaleValid(locale)) {
    console.error(new Error(`Invalid locale provided: ${locale}`));
    return undefined;
  }

  return import(`./${locale}.json`)
    .then(module => module.default as Translations)
    .catch(e => {
      console.error('Unable to read translation file:', e);
      return undefined;
    });
};

export const translate: (translations: Translations) => Translate =
  translations => (key, args) => {
    const value = translations?.[key];
    if (!value) {
      // log once
      if (untranslated.size == 0)
        console.warn('Untranslated label found.', 'check untranslated.keys()');
      untranslated.add(key);
      return key;
    }
    return args ? tmpl(value, args) : value;
  };

export const initYupValidationMessages = () => {
  setLocale({
    mixed: {
      oneOf: 'FORM_VALIDATION_ERROR.MISMATCH',
      required: 'FORM_VALIDATION_ERROR.REQUIRED',
    },
    number: {
      max: 'FORM_VALIDATION_ERROR.MAX',
      min: 'FORM_VALIDATION_ERROR.MIN',
    },
  });
};
