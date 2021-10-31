import { Box, Grid, Icon, Typography } from '@mui/material';
import React from 'react';

import { ElementProps, HeadPageElement } from '~type/resume';

interface HeadProps extends ElementProps {
  element: HeadPageElement;
}

export const Head: React.FC<HeadProps> = ({
  element: { photo, title, contact, name },
  className,
}) => {
  return (
    <Box className={className} component={'header'} display={'flex'}>
      <Grid spacing={1} container>
        <Grid xs={photo ? 10 : 12} item>
          <Typography
            sx={{
              lineHeight: 1,
              textTransform: 'uppercase',
            }}
            variant={'h1'}
          >
            {name}
          </Typography>

          <Typography
            component={'span'}
            sx={{
              color: 'var(--color-accent)', // TODO use theme
              display: 'block',
              fontSize: '1.5rem',
              mb: 2,
            }}
            variant={'subtitle1'}
          >
            {title}
          </Typography>

          <Grid
            component={'ul'}
            sx={{ listStyle: 'none', m: 0, p: 0 }}
            container
          >
            {contact.map(({ text, icon, link }) => (
              <Grid key={text} component={'li'} xs={4} item>
                <Typography
                  sx={{ color: 'var(--color-dark)' }}
                  {...(link
                    ? {
                        component: 'a',
                        href: link,
                        rel: 'noreferrer',
                        target: '_blank',
                      }
                    : {
                        component: 'span',
                      })}
                  variant={'body2'}
                >
                  {icon ? (
                    <Icon
                      sx={{
                        color: 'var(--color-accent)',
                        fontSize: '1em',
                        verticalAlign: 'middle',
                      }}
                    >
                      {icon}
                    </Icon>
                  ) : (
                    <span style={{ display: 'inline-block', width: '1em' }}>
                      &nbsp;
                    </span>
                  )}{' '}
                  {text}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
        {photo && (
          <Grid xs={2} item>
            <Box
              alt={name}
              borderRadius={1}
              component={'img'}
              src={photo}
              width={'100%'}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
