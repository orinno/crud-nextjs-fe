import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

type DialogConfirmProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  content?: string;
  titleButtonLeft?: string;
  titleButtonRight?: string;
};

const DialogConfirm = (props: DialogConfirmProps) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
    >
      <DialogTitle id="alert-dialog-title">{props.title ?? ''}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography variant="body1" fontSize={'14px'}>
            {props?.content ?? ''}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" variant="outlined" onClick={props.onClose}>
          {props?.titleButtonLeft ?? 'No'}
        </Button>
        <Button autoFocus onClick={props.onConfirm} color="secondary" variant="contained">
          {props?.titleButtonRight ?? 'Yes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogConfirm;
