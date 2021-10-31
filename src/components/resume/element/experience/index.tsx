import { Box, Grid, Typography } from '@mui/material';
import { DateRange, Place } from '@mui/icons-material';
import React from 'react';

import { ElementProps, ExperiencePageElement } from '~type/resume';

interface ExperienceProps extends ElementProps {
  element: ExperiencePageElement;
}

export const Experience: React.FC<ExperienceProps> = ({
  element: { location, name, namePrefix, timespan, title, url },
  className,
}) => {
  return (
    <Box className={className} mb={1}>
      <Typography component="h3" mb={0.5} variant="h3">
        {title}
      </Typography>

      <Grid justifyContent={'space-between'} container>
        <Grid item>
          {namePrefix && (
            <Typography component="span" variant="body1">
              {namePrefix}{' '}
            </Typography>
          )}

          <Typography
            component="span"
            sx={{ color: 'var(--color-accent)' }} // TODO use theme
            variant="subtitle2"
          >
            {url ? (
              <a href={url} rel="noreferrer" target={'_blank'}>
                {name}
              </a>
            ) : (
              name
            )}
          </Typography>
        </Grid>

        {timespan && (
          <Grid item>
            <Typography component="span" variant="body1">
              <DateRange
                fontSize={'inherit'}
                sx={{
                  color: 'var(--color-accent)', // TODO use theme
                  transform: 'translate(0, 2px)',
                }}
              />
              {timespan}
            </Typography>
          </Grid>
        )}

        {location && (
          <Grid item>
            <Typography component="span" variant="body1">
              <Place
                fontSize={'inherit'}
                sx={{
                  color: 'var(--color-accent)', // TODO use theme
                  transform: 'translate(0, 2px)',
                }}
              />
              {location}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
