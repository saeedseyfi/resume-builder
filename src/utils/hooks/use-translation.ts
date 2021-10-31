import { useContext } from 'react';

import { I18nContext } from '~ctx/i18n';
import { Translate } from '~type';
import { translate } from '~util/i18n';

export const useTranslation = (): Translate => {
  const { translations } = useContext(I18nContext);
  return translate(translations);
};
