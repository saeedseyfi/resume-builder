import React from 'react';

import { TranslateArgs } from '~type';
import { useTranslation } from '~hook/use-translation';

interface TProps extends TranslateArgs {
  children: string | string[];
}

export const T: React.FC<TProps> = ({ children, ...rest }) => {
  const key = Array.isArray(children) ? children.join('') : children;
  const t = useTranslation();
  return <>{t(key, rest)}</>;
};
