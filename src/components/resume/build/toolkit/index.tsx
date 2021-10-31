import { Draggable, Droppable } from 'react-beautiful-dnd';
import { FileDownload, FileUpload, Print } from '@mui/icons-material';
import { Grid, IconButton, Theme, Tooltip } from '@mui/material';
import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { SxProps } from '@mui/system';

import { DroppableId, PageElementType } from '~comp/resume/constants';
import { defaultResumePart, resumeSchema } from '~comp/resume/schemas';
import { Resume } from '~type/resume';
import { ResumeContext } from '~ctx/resume';
import { Upload } from '~comp/form/upload';
import { mapElementTypeToIcon } from '~comp/resume/element/constants';
import { useTranslation } from '~hook/use-translation';

const actionSx: SxProps<Theme> = {
  '&:hover': {
    bgcolor: ({ palette: { primary } }) => primary.main,
  },
  bgcolor: ({ palette: { primary } }) => primary.dark,
  color: 'white',
};

type ToolkitProps = {
  className?: string;
};

export const Toolkit: React.FC<ToolkitProps> = ({ className }) => {
  const printButtonRef = useRef<HTMLButtonElement>(null);
  const { add, templates, importResume, exportResume } =
    useContext(ResumeContext);
  const handleDownload = useCallback(() => {
    const blob = new Blob([JSON.stringify(exportResume(), null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume.json';
    link.click();
  }, [exportResume]);
  const handleUpload = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = async e => {
        const json = JSON.parse(e.target?.result as string);
        const resume = (await resumeSchema.validate(json)) as Resume;
        importResume(resume);
      };
      reader.readAsText(file);
    },
    [importResume]
  );
  const t = useTranslation();

  useEffect(() => {
    const printButton = printButtonRef.current;

    if (!printButton) {
      return;
    }

    const print = () => window.print();
    printButton.addEventListener('click', print);
    return () => printButton.removeEventListener('click', print);
  }, []);

  return (
    <Grid
      className={className}
      component={'aside'}
      direction={'column'}
      justifyContent={'space-between'}
      sx={{
        bgcolor: '#eee',
        displayPrint: 'none',
        height: '100vh',
        position: 'sticky',
        px: 1,
        py: 3,
        top: 0,
        width: 'auto',
      }}
      container
    >
      <Droppable droppableId={DroppableId.TOOLKIT} isDropDisabled>
        {({ droppableProps, innerRef: droppableInnerRef, placeholder }) => (
          <Grid
            ref={droppableInnerRef}
            direction={'column'}
            spacing={1}
            container
            {...droppableProps}
          >
            {Object.values(PageElementType).map((type, i) => {
              const template = templates[type];

              return (
                <Draggable
                  key={template.type}
                  draggableId={template.type}
                  index={i}
                  disableInteractiveElementBlocking
                >
                  {({
                    draggableProps,
                    dragHandleProps,
                    innerRef: draggableInnerRef,
                  }) => {
                    const title = t('ADD_X', {
                      x: t(`ELEMENT_TYPE.${template.type}`),
                    });
                    const Icon = mapElementTypeToIcon[template.type];
                    return (
                      <Grid
                        ref={draggableInnerRef}
                        item
                        // eslint-disable-next-line react/jsx-no-bind
                        onClick={() => {
                          add(defaultResumePart, template.type);
                        }}
                        {...draggableProps}
                        {...dragHandleProps}
                      >
                        <Tooltip placement={'left'} title={title} arrow>
                          <IconButton color={'primary'}>
                            <Icon />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    );
                  }}
                </Draggable>
              );
            })}
            {placeholder}
          </Grid>
        )}
      </Droppable>

      <Grid direction={'column'} spacing={1} container>
        <Grid item>
          <Tooltip placement={'left'} title={t('PRINT')} arrow>
            <IconButton ref={printButtonRef} sx={actionSx}>
              <Print />
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid item>
          <Tooltip placement={'left'} title={t('DOWNLOAD_FILE')} arrow>
            <IconButton onClick={handleDownload}>
              <FileDownload />
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid item>
          <Upload name="resume" onSelectFile={handleUpload}>
            <Tooltip placement={'left'} title={t('UPLOAD_FILE')} arrow>
              <IconButton component={'span'}>
                <FileUpload />
              </IconButton>
            </Tooltip>
          </Upload>
        </Grid>
      </Grid>
    </Grid>
  );
};
