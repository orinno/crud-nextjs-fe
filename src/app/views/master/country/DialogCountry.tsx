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
        <DialogTitle>Tambah Data Negara</DialogTitle>
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
                    Nama Negara{" "}
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
                    placeholder="Nama Negara"
                    size="small"
                    {...register("name", { required: true })}
                    helperText={errors.name && "Nama Negara is required"}
                    error={errors.name ? true : false}
                  />
                </Grid>
                
                <Grid item xs={12} sm={12} md={12}>
                  <CustomFormLabel htmlFor="Name" sx={{ mt: 0 }}>
                   Kode Numerik{" "}
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
                    placeholder="Kode Numerik"
                    size="small"
                    {...register("name", { required: true })}
                    helperText={errors.name && "Kode Numerik is required"}
                    error={errors.name ? true : false}
                  />
                </Grid>
                
                <Grid item xs={12} sm={12} md={12}>
                  <CustomFormLabel htmlFor="Name" sx={{ mt: 0 }}>
                    Nama Singkat{" "}
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
                    placeholder="Nama Singkat"
                    size="small"
                    {...register("name", { required: true })}
                    helperText={errors.name && "Nama Singkat is required"}
                    error={errors.name ? true : false}
                  />
                </Grid>
                
                <Grid item xs={12} sm={12} md={12}>
                  <CustomFormLabel htmlFor="Name" sx={{ mt: 0 }}>
                    Kode ISO{" "}
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
                    placeholder="Kode ISO"
                    size="small"
                    {...register("name", { required: true })}
                    helperText={errors.name && "Kode ISO is required"}
                    error={errors.name ? true : false}
                  />
                </Grid>
                
                <Grid item xs={12} sm={12} md={12}>
                  <CustomFormLabel htmlFor="Name" sx={{ mt: 0 }}>
                    Kode ISO3{" "}
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
                    placeholder="Kode ISO3"
                    size="small"
                    {...register("name", { required: true })}
                    helperText={errors.name && "Kode ISO3 is required"}
                    error={errors.name ? true : false}
                  />
                </Grid>
                
                <Grid item xs={12} sm={12} md={12}>
                  <CustomFormLabel htmlFor="Name" sx={{ mt: 0 }}>
                    Kode Telepon{" "}
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
                    placeholder="Kode Telepon"
                    size="small"
                    {...register("name", { required: true })}
                    helperText={errors.name && "Kode Telepon is required"}
                    error={errors.name ? true : false}
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
