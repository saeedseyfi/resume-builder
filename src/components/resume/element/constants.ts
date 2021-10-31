import {
  Badge,
  Event,
  HorizontalRule,
  Notes,
  StarHalf,
  SvgIconComponent,
  Title,
} from '@mui/icons-material';
import { FormikProps } from 'formik';
import React from 'react';

import { ElementProps, PageElement } from '~type/resume';
import { PageElementType } from '~comp/resume/constants';

import { Divider } from './divider';
import { Fields as DividerFields } from './divider/fields';
import { Experience } from './experience';
import { Fields as ExperienceFields } from './experience/fields';
import { Head } from './head';
import { Fields as HeadFields } from './head/fields';
import { Heading } from './heading';
import { Fields as HeadingFields } from './heading/fields';
import { Skill } from './skill';
import { Fields as SkillFields } from './skill/fields';
import { Text } from './text';
import { Fields as TextFields } from './text/fields';

export const mapElementTypeToComponent: {
  [key in PageElementType]: React.FC<ElementProps>;
} = {
  DIVIDER: Divider as React.FC<ElementProps>,
  EXPERIENCE: Experience as React.FC<ElementProps>,
  HEAD: Head as React.FC<ElementProps>,
  HEADING: Heading as React.FC<ElementProps>,
  SKILL: Skill as React.FC<ElementProps>,
  TEXT: Text as React.FC<ElementProps>,
};

export const mapElementTypeToFields: {
  [key in PageElementType]: React.FC<FormikProps<PageElement>>;
} = {
  DIVIDER: DividerFields as unknown as React.FC<FormikProps<PageElement>>,
  EXPERIENCE: ExperienceFields as unknown as React.FC<FormikProps<PageElement>>,
  HEAD: HeadFields as unknown as React.FC<FormikProps<PageElement>>,
  HEADING: HeadingFields as unknown as React.FC<FormikProps<PageElement>>,
  SKILL: SkillFields as unknown as React.FC<FormikProps<PageElement>>,
  TEXT: TextFields as unknown as React.FC<FormikProps<PageElement>>,
};

export const mapElementTypeToIcon: {
  [key in PageElementType]: SvgIconComponent;
} = {
  DIVIDER: HorizontalRule,
  EXPERIENCE: Event,
  HEAD: Badge,
  HEADING: Title,
  SKILL: StarHalf,
  TEXT: Notes,
};
