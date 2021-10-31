import { Button, ButtonGroup } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { PageElement } from '~type/resume';
import { Prompt } from '~comp/prompt';
import { T } from '~comp/i18n';
import { cn } from '~util/cn';
import { useClipboard } from '~hook/use-clipboard';

import styles from './index.module.scss';

type ActionsProps = {
  element: PageElement;
  className?: string;
  onClickEdit?: (element: PageElement) => void;
  onClickDelete?: (element: PageElement) => void;
  block?: boolean;
};

export const Actions: React.FC<ActionsProps> = ({
  className,
  element,
  onClickEdit,
  onClickDelete,
  block,
}) => {
  const handleClickEdit = useCallback(
    () => onClickEdit?.(element),
    [element, onClickEdit]
  );
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const handleClickDelete = useCallback(() => setConfirmingDelete(true), []);
  const handleCancelDelete = useCallback(() => setConfirmingDelete(false), []);
  const handleConfirmDelete = useCallback(() => {
    // setConfirming(false);
    onClickDelete?.(element);
  }, [element, onClickDelete]);
  const copy = useClipboard();
  const handleClickCopy = useCallback(
    () => copy(JSON.stringify({ ...element, id: uuidv4() })),
    [copy, element]
  );

  return (
    <>
      <ButtonGroup
        className={cn(styles.actions, className)}
        fullWidth={block}
        size={'small'}
        variant={'outlined'}
      >
        {onClickEdit && (
          <Button className={styles.action} onClick={handleClickEdit}>
            <T>EDIT</T>
          </Button>
        )}
        {onClickDelete && (
          <Button className={styles.action} onClick={handleClickDelete}>
            <T>DELETE</T>
          </Button>
        )}
        <Button className={styles.action} onClick={handleClickCopy}>
          <T>COPY</T>
        </Button>
      </ButtonGroup>

      <Prompt
        open={confirmingDelete}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};
