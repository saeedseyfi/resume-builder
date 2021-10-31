import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';

import { useDebounce } from '~hook/use-debounce';

type AutoSaveProps = {
  delay?: number;
};

export const AutoSave: React.FC<AutoSaveProps> = ({ delay }) => {
  const { submitForm, values } = useFormikContext();
  const debouncedValues = useDebounce(values, delay);

  useEffect(() => {
    submitForm();
  }, [submitForm, debouncedValues]);

  return null;
};
