import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';
import React, { useCallback, useContext } from 'react';

import { DroppableId, PageElementType } from '~comp/resume/constants';
import { PageElement, Target } from '~type/resume';
import {
  defaultResumePart,
  mapDroppableIdToResumePart,
  mapPageElementTypeToSchema,
} from '~comp/resume/schemas';
import { Grid } from '@mui/material';
import { ResumeContext } from '~ctx/resume';
import { cn } from '~util/cn';
import { useClipboard } from '~hook/use-clipboard';
import { useTranslation } from '~hook/use-translation';

import { Editor } from './editor';
import { ElementWithActions } from './element-with-actions';
import { Toolkit } from './toolkit';
import styles from './index.module.scss';

type DraggableElementsProps = {
  isDragging: boolean;
  target: Target;
  elements: readonly PageElement[];
  droppableId: DroppableId;
};
const DraggableElements: React.FC<DraggableElementsProps> = ({
  isDragging,
  target,
  elements,
  droppableId,
}) => {
  const t = useTranslation();

  return (
    <Droppable droppableId={droppableId}>
      {({ droppableProps, innerRef: droppableInnerRef, placeholder }) => (
        <div
          ref={droppableInnerRef}
          className={cn(
            styles.droppable,
            isDragging && styles.isDragging,
            elements.length === 0 ? styles.empty : ''
          )}
          data-empty-content={t('DROP_HERE')}
          {...droppableProps}
        >
          {elements.map((element, i) => (
            <Draggable key={element.id} draggableId={element.id} index={i}>
              {({
                draggableProps,
                dragHandleProps,
                innerRef: draggableInnerRef,
              }) => (
                <div
                  ref={draggableInnerRef}
                  className={styles.elementContainer}
                  {...draggableProps}
                >
                  <ElementWithActions
                    actionsClassName={styles.actions}
                    className={styles.element}
                    dragHandleProps={dragHandleProps}
                    element={element}
                    target={target}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {placeholder}
        </div>
      )}
    </Droppable>
  );
};

export const Build: React.FC = () => {
  const { top, main, side, editing, add, move } = useContext(ResumeContext);
  const [isDragging, setIsDragging] = React.useState(false);
  useClipboard(async text => {
    try {
      if (!text?.trim()) {
        return;
      }
      const parsed = JSON.parse(text);
      const type: PageElementType = parsed?.type;

      if (!(type in PageElementType)) {
        return;
      }

      const schema = mapPageElementTypeToSchema[type];
      const element = (await schema.validate(parsed)) as PageElement;

      element.id = schema.fields.id.getDefault();

      add(defaultResumePart, type, { element });
    } catch (e) {
      // skip it
    }
  });
  const handleDragEnd = useCallback(
    ({ source, destination, draggableId }: DropResult) => {
      setIsDragging(false);

      if (
        !destination ||
        !Object.values(DroppableId).includes(
          destination.droppableId as DroppableId
        ) ||
        (source.droppableId === destination.droppableId &&
          source.index === destination.index)
      ) {
        return;
      }

      if (source.droppableId === destination.droppableId) {
        move(
          mapDroppableIdToResumePart[source.droppableId as DroppableId] ||
            defaultResumePart,
          source.index,
          destination.index
        );
        return;
      }

      if (source.droppableId === DroppableId.TOOLKIT) {
        add(
          mapDroppableIdToResumePart[destination.droppableId as DroppableId],
          draggableId as PageElementType,
          { index: destination.index }
        );
        return;
      }

      move(
        [
          mapDroppableIdToResumePart[source.droppableId as DroppableId],
          mapDroppableIdToResumePart[destination.droppableId as DroppableId],
        ],
        source.index,
        destination.index
      );
    },
    [add, move]
  );
  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  return (
    <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <main className={cn(styles.builder, editing && styles.editing)}>
        <Toolkit className={styles.toolkit} />

        <div className={styles.preview}>
          <Grid
            alignContent={'flex-start'}
            component={'article'}
            spacing={2}
            container
          >
            <Grid component={'header'} xs={12} item>
              <DraggableElements
                droppableId={DroppableId.TOP}
                elements={top}
                isDragging={isDragging}
                target="top"
              />
            </Grid>

            <Grid component={'section'} xs={8} item>
              <DraggableElements
                droppableId={DroppableId.MAIN}
                elements={main}
                isDragging={isDragging}
                target="main"
              />
            </Grid>

            <Grid component={'aside'} xs={4} item>
              <DraggableElements
                droppableId={DroppableId.SIDE}
                elements={side}
                isDragging={isDragging}
                target="side"
              />
            </Grid>
          </Grid>
        </div>

        <Editor className={styles.editor} />
      </main>
    </DragDropContext>
  );
};
