import CustomTextField from "@/app/Components/forms/form-elements/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/Components/forms/theme-elements/CustomFormLabel";
import UppercaseInput from "@/app/Components/ui-component/input/UppercaseInput";
import { createUnit, updateUnit } from "@/service/master/UnitService";
import { IAccident } from "@/types/masterTypes";
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
import { create } from "lodash";
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
  data?: IAccident | null;
};

const FormDialog = (props: FormDialogProps) => {
  const methods = useForm<IAccident>();
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
      date: data.date,
      location: data.location,
      start_time: data.start_time,
      end_time: data.end_time,
      absen: data.absen,
      description: data.description,
    };
    try {
      const res = await createUnit(params);
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
      name: "",
      date: "",
      location: "",
      start_time: "",
      end_time: "",
      description: "",
    });
    props.handleClose();
  };

  return (
    <>
      <Dialog open={props.open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Tambah Data Kejadian</DialogTitle>
        <FormProvider {...methods}>
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
                    Nama Kejadian{" "}
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
                    placeholder="Nama Kejadian"
                    size="small"
                    {...register("name", { required: true })}
                    helperText={errors.name && "Nama Kejadian is required"}
                    error={errors.name ? true : false}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <CustomFormLabel htmlFor="Date" sx={{ mt: 0 }}>
                    Tanggal Kejadian{" "}
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "red", display: "inline" }}
                    >
                      *
                    </Typography>
                  </CustomFormLabel>
                  <CustomTextField
                    fullWidth
                    type="date"
                    size="small"
                    {...register("date", { required: true })}
                    helperText={errors.date && "Date is required"}
                    error={errors.date ? true : false}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <CustomFormLabel htmlFor="Start Time" sx={{ mt: 0 }}>
                    Jam Mulai{" "}
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "red", display: "inline" }}
                    >
                      *
                    </Typography>
                  </CustomFormLabel>
                  <CustomTextField
                    fullWidth
                    type="time"
                    size="small"
                    {...register("start_time", { required: true })}
                    helperText={errors.start_time && "Start Time is required"}
                    error={errors.start_time ? true : false}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <CustomFormLabel htmlFor="End Time" sx={{ mt: 0 }}>
                    Jam Selesai{" "}
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "red", display: "inline" }}
                    >
                      *
                    </Typography>
                  </CustomFormLabel>
                  <CustomTextField
                    fullWidth
                    type="time"
                    size="small"
                    {...register("end_time", { required: true })}
                    helperText={errors.end_time && "End Time is required"}
                    error={errors.end_time ? true : false}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <CustomFormLabel htmlFor="Location" sx={{ mt: 0 }}>
                    Lokasi Kejadian{" "}
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "red", display: "inline" }}
                    >
                      *
                    </Typography>
                  </CustomFormLabel>
                  <CustomTextField
                    fullWidth
                    placeholder="Location"
                    size="small"
                    {...register("location", { required: true })}
                    helperText={errors.location && "Location is required"}
                    error={errors.location ? true : false}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Controller
                    name="absen"
                    control={control}
                    render={({ field, fieldState: { error } }) => {
                      return (
                        <CustomTextField
                          label="Pengaturan Absen"
                          placeholder="Select Pengaturan Absen"
                          fullWidth
                          size="small"
                          {...field}
                          select
                          error={!!error}
                          helperText={error?.message}
                          required
                        >
                          <MenuItem value="">Pilih Pengaturan Absen</MenuItem>
                          <MenuItem value="Absen Masuk">Absen Masuk</MenuItem>
                          <MenuItem value="Absen Keluar">Absen Keluar</MenuItem>
                        </CustomTextField>
                      );
                    }}
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
    </>
  );
};

export default React.memo(FormDialog);
