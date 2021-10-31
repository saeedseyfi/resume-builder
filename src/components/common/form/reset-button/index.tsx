import { Button, ButtonProps } from '@mui/material';
import React, { useCallback } from 'react';

import { useFormikContext } from 'formik';

export const ResetButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  ...rest
}) => {
  const { resetForm, initialValues, submitForm } = useFormikContext();
  const reset = useCallback(
    e => {
      resetForm({ values: initialValues });
      submitForm().then(() => {
        onClick?.(e);
      });
    },
    [initialValues, onClick, resetForm, submitForm]
  );
  const handleClick = useCallback(
    e => {
      reset(e);
    },
    [reset]
  );

  return (
    <Button onClick={handleClick} {...rest}>
      {children}
    </Button>
  );
};
