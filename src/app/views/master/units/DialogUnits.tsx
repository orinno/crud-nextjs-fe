import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Stack,
} from "@mui/material";
import CustomTextField from "@/app/Components/forms/form-elements/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/Components/forms/theme-elements/CustomFormLabel";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";
import { createUnit, updateUnit } from "@/service/master/UnitService";

type FormDialogProps = {
  open: boolean;
  handleClose: () => void;
  onSuccess: VoidFunction;
  data?: any;
  mode?: "add" | "edit" | "show";
};

const FormDialog = (props: FormDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<any>();

  useEffect(() => {
    if (props.mode === "edit" || props.mode === "show") {
      if (props.data) {
        setValue("id", props.data.id);
        setValue("name", props.data.name);
        setValue("description", props.data.description);
      }
    } else if (props.mode === "add") {
      reset({
        name: "",
        description: "",
      });
    }
  }, [props.data, props.mode, reset, setValue]);

  const onSubmit = async (data: any) => {
  console.log("Form data submitted:", data); // Logging data

      const params = {
        // id: data.id,
        name: data.name, 
        description: data.description,
      };

      if (!params.name || !params.description) {
        toast.error("Name and description are required");
        return;
      }

      try {
        if (props.mode === "edit" || props.data) {
          console.log("Updating unit with params:", params); // Logging params for update
          const res = await updateUnit(data.id, params);
          if (res) {
            toast.success("Data Unit has been updated");
            reset();
            props.handleClose();
            props.onSuccess();
          }
        } else if (props.mode === "add") {
          console.log("Creating unit with params:", params); // Logging params for create
          const res = await createUnit(params);
          if (res) {
            toast.success("Data Unit has been created");
            reset();
            props.handleClose();
            props.onSuccess();
          }
        }
      } catch (error: any) {
        console.error("Update Unit Error:", error);
        toast.error(error.message);
      }
};



  const handleClose = () => {
    reset({
      name: "",
      description: "",
    });
    props.handleClose();
  };

  const getDialogTitle = () => {
    switch (props.mode) {
      case "add":
        return "Add Unit";
      case "edit":
        return "Edit Unit";
      case "show":
        return "View Unit";
      default:
        return "Unit";
    }
  };

  return (
    <Dialog open={props.open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{getDialogTitle()}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            mt={-2}
          >
            {/* <Grid item xs={12} sm={12} md={12}>
              <CustomFormLabel htmlFor="id" sx={{ mt: 0 }}>
                Id{" "}
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
                placeholder="Id Units"
                size="small"
                {...register("id", { required: true })}
                helperText={errors.id && "id is required"}
                error={errors.id ? true : false}
                disabled={props.mode === "show"}
              />
            </Grid> */}
            <Grid item xs={12} sm={12} md={12}>
              <CustomFormLabel htmlFor="Name" sx={{ mt: 0 }}>
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
                placeholder="Name Units"
                size="small"
                {...register("name", { required: true })}
                helperText={errors.name && "Name is required"}
                error={errors.name ? true : false}
                disabled={props.mode === "show"}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <CustomFormLabel htmlFor="Description" sx={{ mt: 0 }}>
                Description{" "}
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
                disabled={props.mode === "show"}
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
            {props.mode !== "show" && (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                startIcon={<IconDeviceFloppy width={18} />}
              >
                Save
              </Button>
            )}
          </Stack>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default React.memo(FormDialog);
