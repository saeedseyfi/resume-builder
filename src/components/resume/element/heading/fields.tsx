import { FormikProps } from 'formik';
import React from 'react';

import { FormikField } from '~comp/mui/formik-field';
import { HeadingPageElement } from '~type/resume';
import { T } from '~comp/i18n';
import { keyCheck } from '~util/key-check';

export const Fields: React.FC<FormikProps<HeadingPageElement>> = ({
  values,
}) => (
  <>
    <FormikField
      helperText={<T>REQUIRED</T>}
      label={<T>TEXT</T>}
      name={keyCheck(values, 'text')}
      autoFocus
    />
  </>
);
