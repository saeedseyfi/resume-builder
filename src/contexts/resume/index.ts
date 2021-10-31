import { FormikProps } from 'formik';
import React from 'react';

import { PageElement, Resume, Target } from '~type/resume';
import { PageElementType } from '~comp/resume/constants';
import { mapPageElementTypeToSchema } from '~comp/resume/schemas';

export interface ResumeContextType {
  templates: { [key in PageElementType]: PageElement };
  main: readonly PageElement[];
  side: readonly PageElement[];
  top: readonly PageElement[];
  editing?: {
    element: PageElement;
    Fields: React.FC<FormikProps<PageElement>>;
  };

  setEditing(args?: ResumeContextType['editing']): void;

  add(
    target: Target,
    type: PageElementType,
    options?: { element?: PageElement; index?: number }
  ): void;

  edit(element: PageElement): void;

  del(target: Target, element: PageElement): void;

  move(
    target: Target | [Target, Target],
    fromIndex: number,
    toIndex: number
  ): void;

  importResume(resume: Resume): void;

  exportResume(): Resume;
}

export const ResumeContext = React.createContext<ResumeContextType>({
  add: () => undefined,
  del: () => undefined,
  edit: () => undefined,
  exportResume: () => ({
    main: [],
    side: [],
    top: [],
  }),
  importResume: () => undefined,
  main: [],
  move: () => undefined,
  setEditing: () => undefined,
  side: [],
  templates: Object.values(PageElementType).reduce((acc, type) => {
    const newAcc: ResumeContextType['templates'] = {
      ...acc,
      [type]: mapPageElementTypeToSchema[type].getDefault(),
    };
    return newAcc;
  }, {} as ResumeContextType['templates']),
  top: [],
});
