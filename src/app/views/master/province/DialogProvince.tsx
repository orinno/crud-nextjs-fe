import CustomTextField from "@/app/Components/forms/form-elements/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/Components/forms/theme-elements/CustomFormLabel";
import { createUnit, updateUnit } from "@/service/master/UnitService";
import { IProvince } from "@/types/masterTypes"; 
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  Stack,
} from "@mui/material";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";
import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormDialogProps = {
  open: boolean;
  handleClose: () => void;
  onSuccess: VoidFunction;
  data?: IProvince | null; // Use IProvince type for data
};

const FormDialog = (props: FormDialogProps) => {
  const methods = useForm<IProvince>(); // Adjusted to use IProvince
  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    register,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: IProvince) => {
    const params = {
      code: data.code,
      province_name: data.province_name, // Adjusted to province_name
      description: data.description,
    };

    try {
      const res = await createUnit(params); // Assume createUnit handles province creation
      if (res) {
        toast.success("Data Provinsi has been created");
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
      code: "",
      province_name: "",
      description: "",
    });
    props.handleClose();
  };

  return (
    <Dialog open={props.open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Tambah Data Provinsi</DialogTitle>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} mt={-2}>
              <Grid item xs={6}>
                <CustomFormLabel htmlFor="province_name" sx={{ mt: 0 }}>
                  Nama Provinsi {" "}
                  <Typography variant="subtitle1" sx={{ color: "red", display: "inline" }}>
                    *
                  </Typography>
                </CustomFormLabel>
                <CustomTextField
                  type="text"
                  fullWidth
                  placeholder="Nama Provinsi"
                  size="small"
                  {...register("province_name", { required: true })}
                  helperText={errors.province_name && "Nama Provinsi is required"}
                  error={errors.province_name ? true : false}
                />
              </Grid>

              <Grid item xs={6}>
                <CustomFormLabel htmlFor="code" sx={{ mt: 0 }}>
                  Kode Provinsi {" "}
                  <Typography variant="subtitle1" sx={{ color: "red", display: "inline" }}>
                    *
                  </Typography>
                </CustomFormLabel>
                <CustomTextField
                  type="text"
                  fullWidth
                  placeholder="Kode Provinsi"
                  size="small"
                  {...register("code", { required: true })}
                  helperText={errors.code && "Kode Provinsi is required"}
                  error={errors.code ? true : false}
                />
              </Grid>

              <Grid item xs={12}>
                <CustomFormLabel htmlFor="description" sx={{ mt: 0 }}>
                  Deskripsi {" "}
                  <Typography variant="subtitle1" sx={{ color: "red", display: "inline" }}>
                    *
                  </Typography>
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  placeholder="Deskripsi Provinsi"
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
