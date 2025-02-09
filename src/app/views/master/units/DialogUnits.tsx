import CustomTextField from "@/app/Components/forms/form-elements/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/Components/forms/theme-elements/CustomFormLabel";
import UppercaseInput from "@/app/Components/ui-component/input/UppercaseInput";
import { createUnit, updateUnit } from "@/service/master/UnitService";
import { IUnit } from "@/types/masterTypes";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";
import { create } from "lodash";
import React, { ChangeEvent, useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormDialogProps = {
  open: boolean;
  handleClose: () => void;
  onSuccess: VoidFunction;
  data?: IUnit | null;
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

  // Method to refresh the page
  const refreshPage = () => {
      window.location.reload();
  };

  const onSubmit = async (data: any) => {
    const params = {
      name: data.name,
      description: data.description,
    };

    // Validate that both name and description are provided
    if (!params.name || !params.description) {
        toast.error("Name and description are required");
        return;
    }

    console.log(params)
    try {
      const res = await createUnit(params);
      if (res) {
        toast.success("Data Unit has been created");
        reset();
        handleClose();
        props.onSuccess();
        refreshPage();
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
      desc: "",
    });
    props.handleClose();
  };

  return (
    <>
      <Dialog open={props.open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Add Units</DialogTitle>
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
                  helperText={errors.desc && "Description is required"}
                  error={errors.desc ? true : false}
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
      </Dialog>
    </>
  );
};

export default React.memo(FormDialog);