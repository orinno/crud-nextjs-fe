import CustomTextField from "@/app/Components/forms/form-elements/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/Components/forms/theme-elements/CustomFormLabel";
import { createUnit, updateUnit } from "@/service/master/UnitService";
import { IEdulevel } from "@/types/masterTypes";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";
import React, { ChangeEvent, useContext, useEffect } from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "react-toastify";

type FormDialogProps = {
  open: boolean;
  handleClose: () => void;
  onSuccess: VoidFunction;
  data?: any | null; // Adjusted to match structure of the array data
};

const FormDialog = (props: FormDialogProps) => {
  const methods = useForm<any>(); // Adjusted form type
  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    register,
    control,
    formState: { errors },
  } = methods;

  // console.log("Watched values:", watch());

  const onSubmit = async (data: any) => {
    const params = {
      name: data.name,
      code: data.code, // Added field for code
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
    reset({
      name: "",
      code: "",
      description: "",
    });
    props.handleClose();
  };

  return (
    <Dialog open={props.open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Tambah Data Edulevel</DialogTitle>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} mt={-2}>
              <Grid item xs={12}>
                <CustomFormLabel htmlFor="name" sx={{ mt: 0 }}>
                  Nama Edulevel{" "}
                  <Typography variant="subtitle1" sx={{ color: "red", display: "inline" }}>
                    *
                  </Typography>
                </CustomFormLabel>
                <CustomTextField
                  type="text"
                  fullWidth
                  placeholder="Nama Edulevel"
                  size="small"
                  {...register("name", { required: true })}
                  helperText={errors.name && "Nama Edulevel is required"}
                  error={errors.name ? true : false}
                />
              </Grid>

              <Grid item xs={12}>
                <CustomFormLabel htmlFor="code" sx={{ mt: 0 }}>
                  Kode Edulevel{" "}
                  <Typography variant="subtitle1" sx={{ color: "red", display: "inline" }}>
                    *
                  </Typography>
                </CustomFormLabel>
                <CustomTextField
                  type="text"
                  fullWidth
                  placeholder="Kode Edulevel"
                  size="small"
                  {...register("code", { required: true })}
                  helperText={errors.code && "Kode Edulevel is required"}
                  error={errors.code ? true : false}
                />
              </Grid>

              <Grid item xs={12}>
                <CustomFormLabel htmlFor="description" sx={{ mt: 0 }}>
                  Deskripsi{" "}
                  <Typography variant="subtitle1" sx={{ color: "red", display: "inline" }}>
                    *
                  </Typography>
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  placeholder="Deskripsi Edulevel"
                  size="small"
                  multiline
                  rows={3}
                  {...register("description", { required: true })}
                  helperText={errors.description && "Deskripsi is required"}
                  error={errors.description ? true : false}
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
