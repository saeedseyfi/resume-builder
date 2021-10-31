import { InferType } from 'yup';

import {
  dividerPageElementSchema,
  experiencePageElementSchema,
  headPageElementContactSchema,
  headPageElementSchema,
  headingPageElementSchema,
  pageElementSchema,
  resumeSchema,
  skillPageElementSchema,
  textPageElementSchema,
} from '~comp/resume/schemas';
import { PageElementType } from '~comp/resume/constants';

export type PageElement = InferType<typeof pageElementSchema>;
export type HeadPageElementContact = InferType<
  typeof headPageElementContactSchema
>;
export type HeadPageElement = InferType<typeof headPageElementSchema>;
export type HeadingPageElement = InferType<typeof headingPageElementSchema>;
export type TextPageElement = InferType<typeof textPageElementSchema>;
export type ExperiencePageElement = InferType<
  typeof experiencePageElementSchema
>;
export type SkillPageElement = InferType<typeof skillPageElementSchema>;
export type DividerPageElement = InferType<typeof dividerPageElementSchema>;
export type Resume = InferType<typeof resumeSchema>;

export type Templates = {
  [key in PageElementType]: PageElement;
};

export type Target = 'top' | 'main' | 'side';

export type ElementProps = {
  element: PageElement;
  className?: string;
};
