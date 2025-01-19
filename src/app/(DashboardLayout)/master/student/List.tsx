/** eslint-disable lines-around-comment */
"use client";

import { useMemo, useState } from "react";
import DialogStudents from "@/app/views/master/student/DialogStudents";
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
    const rows = [
        {
            id: 1,
            name: "Aulia Rahman",
            gender: "Laki-laki",
            institution: "SMK Negeri 1 Bandung",
            email: "aulia.rahman@example.com",
            class: "XI RPL 1",
            password: "aulia123",
            birth_place: "Bandung",
            birth_date: "2006-01-12",
            address: "Jl. Melati No. 10",
            province: "Jawa Barat",
            city: "Bandung",
            district: "Coblong",
            village: "Dago"
        },
        {
            id: 2,
            name: "Citra Ayu",
            gender: "Perempuan",
            institution: "SMK Negeri 2 Jakarta",
            email: "citra.ayu@example.com",
            class: "XII RPL 2",
            password: "citra456",
            birth_place: "Jakarta",
            birth_date: "2005-03-15",
            address: "Jl. Anggrek No. 25",
            province: "DKI Jakarta",
            city: "Jakarta Timur",
            district: "Matraman",
            village: "Kebon Manggis"
        },
        {
            id: 3,
            name: "Rizky Hidayat",
            gender: "Laki-laki",
            institution: "SMK Negeri 3 Surabaya",
            email: "rizky.hidayat@example.com",
            class: "X RPL 3",
            password: "rizky789",
            birth_place: "Surabaya",
            birth_date: "2007-07-20",
            address: "Jl. Mawar No. 11",
            province: "Jawa Timur",
            city: "Surabaya",
            district: "Wonokromo",
            village: "Dukuh Pakis"
        },
        {
            id: 4,
            name: "Fitri Maulida",
            gender: "Perempuan",
            institution: "SMK Negeri 4 Malang",
            email: "fitri.maulida@example.com",
            class: "XI MM 1",
            password: "fitri2023",
            birth_place: "Malang",
            birth_date: "2006-09-05",
            address: "Jl. Kenanga No. 8",
            province: "Jawa Timur",
            city: "Malang",
            district: "Lowokwaru",
            village: "Tunggulwulung"
        },
        {
            id: 5,
            name: "Dika Pratama",
            gender: "Laki-laki",
            institution: "SMK Negeri 5 Semarang",
            email: "dika.pratama@example.com",
            class: "XII TKR 2",
            password: "dika4567",
            birth_place: "Semarang",
            birth_date: "2005-02-22",
            address: "Jl. Mangga No. 2",
            province: "Jawa Tengah",
            city: "Semarang",
            district: "Candisari",
            village: "Jomblang"
        }
    ];

    const [action, setAction] = useState<"add" | "edit">("add");
    const [show, setShow] = useState(false);

    return (
        <div>
            <Box sx={{ mb: 2 }}>
                <Typography variant="h3">List Students</Typography>
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
                            Add Students
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Paper variant="outlined" sx={{ mt: 1 }}>
                <TableContainer>
                    <Table
                        size={"medium"}
                        sx={{ minWidth: 800 }}
                        aria-label="simple table "
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="h6">No</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">Name</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">Gender</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">Institution</Typography>
                                </TableCell>
                                {/* <TableCell>
                                    <Typography variant="h6">Email</Typography>
                                </TableCell> */}
                                <TableCell>
                                    <Typography variant="h6">Class</Typography>
                                </TableCell>
                                {/* <TableCell>
                                    <Typography variant="h6">Password</Typography>
                                </TableCell> */}
                                {/* <TableCell>
                                    <Typography variant="h6">Birth Place</Typography>
                                </TableCell> */}
                                <TableCell>
                                    <Typography variant="h6">Birth Date</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">Address</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">Province</Typography>
                                </TableCell>
                                {/* <TableCell>
                                    <Typography variant="h6">City</Typography>
                                </TableCell> */}
                                {/* <TableCell>
                                    <Typography variant="h6">District</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">Village</Typography>
                                </TableCell> */}

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <Typography variant="subtitle2">{index + 1}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2"> {row.name}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2"> {row.gender}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2"> {row.institution}</Typography>
                                    </TableCell>
                                    {/* <TableCell>
                                        <Typography variant="subtitle2"> {row.email}</Typography>
                                    </TableCell> */}
                                    <TableCell>
                                        <Typography variant="subtitle2"> {row.class}</Typography>
                                    </TableCell>
                                    {/* <TableCell>
                                        <Typography variant="subtitle2"> {row.password}</Typography>
                                    </TableCell> */}
                                    {/* <TableCell>
                                        <Typography variant="subtitle2"> {row.birth_place}</Typography>
                                    </TableCell> */}
                                    <TableCell>
                                        <Typography variant="subtitle2"> {row.birth_date}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2"> {row.address}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2"> {row.province}</Typography>
                                    </TableCell>
                                    {/* <TableCell>
                                        <Typography variant="subtitle2"> {row.city}</Typography>
                                    </TableCell> */}
                                    {/* <TableCell>
                                        <Typography variant="subtitle2"> {row.district}</Typography>
                                    </TableCell> */}
                                    {/* <TableCell>
                                        <Typography variant="subtitle2"> {row.village}</Typography>
                                    </TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <DialogStudents
                open={show}
                handleClose={() => {
                    setShow(false);
                }}
                onSuccess={() => {
                    setShow(false);
                }}
                data={{} as any}
            />
        </div>
    );
}