import { FormikProps } from 'formik';
import React from 'react';

import { FormikField } from '~comp/mui/formik-field';
import { T } from '~comp/i18n';
import { TextPageElement } from '~type/resume';
import { keyCheck } from '~util/key-check';

export const Fields: React.FC<FormikProps<TextPageElement>> = ({ values }) => (
  <>
    <FormikField
      helperText={
        <>
          <a href="https://stackedit.io/app" rel="noreferrer" target="_blank">
            <T>MARKDOWN_HELPER_TEXT</T>
          </a>
          <br />
          <T>REQUIRED</T>
        </>
      }
      label={<T>TEXT</T>}
      maxRows={undefined}
      name={keyCheck(values, 'text')}
      autoFocus
      multiline
    />
  </>
);
