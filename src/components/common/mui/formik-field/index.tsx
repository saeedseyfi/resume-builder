import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  TextField,
} from '@mui/material';
import { BaseTextFieldProps } from '@mui/material/TextField/TextField';
import React from 'react';

import { useFieldAttributes } from '~hook/use-field-attributes';

interface FormikTextFieldProps extends BaseTextFieldProps {
  name: string;
}

export const FormikField: React.FC<FormikTextFieldProps> = ({
  name,
  helperText: defaultHelperText,
  type,
  label,
  ...rest
}) => {
  const { handleBlur, handleChange, helperText, showError, value } =
    useFieldAttributes({ helperText: defaultHelperText, name });

  if (type === 'checkbox') {
    return (
      <FormControl sx={{ display: 'flex' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={value}
              color="primary"
              name={name}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          }
          label={label}
        />
        <FormHelperText error={showError}>{helperText}</FormHelperText>
      </FormControl>
    );
  }

  return (
    <TextField
      error={showError}
      helperText={helperText}
      label={label}
      maxRows={5}
      name={name}
      type={type}
      value={value === undefined ? '' : value}
      fullWidth
      onBlur={handleBlur}
      onChange={handleChange}
      {...rest}
    />
  );
};
