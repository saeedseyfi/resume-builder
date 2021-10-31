import React, { useState } from 'react';

import { PageElement, Resume, Templates } from '~type/resume';
import { ResumeContext, ResumeContextType } from '~ctx/resume';
import { PageElementType } from '~comp/resume/constants';
import { mapPageElementTypeToSchema } from '~comp/resume/schemas';
import { useLocalStorage } from '~hook/use-local-storage';

const newResume = (): Resume => ({
  main: [],
  side: [],
  top: [],
});

type PlanContextProviderProps = {
  resume?: Resume;
  templates: Templates;
};

export const ResumeContextProvider: React.FC<PlanContextProviderProps> = ({
  resume,
  templates,
  children,
}) => {
  const [draftResume, setDraftResume] = useLocalStorage(
    'resume',
    resume || newResume()
  );
  const [editing, setEditing] = useState<ResumeContextType['editing']>();
  const { top, main, side } = draftResume;

  const add: ResumeContextType['add'] = (
    target,
    type: PageElementType,
    { element, index: optionsIndex } = {}
  ) => {
    setDraftResume(before => {
      const index = optionsIndex ?? draftResume[target].length;
      const newElements = draftResume[target].slice();
      const schema = mapPageElementTypeToSchema[type];

      newElements.splice(
        index,
        0,
        element ||
          ({
            ...(templates?.[type] || schema.getDefault()),
            id: schema.fields.id.getDefault(),
          } as PageElement)
      );

      return {
        ...before,
        [target]: newElements,
      };
    });
  };

  const del: ResumeContextType['del'] = (target, { id }) => {
    setDraftResume(before => ({
      ...before,
      [target]: before[target].filter(element => element.id !== id),
    }));

    if (editing && editing.element.id === id) {
      setEditing(undefined);
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        add,
        del,
        edit(newElement) {
          const mapper: (e: PageElement) => PageElement = element => {
            if (newElement.id === element.id) {
              return newElement;
            }
            return element;
          };

          setDraftResume(before => ({
            ...before,
            main: before.main.map(mapper),
            side: before.side.map(mapper),
            top: before.top.map(mapper),
          }));
        },
        editing,
        exportResume() {
          return draftResume;
        },
        importResume(resume) {
          setDraftResume(resume);
        },
        main,
        move(target, from, to) {
          if (typeof target === 'string') {
            return setDraftResume(before => {
              const newPlan = [...before[target]];

              Array.prototype.splice.call(
                newPlan,
                to,
                0,
                Array.prototype.splice.call(newPlan, from, 1)[0]
              );

              return {
                ...before,
                [target]: newPlan,
              };
            });
          }

          const [removeFrom, addTo] = target;
          const element = draftResume[removeFrom][from];

          add(addTo, element.type, { element });
          del(removeFrom, element);
        },
        setEditing(data) {
          // to prevent breaking the "discard button" functionality
          if (editing?.element.id === data?.element.id) {
            return;
          }

          setEditing(data);
        },
        side,
        templates,
        top,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
