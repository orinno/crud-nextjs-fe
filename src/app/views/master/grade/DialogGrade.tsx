import CustomTextField from "@/app/Components/forms/form-elements/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/Components/forms/theme-elements/CustomFormLabel";
import { createGrade, updateGrade } from "@/service/master/GradeService"; // Sesuaikan dengan API
import { IGrade } from "@/types/masterTypes";
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
  data?: IGrade | null;
};

const FormDialog = (props: FormDialogProps) => {
  const methods = useForm<IGrade>();
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: IGrade) => {
    try {
      if (props.data) {
        // Update data
        const res = await updateGrade(props.data.code, data);
        if (res) {
          toast.success("Grade data has been updated");
          props.onSuccess();
        }
      } else {
        // Create new data
        const res = await createGrade(data);
        if (res) {
          toast.success("Grade data has been created");
          props.onSuccess();
        }
      }
      reset();
      props.handleClose();
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
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
      <DialogTitle>{props.data ? "Edit Grade Data" : "Add Grade Data"}</DialogTitle>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <Grid container spacing={2}>
              {/* Name */}
              <Grid item xs={12}>
                <CustomFormLabel htmlFor="name">
                  Name{" "}
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
                  placeholder="Enter grade name"
                  size="small"
                  {...register("name", { required: true })}
                  helperText={errors.name && "Name is required"}
                  error={!!errors.name}
                />
              </Grid>

              {/* Code */}
              <Grid item xs={12}>
                <CustomFormLabel htmlFor="code">
                  Code{" "}
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
                  placeholder="Enter grade code"
                  size="small"
                  {...register("code", { required: true })}
                  helperText={errors.code && "Code is required"}
                  error={!!errors.code}
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <CustomFormLabel htmlFor="description">
                  Description
                </CustomFormLabel>
                <CustomTextField
                  type="text"
                  fullWidth
                  placeholder="Enter grade description"
                  size="small"
                  {...register("description")}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Stack direction="row" spacing={2}>
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
