import { FormikProps } from 'formik';
import React from 'react';

import { FormikField } from '~comp/mui/formik-field';
import { SkillPageElement } from '~type/resume';
import { T } from '~comp/i18n';
import { keyCheck } from '~util/key-check';

export const Fields: React.FC<FormikProps<SkillPageElement>> = ({ values }) => (
  <>
    <FormikField
      helperText={<T>REQUIRED</T>}
      label={<T>TITLE</T>}
      name={keyCheck(values, 'title')}
      autoFocus
    />

    <FormikField label={<T>SUB_TITLE</T>} name={keyCheck(values, 'subTitle')} />

    <FormikField
      label={<T>RATED</T>}
      name={keyCheck(values, 'rated')}
      type="checkbox"
    />

    <FormikField
      disabled={!values.rated}
      label={<T>RATE</T>}
      name={keyCheck(values, 'rate')}
      type="number"
    />
  </>
);
