import { LOCALES } from '~conf/i18n';

export type UnknownFunc = (...args: unknown[]) => unknown;

export type Locale = typeof LOCALES[number];

export type Translations = { [k: string]: string };

export type TranslateArgs = { [k: string]: unknown };

export type Translate = (key: string, args?: TranslateArgs) => string;
