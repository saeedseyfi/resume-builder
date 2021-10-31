import { Box, IconButton, Tooltip, useTheme } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useCallback, useContext } from 'react';
import { Close } from '@mui/icons-material';

import { AutoSave } from '~comp/form/auto-save';
import { ResetButton } from '~comp/form/reset-button';
import { ResumeContext } from '~ctx/resume';
import { T } from '~comp/i18n';
import { mapPageElementTypeToSchema } from '~comp/resume/schemas';
import { useKeyPress } from '~hook/use-key-press';
import { useTranslation } from '~hook/use-translation';

type EditorProps = {
  className?: string;
};

export const Editor: React.FC<EditorProps> = ({ className }) => {
  const t = useTranslation();
  const { editing, edit, setEditing } = useContext(ResumeContext);
  const { direction } = useTheme();
  const onClose = useCallback(() => {
    setEditing();
  }, [setEditing]);
  const onSubmit = useCallback(
    values => {
      edit(values);
    },
    [edit]
  );
  useKeyPress('Escape', onClose);
  const { element, Fields } = editing || {};

  if (!element || !Fields) {
    return null;
  }

  return (
    <Box
      className={className}
      component={'aside'}
      sx={{
        displayPrint: 'none',
        flexGrow: 1,
        height: '100vh',
        maxWidth: 320,
        minWidth: 200,
        overflow: 'auto',
        position: 'sticky',
        px: 1,
        py: 3,
        top: 0,
      }}
    >
      <Formik
        key={element.id}
        initialValues={element}
        validationSchema={mapPageElementTypeToSchema[element.type]}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {props => (
          <Form>
            <AutoSave />

            <Box
              sx={{
                bgcolor: ({ palette }) => palette.background.default,
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2,
                position: 'sticky',
                py: 1,
                top: ({ spacing }) => spacing(-3),
                zIndex: ({ zIndexCustom }) => zIndexCustom.planEditorTopBar,
              }}
            >
              <Tooltip
                placement={direction === 'rtl' ? 'right' : 'left'}
                title={t('CLOSE_X', { x: t('EDIT') })}
                arrow
              >
                <IconButton color={'primary'} onClick={onClose}>
                  <Close />
                </IconButton>
              </Tooltip>

              <ResetButton>
                <T>DISCARD_CHANGES</T>
              </ResetButton>
            </Box>

            <Fields {...props} />
          </Form>
        )}
      </Formik>
    </Box>
  );
};
