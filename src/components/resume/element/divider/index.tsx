import { Box } from '@mui/material';
import React from 'react';

import { DividerPageElement, ElementProps } from '~type/resume';

interface DividerProps extends ElementProps {
  element: DividerPageElement;
}

export const Divider: React.FC<DividerProps> = ({
  element: { spaceTop, spaceBottom },
  className,
}) => {
  return (
    <Box
      className={className}
      component={'hr'}
      m={0}
      mb={spaceBottom}
      mt={spaceTop}
      sx={{
        borderBottom: 'none',
        borderTop: '1px dashed var(--color-lightgray)',
      }}
    />
  );
};
