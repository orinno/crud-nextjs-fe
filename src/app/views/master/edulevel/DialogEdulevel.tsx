import CustomTextField from "@/app/Components/forms/form-elements/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/Components/forms/theme-elements/CustomFormLabel";
import { createUnit } from "@/service/master/UnitService";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormDialogProps = {
  open: boolean;
  handleClose: () => void;
  onSuccess: VoidFunction;
  data?: any | null;
};

const FormDialog = (props: FormDialogProps) => {
  const methods = useForm<any>();
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: any) => {
    const params = {
      name: data.name,
      code: data.code,
      description: data.description,
    };

    try {
      const res = await createUnit(params);
      if (res) {
        toast.success("Data Edulevel has been created");
        reset();
        handleClose();
        props.onSuccess();
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleClose = () => {
    reset({ name: "", code: "", description: "" });
    props.handleClose();
  };

  return (
    <Dialog open={props.open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Tambah Data Edulevel</DialogTitle>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <Grid container spacing={2} mt={-2}>
              <Grid item xs={6}>
                <CustomFormLabel htmlFor="name">
                  Nama<Typography variant="subtitle1" sx={{ color: "red", display: "inline" }}>*</Typography>
                </CustomFormLabel>
                <CustomTextField
                  type="text"
                  fullWidth
                  placeholder="Nama Edulevel"
                  size="small"
                  {...register("name", { required: true })}
                  helperText={errors.name && "Nama Edulevel is required"}
                  error={!!errors.name}
                />
              </Grid>

              <Grid item xs={6}>
                <CustomFormLabel htmlFor="code">
                  Kode<Typography variant="subtitle1" sx={{ color: "red", display: "inline" }}>*</Typography>
                </CustomFormLabel>
                <CustomTextField
                  type="text"
                  fullWidth
                  placeholder="Kode Edulevel"
                  size="small"
                  {...register("code", { required: true })}
                  helperText={errors.code && "Kode Edulevel is required"}
                  error={!!errors.code}
                />
              </Grid>

              <Grid item xs={12}>
                <CustomFormLabel htmlFor="description">
                  Deskripsi <Typography variant="subtitle1" sx={{ color: "red", display: "inline" }}>*</Typography>
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  placeholder="Deskripsi Edulevel"
                  size="small"
                  multiline
                  rows={3}
                  {...register("description", { required: true })}
                  helperText={errors.description && "Deskripsi is required"}
                  error={!!errors.description}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
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
      </FormProvider>
    </Dialog>
  );
};

export default React.memo(FormDialog);
