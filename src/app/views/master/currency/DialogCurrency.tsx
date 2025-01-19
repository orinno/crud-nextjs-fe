import CustomFormLabel from "@/app/Components/forms/theme-elements/CustomFormLabel";
import UppercaseInput from "@/app/Components/ui-component/input/UppercaseInput";
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
import React, { useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormDialogProps = {
    open: boolean;
    handleClose: () => void;
    //   onSuccess: VoidFunction;
};

const FormDialog: React.FC<FormDialogProps> = ({ open, handleClose }) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<any>();

    const onSubmit: SubmitHandler<any> = async (data) => {
        toast.success("Data saved successfully");
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>Add Currency</DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent dividers>
                        <Grid
                            container
                            rowSpacing={2}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            mt={-2}
                        >
                            {/* kolom  code */}
                            <Grid item xs={12} sm={12} md={12}>
                                <CustomFormLabel htmlFor="Code" sx={{ mt: 0 }}>
                                    Code{" "}
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ color: "red", display: "inline" }}>*
                                    </Typography>
                                </CustomFormLabel>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Enter currency code"
                                    size="small"
                                />
                            </Grid>
                            
                            {/* kolom  name*/}
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
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Enter name"
                                    size="small"
                                />
                            </Grid>

                            {/* kolom  kurs*/}
                            <Grid item xs={12} sm={12} md={12}>
                                <CustomFormLabel htmlFor="Kurs" sx={{ mt: 0 }}>
                                    Kurs{" "}
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ color: "red", display: "inline" }}
                                    >
                                        *
                                    </Typography>
                                </CustomFormLabel>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Enter exchange rate"
                                    size="small"
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
