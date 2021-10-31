import { ButtonProps } from '@mui/material/Button/Button';
import { IconButton } from '@mui/material';
import React from 'react';

// https://github.com/mui-org/material-ui/issues/17226#issuecomment-672980848
export const ButtonGroupIconButton: React.FC<ButtonProps> = props => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { disableElevation, fullWidth, variant, ...iconButtonProps } = props;
  return <IconButton {...iconButtonProps} />;
};
