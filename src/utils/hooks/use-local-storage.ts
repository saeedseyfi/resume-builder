import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const useLocalStorage = <T>(
  key: string,
  defaultValue: T,
  storage = 'localStorage' as 'localStorage' | 'sessionStorage'
): [T, Dispatch<SetStateAction<T>>] => {
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (!mounted) {
      const item = window[storage].getItem(key);
      setValue(item ? JSON.parse(item) : defaultValue);
      setMounted(true);
      return;
    }
  }, [defaultValue, key, mounted, storage]);

  useEffect(() => {
    try {
      if (typeof value === 'undefined') {
        window[storage].removeItem(key);
      } else {
        window[storage].setItem(key, JSON.stringify(value));
      }
    } catch (e) {
      console.log(e);
    }
  }, [key, storage, value]);

  return [value, setValue];
};
