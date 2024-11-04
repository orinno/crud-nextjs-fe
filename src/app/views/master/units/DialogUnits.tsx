import CustomFormLabel from "@/app/Components/forms/theme-elements/CustomFormLabel";
import UppercaseInput from "@/app/Components/ui-component/input/UppercaseInput";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";
import { create } from "lodash";
import React, { useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormDialogProps = {
  open: boolean;
  handleClose: () => void;
  //   onSuccess: VoidFunction;
};

const FormDialog: React.FC<FormDialogProps> = ({ open, handleClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<any>();

  const onSubmit: SubmitHandler<any> = async (data) => {
    toast.success("Data saved successfully");
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Add Units</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              mt={-2}
            >
              <Grid item xs={12} sm={12} md={12}>
                <CustomFormLabel htmlFor="Name" sx={{ mt: 0 }}>
                  Name{" "}
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "red", display: "inline" }}
                  >
                    *
                  </Typography>
                </CustomFormLabel>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Name Units"
                  size="small"
                  //   {...register('code', { required: 'Code is required' })}
                  //   helperText={errors.code && errors.code.message}
                  //   error={errors.code ? true : false}
                  //   InputProps={{
                  //     inputComponent: UppercaseInput as any,
                  //     onChange: (e) => {
                  //       setValue('code', e.target.value);
                  //     },
                  //   }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <CustomFormLabel htmlFor="Description" sx={{ mt: 0 }}>
                  Description{" "}
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "red", display: "inline" }}
                  >
                    *
                  </Typography>
                </CustomFormLabel>
                <TextField
                  fullWidth
                  variant="outlined"
                  // label="Name*"
                  placeholder="Units Description"
                  size="small"
                  //   {...register('namabank', { required: true })}
                  //   helperText={errors.namabank && 'Name is required'}
                  //   error={errors.namabank ? true : false}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions
          // add shadow to dialog action
          // sx={{ boxShadow: '0px -4px 4px rgba(0, 0, 0 ,0.1)' }}
          >
            <Stack spacing={1} direction="row" justifyContent="center">
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<IconX width={18} />}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                startIcon={<IconDeviceFloppy width={18} />}
              >
                Save
              </Button>
            </Stack>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default React.memo(FormDialog);
