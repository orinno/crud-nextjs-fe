"use client";

import { useMemo, useState } from "react";
import DialogCurrency from "@/app/views/master/currency/DialogCurrency";
import {
    Box,
    Button,
    Grid,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { IconCirclePlus, IconSearch } from "@tabler/icons-react";

export default function List() {
    //ini untuk onClick
    const [action, setAction] = useState<"add" | "edit">("add");
    const [show, setShow] = useState(false);
    const rows = [
        {
            id: 1,
            name: "Rupiah",
            code: "RP",
            kurs: 12500,
        },
        {
            id: 2,
            name: "Dollar",
            code: "USD",
            kurs: 13000,
        },
    ];

    return (
        <div>
            <Box sx={{ mb: 2 }}>
                <Typography variant="h3">List Currency</Typography>
            </Box>
            <Box>
                <Grid
                    container
                    sx={{ display: "flex" }}
                    alignItems="center"
                    justifyContent={"space-between"}
                >
                    <Grid item>
                        <TextField
                            id="input-with-icon-adornment"
                            size="small"
                            placeholder="Search..."
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconSearch />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            startIcon={<IconCirclePlus width={18} />}
                            onClick={() => {
                                setAction("add");
                                setShow(true);
                            }}
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Paper variant="outlined" sx={{ mt: 1 }}>
                <TableContainer>
                    <Table
                        size={"medium"}
                        sx={{ minWidth: 650 }}
                        aria-label="simple table "
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="h6">No</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">Code</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">Name</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">Kurs</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <Typography variant="subtitle2">{index + 1}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2">{row.code}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2">{row.name}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2">Rp. {row.kurs}</Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <DialogCurrency
                open={show}
                handleClose={() => {
                    setShow(false);
                }}
            />
        </div>
    );
}
