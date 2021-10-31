import React, { useEffect, useState } from 'react';

import { Locale, Translations } from '~type';
import { getTranslations } from '~util/i18n';

export interface I18nContextType {
  translations: Translations;
}

export const I18nContext = React.createContext<I18nContextType>({
  translations: {},
});

type PlanContextProviderProps = {
  translations?: Translations;
  locale: Locale;
};

export const I18nProvider: React.FC<PlanContextProviderProps> = ({
  translations: preFetchedTranslations,
  locale,
  children,
}) => {
  const [translations, setTranslations] = useState(preFetchedTranslations);

  useEffect(() => {
    if (!translations && locale) getTranslations(locale).then(setTranslations); // find a way to cancel promise on unmount
  }, [locale, translations]);

  return translations ? (
    <I18nContext.Provider value={{ translations }}>
      {children}
    </I18nContext.Provider>
  ) : null;
};
