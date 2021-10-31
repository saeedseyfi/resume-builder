import { Box, Button, Grid, Modal, ModalProps } from '@mui/material';
import React from 'react';

import { T } from '~comp/i18n';
import { UnknownFunc } from '~type';
import { useKeyPress } from '~hook/use-key-press';

import styles from './index.module.scss';

interface PromptProps extends Omit<ModalProps, 'children'> {
  onConfirm: UnknownFunc;
  children?: ModalProps['children'];
}

export const Prompt: React.FC<PromptProps> = ({
  open,
  onConfirm,
  onClose,
  children,
  ...rest
}) => {
  useKeyPress('Enter', e => {
    open && onConfirm(e);
  });

  return (
    <Modal open={open} onClose={onClose} {...rest}>
      <Box className={styles.modal} sx={{ p: 3 }}>
        <div style={{ minWidth: 200 }}>
          {children || <T>MODAL_PROMPT.TITLE</T>}
        </div>

        <Grid sx={{ mt: 3 }} container>
          <Grid sm={6} item>
            <Button variant={'contained'} fullWidth onClick={onConfirm}>
              <T>MODAL_PROMPT.CONFIRM</T>
            </Button>
          </Grid>
          <Grid sm={6} item>
            <Button fullWidth onClick={onClose as UnknownFunc}>
              <T>MODAL_PROMPT.CANCEL</T>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
