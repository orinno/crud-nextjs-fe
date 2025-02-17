import CustomTextField from "@/app/Components/forms/form-elements/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/Components/forms/theme-elements/CustomFormLabel";
import UppercaseInput from "@/app/Components/ui-component/input/UppercaseInput";
//import { createTeacher, updateTeacher } from "@/service/master/TeacherService";
import { ITeacher } from "@/types/masterTypes";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";
import { create } from "lodash";
import React, { ChangeEvent, useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
//import inputTeacher from "../../../../../pages/api/teachers"
import { createTeacher } from "@/service/master/TeacherService";
type FormDialogProps = {
  open: boolean;
  handleClose: () => void;
  onSuccess: VoidFunction;
  data?: ITeacher | null;
};


const FormDialog = (props: FormDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<any>();
  const { watch } = useForm<any>();
  // console.log("Watched values:", watch());

  const onSubmit = async (data: any) => {
    console.log("Form data submitted: ", data);
    const params = {
      nip: data.nip,
      nuptk: data.nuptk,
      name: data.name,
      gender: data.gender,
      email: data.email,
      password: data.password,
      birth_place: data.birth_place,
      birth_date: data.birth_date,
      village: data.village,
      address: data.address,
      city: data.city,
      district: data.district,
      no_karpeg: data.no_kapreg,
      province: data.province,
      jabatan_fungsionalitas: data.jabatan_fungsionalitas,
      nrg: data.nrg,
      pangkat: data.pangkat,
      tmt_jabatan_fungsional: data.tmt_jabatan_fungsionalitas,
      tmt_pangkat: data.tmt_pangkat,
      golongan: data.golongan,
      jenis_guru: data.jenis_guru,
      status_pegawai: data.status_pegawai,
    }
    
    try {
      const res = await createTeacher(params);
      if (res) {
        toast.success("Data Teacher has been created");
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
    //     const res = await updateTeacher(props.data?.id.toString(), data);
    //     if (res) {
    //       toast.success("Data Teacher has been updated");
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
      desc: "",
    });
    props.handleClose();
  };

  const handleSuccess = () => {
    toast.success("Data has successfully saved! thx")
  }
  return (
    <>
      <Dialog open={props.open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Add Teacher</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <Grid
              container
              rowSpacing={2}  // ini syntax munculin dialog/popup, isinya form teacher
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              mt={-2}
            >
              <Grid item xs={12} sm={12} md={12}>
                <CustomTextField
                  type="number"
                  fullWidth
                  label = "NIP"
                  size="small"
                  multiline
                  {...register("nip", { required: true })}
                  helperText={errors.nip && "NIP is required"}
                  error={errors.nip ? true:false}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <CustomTextField
                  type="text"
                  fullWidth
                  label = "NUPTK"
                  size="small"
                  multiline
                  {...register("nuptk", { required: true })}
                  helperText={errors.nuptk && "NUPTK is required"}
                  error={errors.nuptk ? true:false}
                />
              </Grid>
              
              <Grid item xs={12} sm={12} md={12}>
                <CustomTextField
                  type="text"
                  fullWidth
                  label="Full Name"
                  size="small"
                  {...register("name", { required: true })}
                  helperText={errors.name && "Name is required"}
                  error={errors.name ? true : false}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <CustomTextField
                  select
                  fullWidth
                  label = "Gender"
                  size="small"
                  multiline
                  {...register("gender", { required: true })}
                  helperText={errors.gender && "Gender is required"}
                  error={!!errors.gender}
                >
                    <MenuItem value=""disabled>Choose your Gender</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                </CustomTextField>
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <CustomTextField
                  type="text"
                  fullWidth
                  label="Email"
                  size="small"
                  {...register("email", { required: true })}
                  helperText={errors.email && "Email is required"}
                  error={errors.email ? true : false}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <CustomTextField
                  type="date"
                  fullWidth
                  placeholder="Birth Date"
                  size="small"
                  {...register("bdate", { required: true })}
                  helperText={errors.bdate && "Birth Date is required"}
                  error={errors.bdate ? true : false}
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
                startIcon={<IconDeviceFloppy width={18} />}
                type="submit"
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

export default /*React.memo*/FormDialog;