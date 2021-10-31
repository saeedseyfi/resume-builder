import { useEffect } from 'react';

/* see https://www.w3.org/TR/uievents-key/#named-key-attribute-value for key names */
export const useKeyPress = (
  key: string,
  action: (e?: KeyboardEvent) => void
): void => {
  useEffect(() => {
    function onKeyup(e: KeyboardEvent) {
      if (e.key === key) action(e);
    }
    window.addEventListener('keydown', onKeyup);
    return () => window.removeEventListener('keydown', onKeyup);
  }, [action, key]);
};
