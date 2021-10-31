import { FormikProps } from 'formik';
import React from 'react';

import { DividerPageElement } from '~type/resume';
import { FormikField } from '~comp/mui/formik-field';
import { T } from '~comp/i18n';
import { keyCheck } from '~util/key-check';

export const Fields: React.FC<FormikProps<DividerPageElement>> = ({
  values,
}) => (
  <>
    <FormikField
      helperText={<T>REQUIRED</T>}
      label={<T>SPACE_TOP</T>}
      name={keyCheck(values, 'spaceTop')}
      type="number"
      autoFocus
    />

    <FormikField
      helperText={<T>REQUIRED</T>}
      label={<T>SPACE_BOTTOM</T>}
      name={keyCheck(values, 'spaceBottom')}
      type="number"
    />
  </>
);
