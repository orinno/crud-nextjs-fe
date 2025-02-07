import CustomTextField from "@/app/Components/forms/form-elements/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/Components/forms/theme-elements/CustomFormLabel";
import { createUnit, updateUnit } from "@/service/master/Institute";
import { Institute } from "@/types/masterTypes";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  MenuItem,
} from "@mui/material";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";
import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormDialogProps = {
  open: boolean;
  handleClose: () => void;
  onSuccess: VoidFunction;
  data?: Institute | null;
};

const FormDialog = (props: FormDialogProps) => {
  const methods = useForm<Institute>();
  const {
    handleSubmit,
    reset,
    register,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: Institute) => {
    try {
      const res = await createUnit(data);
      if (res) {
        toast.success("Institute has been created successfully.");
        reset();
        props.handleClose();
        props.onSuccess();
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred.");
    }
  };

  const handleClose = () => {
    reset({
      code: "",
      name: "",
      edu_level_id: "",
      leader_name: "",
      email: "",
      telephone: "",
      address: "",
      province_id: "",
      city_id: "",
      district_id: "",
      village_id: "",
      post_code: "",
      logo: "",
    });
    props.handleClose();
  };

  return (
    <Dialog open={props.open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Add Institute</DialogTitle>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <Grid container spacing={2}>
              {/* Code */}
              <Grid item xs={12} sm={6} md={4}>
                <CustomFormLabel htmlFor="code">Code</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  placeholder="Code"
                  size="small"
                  {...register("code", { required: "Code is required" })}
                  helperText={errors.code?.message}
                  error={!!errors.code}
                />
              </Grid>

              {/* Name */}
              <Grid item xs={12} sm={6} md={4}>
                <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  placeholder="Name"
                  size="small"
                  {...register("name", { required: "Name is required" })}
                  helperText={errors.name?.message}
                  error={!!errors.name}
                />
              </Grid>

              {/* Education Level */}
              <Grid item xs={12} sm={6} md={4}>
                <CustomFormLabel htmlFor="edu_level_id">
                  Education Level
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  placeholder="Education Level"
                  size="small"
                  {...register("edu_level_id", {
                    required: "Education Level is required",
                  })}
                  helperText={errors.edu_level_id?.message}
                  error={!!errors.edu_level_id}
                />
              </Grid>

              {/* Leader Name */}
              <Grid item xs={12} sm={6} md={4}>
                <CustomFormLabel htmlFor="leader_name">
                  Leader Name
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  placeholder="Leader Name"
                  size="small"
                  {...register("leader_name", {
                    required: "Leader Name is required",
                  })}
                  helperText={errors.leader_name?.message}
                  error={!!errors.leader_name}
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12} sm={6} md={4}>
                <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  placeholder="Email"
                  size="small"
                  {...register("email", { required: "Email is required" })}
                  helperText={errors.email?.message}
                  error={!!errors.email}
                />
              </Grid>

              {/* Telephone */}
              <Grid item xs={12} sm={6} md={4}>
                <CustomFormLabel htmlFor="telephone">Telephone</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  placeholder="Telephone"
                  size="small"
                  {...register("telephone", {
                    required: "Telephone is required",
                  })}
                  helperText={errors.telephone?.message}
                  error={!!errors.telephone}
                />
              </Grid>

              {/* Address */}
              <Grid item xs={12}>
                <CustomFormLabel htmlFor="address">Address</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  placeholder="Address"
                  size="small"
                  {...register("address", { required: "Address is required" })}
                  helperText={errors.address?.message}
                  error={!!errors.address}
                />
              </Grid>

              {/* Province */}
              <Grid item xs={12} sm={6} md={4}>
                <CustomFormLabel htmlFor="province_id">
                  Province ID
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  placeholder="Province ID"
                  size="small"
                  {...register("province_id", {
                    required: "Province ID is required",
                  })}
                  helperText={errors.province_id?.message}
                  error={!!errors.province_id}
                />
              </Grid>

              {/* City */}
              <Grid item xs={12} sm={6} md={4}>
                <CustomFormLabel htmlFor="city_id">City ID</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  placeholder="City ID"
                  size="small"
                  {...register("city_id", {
                    required: "City ID is required",
                  })}
                  helperText={errors.city_id?.message}
                  error={!!errors.city_id}
                />
              </Grid>

              {/* District */}
              <Grid item xs={12} sm={6} md={4}>
                <CustomFormLabel htmlFor="district_id">
                  District ID
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  placeholder="District ID"
                  size="small"
                  {...register("district_id", {
                    required: "District ID is required",
                  })}
                  helperText={errors.district_id?.message}
                  error={!!errors.district_id}
                />
              </Grid>

              {/* Village */}
              <Grid item xs={12} sm={6} md={4}>
                <CustomFormLabel htmlFor="village_id">
                  Village ID
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  placeholder="Village ID"
                  size="small"
                  {...register("village_id", {
                    required: "Village ID is required",
                  })}
                  helperText={errors.village_id?.message}
                  error={!!errors.village_id}
                />
              </Grid>

              {/* Post Code */}
              <Grid item xs={12} sm={6} md={4}>
                <CustomFormLabel htmlFor="post_code">Post Code</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  placeholder="Post Code"
                  size="small"
                  {...register("post_code", {
                    required: "Post Code is required",
                  })}
                  helperText={errors.post_code?.message}
                  error={!!errors.post_code}
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
