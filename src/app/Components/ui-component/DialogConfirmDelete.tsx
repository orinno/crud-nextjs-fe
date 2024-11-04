import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

type ConfirmDeleteDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmDeleteDialog = (props: ConfirmDeleteDialogProps) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete Data</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this data?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" variant="outlined" onClick={props.onClose}>
          No
        </Button>
        <Button autoFocus onClick={props.onConfirm} color="primary" variant="contained">
          Yes, Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
