import { Button, ButtonProps } from '@mui/material';
import React, { useCallback } from 'react';
import { useFormikContext } from 'formik';

export const SubmitButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  ...rest
}) => {
  const { submitForm } = useFormikContext();
  const handleClick = useCallback(
    e => {
      e.preventDefault(); // to get rid of warning: "Form submission canceled because the form is not connected"

      submitForm().then(() => {
        onClick?.(e);
      });
    },
    [onClick, submitForm]
  );

  return (
    <Button type={'submit'} onClick={handleClick} {...rest}>
      {children}
    </Button>
  );
};
