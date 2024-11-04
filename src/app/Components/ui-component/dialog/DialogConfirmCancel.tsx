import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import DialogConfirm from '../DialogConfirm';
import { IconDeviceFloppy, IconX } from '@tabler/icons-react';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';

type DialogConfirmProps = {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  onSelect: (selectedData: any) => void;
  content?: string;
  titleButtonLeft?: string;
  titleButtonRight?: string;
};

const DialogConfirmCancel = (props: DialogConfirmProps) => {
  const [remark, setRemark] = React.useState<string>('');
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleConfirm = () => {
    props.onSelect(remark);
    setOpen(false);
    props.onClose();
  };

  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        // maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">{props.title ?? ''}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props?.content ?? ''}
          </DialogContentText>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} mt={-2}>
            <Grid item xs={12} md={12}>
              <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                Remark <span style={{ color: 'red' }}>*</span>
              </Typography>
              <CustomTextField
                multiline
                rows={5}
                size="small"
                fullWidth
                placeholder="Enter remark..."
                onChange={(e: any) => setRemark(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="inherit"
            onClick={props.onClose}
            startIcon={<IconX width={18} />}
          >
            {props?.titleButtonLeft ?? 'No'}
          </Button>
          <Button
            autoFocus
            onClick={() => handleOpen()}
            variant="contained"
            color="secondary"
            startIcon={<IconDeviceFloppy width={18} />}
          >
            {props?.titleButtonRight ?? 'Yes'}
          </Button>
        </DialogActions>
      </Dialog>

      <DialogConfirm
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => handleConfirm()}
        title="Confirmation"
        content="Are you sure want cancel this data?"
      />
    </>
  );
};

export default DialogConfirmCancel;
