import React from 'react';
import { Typography } from '@mui/material';

import { ElementProps, HeadingPageElement } from '~type/resume';

interface HeadingProps extends ElementProps {
  element: HeadingPageElement;
}

export const Heading: React.FC<HeadingProps> = ({
  element: { text },
  className,
}) => {
  return (
    <Typography
      className={className}
      sx={{
        borderBottom: '3px solid var(--color-dark)', // TODO use theme
        mb: 1,
        textTransform: 'uppercase',
      }}
      variant={'h2'}
    >
      {text}
    </Typography>
  );
};
