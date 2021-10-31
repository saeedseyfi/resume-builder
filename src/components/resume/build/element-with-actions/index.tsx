import React, { useCallback, useContext } from 'react';
import { Box } from '@mui/material';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

import { ElementProps, PageElement, Target } from '~type/resume';
import {
  mapElementTypeToComponent,
  mapElementTypeToFields,
} from '~comp/resume/element/constants';
import { ResumeContext } from '~ctx/resume';
import { cn } from '~util/cn';

import { Actions } from './actions';
import styles from './index.module.scss';
import { usePrintMediaQuery } from '~hook/use-print-media-query';

interface ElementWithActionsProps extends ElementProps {
  actionsClassName?: string;
  dragHandleProps?: DraggableProvidedDragHandleProps;
  element: PageElement;
  target: Target;
}

export const ElementWithActions: React.FC<ElementWithActionsProps> = ({
  target,
  element,
  className,
  actionsClassName,
  dragHandleProps,
}) => {
  const matchesPrint = usePrintMediaQuery();
  const Fields = mapElementTypeToFields[element.type];
  const Element = mapElementTypeToComponent[element.type];
  const { setEditing, del, editing } = useContext(ResumeContext);
  const handleClickEdit = useCallback(() => {
    setEditing({
      Fields,
      element,
    });
  }, [Fields, element, setEditing]);
  const handleClickDelete = useCallback(() => {
    del(target, element);
  }, [del, element, target]);

  return (
    <>
      <div
        className={styles.dragHandle}
        onClick={handleClickEdit}
        {...dragHandleProps}
      />

      <Box
        className={className}
        component={Element}
        element={element}
        sx={{
          boxShadow: ({ shadows }) =>
            editing?.element.id === element.id && !matchesPrint
              ? shadows[3]
              : 'none',
          transition: ({ transitions }) => transitions.create(['box-shadow']),
        }}
      />

      <Actions
        className={cn(styles.actions, actionsClassName)}
        element={element}
        onClickDelete={handleClickDelete}
        onClickEdit={handleClickEdit}
      />
    </>
  );
};
