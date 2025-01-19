import CustomTextField from "@/app/Components/forms/form-elements/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/Components/forms/theme-elements/CustomFormLabel";
import UppercaseInput from "@/app/Components/ui-component/input/UppercaseInput";
import { createStudent, updateStudent } from "@/service/master/StudentService";
import { IStudent } from "@/types/masterTypes";
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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText
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
    data?: IStudent | null;
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
        const params = {
            name: data.name,
            desc: data.desc,
        };
        try {
            const res = await createStudent(params);
            if (res) {
                toast.success("Data Student has been created");
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
        //     const res = await updateStudent(props.data?.id.toString(), data);
        //     if (res) {
        //       toast.success("Data Student has been updated");
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
                <DialogTitle>Add Student</DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent dividers>
                        <Grid
                            container
                            rowSpacing={2}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            mt={-2}
                        >
                            <Grid item xs={8} sm={8} md={8}>
                                <CustomTextField
                                    type="text"
                                    fullWidth
                                    placeholder="Name Student"
                                    size="small"
                                    {...register("name", { required: true })}
                                    helperText={errors.name && "Name is required"}
                                    error={errors.name ? true : false}
                                />
                            </Grid>
                            <Grid item xs={4} sm={4} md={4}>
                                <CustomTextField
                                    select
                                    fullWidth
                                    label="Gender Student" // Gunakan label, bukan placeholder
                                    size="small"
                                    {...register("gender", { required: true })}
                                    helperText={errors.gender && "Gender is required"}
                                    error={!!errors.gender} // Pastikan ini menghasilkan boolean
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                </CustomTextField>
                            </Grid>

                            <Grid item xs={6} sm={6} md={6}>
                                <CustomTextField
                                    type="text"
                                    fullWidth
                                    placeholder="Institution Student"
                                    size="small"
                                    {...register("institution", { required: true })}
                                    helperText={errors.institution && "Institution is required"}
                                    error={errors.institution ? true : false}
                                />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                                <CustomTextField
                                    type="email"
                                    fullWidth
                                    placeholder="Email Student"
                                    size="small"
                                    {...register("email", { required: true })}
                                    helperText={errors.email && "Email is required"}
                                    error={errors.email ? true : false}
                                />
                            </Grid>
                            <Grid item xs={4} sm={4} md={4}>
                                <CustomTextField
                                    type="text"
                                    fullWidth
                                    placeholder="Class Student"
                                    size="small"
                                    {...register("class", { required: true })}
                                    helperText={errors.class && "Class is required"}
                                    error={errors.class ? true : false}
                                />
                            </Grid>
                            <Grid item xs={4} sm={4} md={4}>
                                <CustomTextField
                                    type="password"
                                    fullWidth
                                    placeholder="Password Student"
                                    size="small"
                                    {...register("password", { required: true })}
                                    helperText={errors.password && "Password is required"}
                                    error={errors.password ? true : false}
                                />
                            </Grid>
                            <Grid item xs={4} sm={4} md={4}>
                                <CustomTextField
                                    type="date"
                                    fullWidth
                                    label="Birth Place"
                                    placeholder="Birth Place Student"
                                    size="small"
                                    InputLabelProps={{
                                        shrink:true,
                                    }}
                                    {...register("birth_place", { required: true })}
                                    helperText={errors.birth_place && "Birth Place is required"}
                                    error={!!errors.birth_date}
                                />
                            </Grid>
                            <Grid item xs={4} sm={4} md={4}>
                                <CustomTextField
                                    type="date"
                                    fullWidth
                                    label="Birth Date" // Tambahkan label
                                    size="small"
                                    InputLabelProps={{
                                        shrink: true, // Pastikan label tidak tumpang tindih dengan input
                                    }}
                                    {...register("birth_date", { required: true })}
                                    helperText={errors.birth_date && "Birth Date is required"}
                                    error={!!errors.birth_date} // Pastikan nilai boolean
                                />
                            </Grid>
                            <Grid item xs={4} sm={4} md={4}>
                                <CustomTextField
                                    type="text"
                                    fullWidth
                                    placeholder="Province Student"
                                    size="small"
                                    {...register("province", { required: true })}
                                    helperText={errors.province && "Province is required"}
                                    error={errors.province ? true : false}
                                />
                            </Grid>
                            <Grid item xs={4} sm={4} md={4}>
                                <CustomTextField
                                    type="text"
                                    fullWidth
                                    placeholder="City Student"
                                    size="small"
                                    {...register("city", { required: true })}
                                    helperText={errors.city && "City is required"}
                                    error={errors.city ? true : false}
                                />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                                <CustomTextField
                                    type="text"
                                    fullWidth
                                    placeholder="District Student"
                                    size="small"
                                    {...register("district", { required: true })}
                                    helperText={errors.district && "District is required"}
                                    error={errors.district ? true : false}
                                />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                                <CustomTextField
                                    type="text"
                                    fullWidth
                                    placeholder="Village Student"
                                    size="small"
                                    {...register("village", { required: true })}
                                    helperText={errors.village && "Village is required"}
                                    error={errors.village ? true : false}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <CustomTextField
                                    fullWidth
                                    placeholder="Address Student"
                                    size="small"
                                    multiline
                                    rows={3}
                                    {...register("address", { required: true })}
                                    helperText={errors.address && "Address is required"}
                                    error={errors.address ? true : false}
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