import { Box, Typography } from '@mui/material';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ReactMarkdownProps } from 'react-markdown/lib/ast-to-react';

import { ElementProps, TextPageElement } from '~type/resume';

const P: React.FC<ReactMarkdownProps> = ({ children }) => (
  <Typography mb={1} variant={'body1'}>
    {children}
  </Typography>
);

const Ul: React.FC<ReactMarkdownProps> = ({ children }) => (
  <Typography
    component={'ul'}
    mb={1}
    mt={0}
    sx={{ paddingInlineStart: '2em' }}
    variant={'body1'}
  >
    {children}
  </Typography>
);

const Ol: React.FC<ReactMarkdownProps> = ({ children }) => (
  <Typography
    component={'ol'}
    mb={1}
    mt={0}
    sx={{ paddingInlineStart: '2em' }}
    variant={'body1'}
  >
    {children}
  </Typography>
);

interface TextProps extends ElementProps {
  element: TextPageElement;
}

const Md: React.FC<TextProps> = ({ element: { text }, className }) => (
  <ReactMarkdown
    className={className}
    components={{
      h1: 'h2',
      h2: 'h3',
      h3: 'h4',
      h4: 'h5',
      h5: 'h6',
      ol: Ol,
      p: P,
      ul: Ul,
    }}
  >
    {text}
  </ReactMarkdown>
);

export const Text: React.FC<TextProps> = props => {
  return (
    <Box
      component={Md}
      {...props}
      sx={{
        ['> :last-child']: {
          mb: 0,
        },
      }}
    />
  );
};
