import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

import { ElementProps, SkillPageElement } from '~type/resume';

interface SkillProps extends ElementProps {
  element: SkillPageElement;
}

export const Skill: React.FC<SkillProps> = ({
  element: { title, subTitle, rated, rate },
  className,
}) => {
  return (
    <Box className={className}>
      <Typography component={'h5'} variant={'body1'}>
        {title}

        {subTitle && (
          <Typography
            component={'span'}
            display={'block'}
            mt={0.5}
            variant={'body2'}
          >
            {subTitle}
          </Typography>
        )}
      </Typography>
      {rated && typeof rate === 'number' && (
        <Grid
          flexWrap={'nowrap'}
          justifyContent={'space-between'}
          mt={1}
          container
        >
          {[...new Array(10)].map((_, index) => (
            <Grid
              key={index}
              sx={{
                background:
                  index + 1 <= rate
                    ? 'var(--color-accent)'
                    : 'var(--color-lightgray)',
                borderRadius: 1,
                height: 5,
                width: 1 / 12,
              }}
              item
            />
          ))}
        </Grid>
      )}
    </Box>
  );
};
