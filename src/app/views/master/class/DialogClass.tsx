import CustomTextField from "@/app/Components/forms/form-elements/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/Components/forms/theme-elements/CustomFormLabel";
import UppercaseInput from "@/app/Components/ui-component/input/UppercaseInput";
import { createClass, updateClass } from "@/service/master/ClassService";
import { IClasses } from "@/types/masterTypes";
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
  data?: IClasses | null;
};

const codeMapping = {
  HTML001: { grade_id: "Menengah", program_id: "Belajar HTML", index: 1 },
  CSS002: { grade_id: "Menengah", program_id: "Belajar CSS", index: 2 },
  JS003: { grade_id: "Lanjutan", program_id: "Belajar JavaScript", index: 3 }
};

const FormDialog = (props: FormDialogProps) => {
  const methods = useForm<IClasses>();
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
        name: data.name,
        code: data.code,
        grade_id: data.grade_id,
        program_id: data.program_id,
        index: data.index,
        start_time: data.start_time,
        end_time: data.end_time,
      };
      try {
        const res = await createClass(params);
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
      //     const res = await updateClass(props.data?.id.toString(), data);
      //     if (res) {
      //       toast.success("Data Class has been updated");
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
      code: "",
      grade_id: "",
      program_id: "",
      index: "",
      start_time: "",
      end_time: "",
    });
    props.handleClose();
  };

  return (
    <Dialog open={props.open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Tambah Data Kelas</DialogTitle>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12}>
                <CustomFormLabel htmlFor="Name">
                  Nama Kelas{" "}
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
                  placeholder="Nama Kelas"
                  size="small"
                  {...register("name", { required: true })}
                  helperText={errors.name && "Nama Kelas Harus Diisi"}
                  error={!!errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Controller
                  name="code"
                  control={control}
                  rules={{ required: "Kode Harus Dipilih" }}
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextField
                      label="Kode"
                      placeholder="Pilih Kode"
                      fullWidth
                      size="small"
                      {...field}
                      select
                      error={!!error}
                      helperText={error?.message}
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        field.onChange(selectedValue);
                        const selected = codeMapping[selectedValue];
                        if (selected) {
                          setValue("grade_id", selected.grade_id);
                          setValue("program_id", selected.program_id);
                          setValue("index", selected.index.toString());
                        } else {
                          setValue("grade_id", "");
                          setValue("program_id", "");
                          setValue("index", "");
                        }
                      }}
                    >
                      <MenuItem value="">Pilih Kode</MenuItem>
                      {Object.keys(codeMapping).map((key) => (
                        <MenuItem key={key} value={key}>
                          {key}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Controller
                  name="index"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextField
                      label="Index"
                      placeholder="Index"
                      fullWidth
                      size="small"
                      {...field}
                      disabled // Input tidak bisa diubah manual
                      error={!!error}
                      helperText={error?.message}
                      required
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  name="grade_id"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextField
                      label="Tingkat Pembelajaran"
                      placeholder="Pilih Tingkat Pembelajaran"
                      fullWidth
                      size="small"
                      {...field}
                      select
                      error={!!error}
                      helperText={error?.message}
                      required

                    >
                      <MenuItem value="">Pilih Tingkat Pembelajaran</MenuItem>
                      <MenuItem value="Dasar">Dasar</MenuItem>
                      <MenuItem value="Menengah">Menengah</MenuItem>
                      <MenuItem value="Lanjutan">Lanjutan</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="program_id"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextField
                      label="Program Studi"
                      placeholder="Pilih Program Studi"
                      fullWidth
                      size="small"
                      {...field}
                      select
                      error={!!error}
                      helperText={error?.message}
                      required
                      
                    >
                      <MenuItem value="">Pilih Program Studi</MenuItem>
                      <MenuItem value="Belajar HTML">Belajar HTML</MenuItem>
                      <MenuItem value="Belajar CSS">Belajar CSS</MenuItem>
                      <MenuItem value="Belajar JavaScript">
                        Belajar JavaScript
                      </MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <CustomFormLabel htmlFor="Start Time">
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
                  helperText={errors.start_time && "Jam Mulai Harus Diisi"}
                  error={!!errors.start_time}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomFormLabel htmlFor="End Time">
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
                  helperText={errors.end_time && "Jam Selesai Harus Diisi"}
                  error={!!errors.end_time}
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
