import { InferType, array, boolean, mixed, number, object, string } from 'yup';
import { v4 } from 'uuid';

import { initYupValidationMessages } from '~util/i18n';

import { DroppableId, PageElementType } from './constants';

// set locale has to be called before creating any schema
initYupValidationMessages();

const pageElementStructure = {
  id: string()
    .default(() => v4())
    .required(),
  type: mixed<PageElementType>()
    .oneOf(Object.values(PageElementType))
    .required(),
};

export const pageElementSchema = object({}).shape(pageElementStructure);

export const headPageElementContactSchema = object({}).shape({
  icon: string().default(''),
  link: string().default(''),
  text: string().default('').required(),
});

export const headPageElementSchema = object({})
  .shape(pageElementStructure)
  .shape({
    contact: array<InferType<typeof headPageElementContactSchema>>()
      .of(headPageElementContactSchema)
      .required()
      .default([] as InferType<typeof headPageElementContactSchema>[]),
    name: string().default('').required(),
    photo: string(),
    title: string().default('').required(),
    type: mixed<typeof PageElementType.HEAD>()
      .default(PageElementType.HEAD)
      .oneOf([PageElementType.HEAD])
      .required(),
  });

export const headingPageElementSchema = object({})
  .shape(pageElementStructure)
  .shape({
    text: string().default('').required(),
    type: mixed<typeof PageElementType.HEADING>()
      .default(PageElementType.HEADING)
      .oneOf([PageElementType.HEADING])
      .required(),
  });

export const textPageElementSchema = object({})
  .shape(pageElementStructure)
  .shape({
    text: string().default('').required(),
    type: mixed<typeof PageElementType.TEXT>()
      .default(PageElementType.TEXT)
      .oneOf([PageElementType.TEXT])
      .required(),
  });

export const experiencePageElementSchema = object({})
  .shape(pageElementStructure)
  .shape({
    location: string(),
    name: string().default('').required(),
    namePrefix: string(),
    timespan: string(),
    title: string().default('').required(),
    type: mixed<typeof PageElementType.EXPERIENCE>()
      .default(PageElementType.EXPERIENCE)
      .oneOf([PageElementType.EXPERIENCE])
      .required(),
    url: string(),
  });

export const skillPageElementSchema = object({})
  .shape(pageElementStructure)
  .shape({
    rate: number().integer().min(0).max(10),
    rated: boolean().default(false).required(),
    subTitle: string(),
    title: string().default('').required(),
    type: mixed<typeof PageElementType.SKILL>()
      .default(PageElementType.SKILL)
      .oneOf([PageElementType.SKILL])
      .required(),
  });

export const dividerPageElementSchema = object({})
  .shape(pageElementStructure)
  .shape({
    spaceBottom: number().integer().min(0).max(100).required(),
    spaceTop: number().integer().min(0).max(100).required(),
    type: mixed<typeof PageElementType.DIVIDER>()
      .default(PageElementType.DIVIDER)
      .oneOf([PageElementType.DIVIDER])
      .required(),
  });

export const resumeSchema = object({}).shape({
  main: array<InferType<typeof pageElementSchema>>()
    .of(pageElementSchema)
    .required()
    .default([]),
  side: array<InferType<typeof pageElementSchema>>()
    .of(pageElementSchema)
    .required()
    .default([]),
  top: array<InferType<typeof pageElementSchema>>()
    .of(pageElementSchema)
    .required()
    .default([]),
});

export const mapPageElementTypeToSchema = {
  [PageElementType.HEAD]: headPageElementSchema,
  [PageElementType.HEADING]: headingPageElementSchema,
  [PageElementType.TEXT]: textPageElementSchema,
  [PageElementType.EXPERIENCE]: experiencePageElementSchema,
  [PageElementType.SKILL]: skillPageElementSchema,
  [PageElementType.DIVIDER]: dividerPageElementSchema,
} as const;

export const defaultResumePart = 'main' as const;

export const mapDroppableIdToResumePart = {
  [DroppableId.TOP]: 'top',
  [DroppableId.MAIN]: 'main',
  [DroppableId.SIDE]: 'side',
  [DroppableId.TOOLKIT]: defaultResumePart,
  [DroppableId.EDIT_ITEMS]: defaultResumePart,
} as const;
