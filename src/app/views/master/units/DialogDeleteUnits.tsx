import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

type DialogDeleteUnitsProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  handleClose: () => void;
  onSuccess: VoidFunction;
  data?: any;
};

const DialogDeleteUnits = (props: DialogDeleteUnitsProps) => {
  const { open, onClose, onConfirm, data } = props;

  const handleConfirm = () => {
    onConfirm(data);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete Data</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this data?
          {/* {data && (
            <div style={{ marginTop: 10 }}>
              <strong>Name:</strong> {data.name}
              <br />
              <strong>Description:</strong> {data.description}
            </div>
          )} */}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" variant="outlined" onClick={onClose}>
          No
        </Button>
        <Button
          autoFocus
          onClick={handleConfirm}
          color="primary"
          variant="contained"
        >
          Yes, Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogDeleteUnits;
