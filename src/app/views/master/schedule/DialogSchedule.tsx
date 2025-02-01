import CustomTextField from "@/app/Components/forms/form-elements/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/Components/forms/theme-elements/CustomFormLabel";
import { createUnit, updateUnit } from "@/service/master/ClassSchedule";
import { IClassSchedule } from "@/types/masterTypes";
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
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";
import React from "react";
import {
  Controller,
  FormProvider,
  useForm,
} from "react-hook-form";
import { toast } from "react-toastify";

type FormDialogProps = {
  open: boolean;
  handleClose: () => void;
  onSuccess: VoidFunction;
  data?: IClassSchedule | null;
};

const FormDialog = (props: FormDialogProps) => {
  const methods = useForm<IClassSchedule>();
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
      class_id: "",
      academic_year_id: 0,
      teacher_id: 0,
      day: "",
      start_time: "",
      end_time: "",
      status: ""
    });
    props.handleClose();
  };

  return (
    <Dialog open={props.open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Tambah Jadwal Kelas</DialogTitle>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <Grid container spacing={2}>
              {/* No */}
              <Grid item xs={12} sm={6} md={4}>
                <CustomFormLabel htmlFor="no">No</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  placeholder="No"
                  size="small"
                  {...register("class_id", { required: "No is required" })}
                  helperText={errors.class_id?.message}
                  error={!!errors.class_id}
                />
              </Grid>

              {/* Class ID */}
              <Grid item xs={12} sm={6} md={4}>
                <CustomFormLabel htmlFor="class_id">Class ID</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  placeholder="Class ID"
                  size="small"
                  {...register("class_id", { required: "Class ID is required" })}
                  helperText={errors.class_id?.message}
                  error={!!errors.class_id}
                />
              </Grid>

              {/* Academic Year */}
              <Grid item xs={12} sm={6} md={4}>
                <CustomFormLabel htmlFor="academic_year">
                  Academic Year
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  placeholder="Academic Year"
                  size="small"
                  {...register("academic_year_id", {
                    required: "Academic Year is required",
                  })}
                  helperText={errors.academic_year_id?.message}
                  error={!!errors.academic_year_id}
                />
              </Grid>

              {/* Teacher ID */}
              <Grid item xs={12} sm={6} md={4}>
                <CustomFormLabel htmlFor="teacher_id">Teacher ID</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  placeholder="Teacher ID"
                  size="small"
                  {...register("teacher_id", {
                    required: "Teacher ID is required",
                  })}
                  helperText={errors.teacher_id?.message}
                  error={!!errors.teacher_id}
                />
              </Grid>

              {/* Day */}
              <Grid item xs={12} sm={6} md={4}>
                <CustomFormLabel htmlFor="day">Day</CustomFormLabel>
                <Controller
                  name="day"
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      select
                      fullWidth
                      size="small"
                      {...field}
                      error={!!errors.day}
                      helperText={errors.day?.message}
                    >
                      <MenuItem value="">Select Day</MenuItem>
                      <MenuItem value="Monday">Monday</MenuItem>
                      <MenuItem value="Tuesday">Tuesday</MenuItem>
                      <MenuItem value="Wednesday">Wednesday</MenuItem>
                      <MenuItem value="Thursday">Thursday</MenuItem>
                      <MenuItem value="Friday">Friday</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>

              {/* Start Time */}
              <Grid item xs={12} sm={6} md={4}>
                <CustomFormLabel htmlFor="start_time">Start Time</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  type="time"
                  size="small"
                  {...register("start_time", {
                    required: "Start Time is required",
                  })}
                  helperText={errors.start_time?.message}
                  error={!!errors.start_time}
                />
              </Grid>

              {/* End Time */}
              <Grid item xs={12} sm={6} md={4}>
                <CustomFormLabel htmlFor="end_time">End Time</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  type="time"
                  size="small"
                  {...register("end_time", {
                    required: "End Time is required",
                  })}
                  helperText={errors.end_time?.message}
                  error={!!errors.end_time}
                />
              </Grid>

              {/* Status */}
              <Grid item xs={12} sm={6} md={4}>
                <CustomFormLabel htmlFor="status">Status</CustomFormLabel>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      select
                      fullWidth
                      size="small"
                      {...field}
                      error={!!errors.status}
                      helperText={errors.status?.message}
                    >
                      <MenuItem value="">Select Status</MenuItem>
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<IconX />}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                startIcon={<IconDeviceFloppy />}
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
