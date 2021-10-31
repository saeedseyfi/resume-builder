import { getIn, useFormikContext } from 'formik';
import { ReactNode } from 'react';

import { useTranslation } from '~hook/use-translation';

export const useFieldAttributes = ({
  name,
  helperText: defaultHelperText,
}: {
  name: string;
  helperText?: ReactNode;
}) => {
  const { errors, touched, values, handleChange, handleBlur } =
    useFormikContext<{ [key: string]: unknown }>();
  const t = useTranslation();
  const value = getIn(values, name);
  const isTouched = getIn(touched, name);
  const error = getIn(errors, name);
  const translatedError = error && t(error);
  const showError = isTouched && Boolean(error);
  const helperText = showError
    ? translatedError
    : defaultHelperText
    ? defaultHelperText
    : '‌'; // ZWNJ prevents moving elements when error messages are added

  return {
    handleBlur,
    handleChange,
    helperText,
    showError,
    value,
  };
};
