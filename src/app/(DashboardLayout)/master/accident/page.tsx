/** eslint-disable lines-around-comment */
"use client";

import { useMemo, useState } from "react";
import DialogAccident from "@/app/views/master/accident/DialogAccident";
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
      name: "Sakit",
      date: "2025-01-18",
      start_time: "08:00",
      end_time: "09:00",
      location: "Sekolah",
      absen: "Absen Masuk",
      description: "Sakit",
    },
    {
      id: 2,
      name: "Izin",
      date: "2025-01-18",
      start_time: "08:00",
      end_time: "16:00",
      location: "Acara Keluarga",
      absen: "Absen Masuk",
      description: "Izin full tidak masuk",
    },
  ];

  const [show, setShow] = useState(false);
  const [action, setAction] = useState<"add" | "edit">("add");

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h3">List Data Kejadian</Typography>
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
                  <Typography variant="h6">Nama Kejadian</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Tanggal</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Jam Mulai</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Jam Selesai</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Lokasi</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Absen</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Keterangan</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Action</Typography>
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
                    <Typography variant="subtitle2"> {row.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2"> {row.date}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {row.start_time}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2"> {row.end_time}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2"> {row.location}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2"> {row.absen}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {row.description}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <DialogAccident
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
