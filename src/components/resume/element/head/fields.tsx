import { Add, Close } from '@mui/icons-material';
import { Box, Button, FormHelperText, Grid, IconButton } from '@mui/material';
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';
import { FieldArray, FormikProps } from 'formik';
import React, { useCallback } from 'react';

import { DroppableId } from '~comp/resume/constants';
import { FormikField } from '~comp/mui/formik-field';
import { HeadPageElement } from '~type/resume';
import { T } from '~comp/i18n';
import { Upload } from '~comp/form/upload';
import { fileToBase64 } from '~util/file-to-base64';
import { headPageElementContactSchema } from '~comp/resume/schemas';
import { keyCheck } from '~util/key-check';
import { useFieldAttributes } from '~hook/use-field-attributes';

import styles from './index.module.scss';

export const Fields: React.FC<FormikProps<HeadPageElement>> = ({
  values,
  setFieldValue,
}) => {
  const photoAttributes = useFieldAttributes({
    name: keyCheck(values, 'photo'),
  });
  const handleRemovePhoto = useCallback(() => {
    setFieldValue(keyCheck(values, 'photo'), undefined);
  }, [setFieldValue, values]);
  const handleUploadPhoto = useCallback(
    (file: File) =>
      fileToBase64(file).then(src =>
        setFieldValue(keyCheck(values, 'photo'), src)
      ),
    [setFieldValue, values]
  );

  return (
    <>
      <FormikField
        helperText={<T>REQUIRED</T>}
        label={<T>NAME</T>}
        name={keyCheck(values, 'name')}
        autoFocus
      />

      <FormikField
        helperText={<T>REQUIRED</T>}
        label={<T>TITLE</T>}
        name={keyCheck(values, 'title')}
        autoFocus
      />

      {/*<FormikTextField*/}
      {/*  label={<T>PHOTO</T>}*/}
      {/*  name={keyCheck(values, 'photo')}*/}
      {/*  type={'file'}*/}
      {/*  autoFocus*/}
      {/*/>*/}

      <Grid flexWrap={'nowrap'} spacing={2} container>
        <Grid flex={1} item>
          <Upload name="select-photo" onSelectFile={handleUploadPhoto}>
            <Button component="span" variant={'outlined'} fullWidth>
              <T>SELECT_PHOTO</T>
            </Button>
          </Upload>
        </Grid>
        {values.photo && (
          <>
            <Grid item>
              <Box
                borderRadius={1}
                component={'img'}
                height={36}
                src={values.photo}
                sx={{ verticalAlign: 'middle' }}
              />
            </Grid>
            <Grid item>
              <IconButton size={'medium'} onClick={handleRemovePhoto}>
                <Close />
              </IconButton>
            </Grid>
          </>
        )}
      </Grid>
      <FormHelperText error={photoAttributes.showError}>
        {photoAttributes.helperText}
      </FormHelperText>

      <FieldArray name={keyCheck(values, 'contact')}>
        {({ remove, push, move }) => {
          const handleDragEnd = ({ source, destination }: DropResult) => {
            if (
              !destination ||
              source.droppableId !== destination.droppableId ||
              source.droppableId !== DroppableId.EDIT_ITEMS ||
              (source.droppableId === destination.droppableId &&
                source.index === destination.index)
            ) {
              return;
            }

            move(source.index, destination.index);
          };

          return (
            <div>
              {/* eslint-disable-next-line react/jsx-no-bind */}
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId={DroppableId.EDIT_ITEMS}>
                  {({
                    droppableProps,
                    innerRef: droppableInnerRef,
                    placeholder,
                  }) => (
                    <div ref={droppableInnerRef} {...droppableProps}>
                      {values.contact?.map((contact, i) => (
                        <Draggable key={i} draggableId={String(i)} index={i}>
                          {({
                            draggableProps,
                            dragHandleProps,
                            innerRef: draggableInnerRef,
                          }) => (
                            <div
                              ref={draggableInnerRef}
                              className={styles.editItem}
                              {...draggableProps}
                              {...dragHandleProps}
                            >
                              <IconButton
                                className={styles.removeItem}
                                onClick={() => remove(i)} // eslint-disable-line react/jsx-no-bind
                              >
                                <Close />
                              </IconButton>

                              <FormikField
                                className={styles.itemField}
                                helperText={<T>REQUIRED</T>}
                                label={<T>TEXT</T>}
                                name={`${keyCheck(
                                  values,
                                  'contact'
                                )}[${i}].${keyCheck(
                                  values.contact?.[0],
                                  'text'
                                )}`}
                              />

                              <FormikField
                                className={styles.itemField}
                                label={<T>LINK</T>}
                                name={`${keyCheck(
                                  values,
                                  'contact'
                                )}[${i}].${keyCheck(
                                  values.contact[0],
                                  'link'
                                )}`}
                              />

                              <FormikField
                                className={styles.itemField}
                                helperText={
                                  <a
                                    href="https://fonts.google.com/icons"
                                    rel="noreferrer"
                                    target="_blank"
                                  >
                                    <T>ICON_HELPER_TEXT</T>
                                  </a>
                                }
                                label={<T>ICON</T>}
                                name={`${keyCheck(
                                  values,
                                  'contact'
                                )}[${i}].${keyCheck(
                                  values.contact?.[0],
                                  'icon'
                                )}`}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              <Button
                className={styles.addItem}
                fullWidth
                // eslint-disable-next-line react/jsx-no-bind
                onClick={() => {
                  push(headPageElementContactSchema.getDefault());
                }}
              >
                <Add />
                <T>ADD</T>
              </Button>
            </div>
          );
        }}
      </FieldArray>
    </>
  );
};
