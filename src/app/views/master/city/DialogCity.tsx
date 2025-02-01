import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CustomTextField from "@/app/Components/forms/form-elements/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/Components/forms/theme-elements/CustomFormLabel";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";
import { createCity, updateCity } from "@/service/master/CityService";
import { ICity } from "@/types/masterTypes";
import { IProvince } from "@/types/masterTypes";

//menggabungkan 2 interface
type ICityWithProvince = ICity & IProvince;

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

type FormDialogProps = {
  open: boolean;
  handleClose: () => void;
  onSuccess: VoidFunction;
};

const codeMapping = {
  HTML001: { grade_id: "Menengah", program_id: "Belajar HTML", index: 1 },
  CSS002: { grade_id: "Menengah", program_id: "Belajar CSS", index: 2 },
  JS003: { grade_id: "Lanjutan", program_id: "Belajar JavaScript", index: 3 },
};

const FormDialog = (props: FormDialogProps) => {
  const methods = useForm<ICityWithProvince>();
  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    register,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: any) => {
    const params = {
      id: data.id,
      code: data.code,
      city_name: data.city_name,
      provinceId: data.provinceId,
      province: data.province_name,
      description: data.description,
    };
    try {
      const res = await createCity(params);
      if (res) {
        toast.success("Data Kejadian has been created");
        reset();
        handleClose();
        props.onSuccess();
      }
    } catch (error: any) {
      toast.error(error.message);
    }
    // console.log(data);
    // if (props.data) {
    //   try {
    //     const res = await updateUnit(props.data?.id.toString(), data);
    //     if (res) {
    //       toast.success("Data Unit has been updated");
    //       reset();
    //       handleClose();
    //       props.onSuccess();
    //     }
    //   } catch (error: any) {
    //     toast.error(error.message);
    //   }
    // } else {

    // }
  };

  const handleClose = () => {
    reset({
      code: "",
      city_name: "",
      provinceId: "",
      province_name: "",
      description: "",
    });
    props.handleClose();
  };

  return (
    <Dialog open={props.open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Tambah Data City</DialogTitle>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              mt={-2}
            >
              <Grid item xs={12} sm={12} md={4}>
                <CustomFormLabel htmlFor="Kode" sx={{ mt: 0 }}>
                  Kode{" "}
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "red", display: "inline" }}
                  >
                    *
                  </Typography>
                </CustomFormLabel>
                <CustomTextField
                  type="text"
                  fullWidth
                  placeholder="Kode"
                  size="small"
                  {...register("code", { required: true })}
                  helperText={errors.code && "Kode Harus Diisi"}
                  error={!!errors.code}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <CustomFormLabel htmlFor="Name_city" sx={{ mt: 0 }}>
                  Nama Kota{" "}
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "red", display: "inline" }}
                  >
                    *
                  </Typography>
                </CustomFormLabel>
                <CustomTextField
                  type="text"
                  fullWidth
                  placeholder="Nama Kota"
                  size="small"
                  {...register("city_name", { required: true })}
                  helperText={errors.city_name && "Nama Kota Harus Diisi"}
                  error={!!errors.city_name}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <CustomFormLabel htmlFor="Id" sx={{ mt: 0 }}>
                  ID Provinsi{" "}
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "red", display: "inline" }}
                  >
                    *
                  </Typography>
                </CustomFormLabel>
                <CustomTextField
                  type="text"
                  fullWidth
                  placeholder="Id Provinsi"
                  size="small"
                  {...register("provinceId", { required: true })}
                  helperText={errors.provinceId && "Id Provinsi Harus Diisi"}
                  error={!!errors.provinceId}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <CustomFormLabel htmlFor="Name_province" sx={{ mt: 0 }}>
                  Nama Provinsi{" "}
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "red", display: "inline" }}
                  >
                    *
                  </Typography>
                </CustomFormLabel>
                <CustomTextField
                  type="text"
                  fullWidth
                  placeholder="Nama Provinsi"
                  size="small"
                  {...register("province_name", { required: true })}
                  helperText={errors.province_name && "Nama Provinsi Harus Diisi"}
                  error={!!errors.province_name}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <CustomFormLabel htmlFor="Description" sx={{ mt: 0 }}>
                  Deskripsi{" "}
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "red", display: "inline" }}
                  >
                    *
                  </Typography>
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  placeholder="Description"
                  size="small"
                  multiline
                  rows={3}
                  {...register("description", { required: true })}
                  helperText={errors.description && "Description is required"}
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
