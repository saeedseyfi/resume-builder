import { FormikProps } from 'formik';
import React from 'react';

import { ExperiencePageElement } from '~type/resume';
import { FormikField } from '~comp/mui/formik-field';
import { T } from '~comp/i18n';
import { keyCheck } from '~util/key-check';

export const Fields: React.FC<FormikProps<ExperiencePageElement>> = ({
  values,
}) => (
  <>
    <FormikField
      helperText={<T>REQUIRED</T>}
      label={<T>TITLE</T>}
      name={keyCheck(values, 'title')}
      autoFocus
    />

    <FormikField
      label={<T>NAME_PREFIX</T>}
      name={keyCheck(values, 'namePrefix')}
    />

    <FormikField
      helperText={<T>REQUIRED</T>}
      label={<T>NAME</T>}
      name={keyCheck(values, 'name')}
    />

    <FormikField label={<T>URL</T>} name={keyCheck(values, 'url')} />

    <FormikField label={<T>TIMESPAN</T>} name={keyCheck(values, 'timespan')} />

    <FormikField label={<T>LOCATION</T>} name={keyCheck(values, 'location')} />
  </>
);
