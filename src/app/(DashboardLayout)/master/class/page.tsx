"use client";
import { useState } from "react";
import DialogClass from "@/app/views/master/class/DialogClass";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
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
import {
  IconCirclePlus,
  IconDotsVertical,
  IconEdit,
  IconEye,
  IconTrash,
  IconSearch,
} from "@tabler/icons-react";

export default function List() {
  const rows = [
    {
      id: 1,
      name: "Pengenalan",
      code: "PP101",
      grade_id: "Dasar",
      program_id: "Teknologi Informasi",
      index: "101",
      start_time: "08:00",
      end_time: "10:00",
    },
    {
      id: 2,
      name: "Struktur Data",
      code: "SD102",
      grade_id: "Menengah",
      program_id: "Teknik Komputer",
      index: "102",
      start_time: "10:00",
      end_time: "12:00",
    },
    {
      id: 3,
      name: "Algoritma",
      code: "ALG103",
      grade_id: "Lanjut",
      program_id: "Ilmu Komputer",
      index: "103",
      start_time: "13:00",
      end_time: "15:00",
    },
    {
      id: 4,
      name: "Pengembangan Web",
      code: "PW104",
      grade_id: "Lanjut",
      program_id: "Desain Web",
      index: "104",
      start_time: "15:00",
      end_time: "17:00",
    },
    {
      id: 5,
      name: "Sistem Basis Data",
      code: "SBD105",
      grade_id: "Lanjut",
      program_id: "Sistem Informasi",
      index: "105",
      start_time: "17:00",
      end_time: "19:00",
    },
    {
      id: 6,
      name: "Sistem Basis Data 2",
      code: "SBD1052",
      grade_id: "Lanjut 2",
      program_id: "Sistem Informasi 2",
      index: "1055",
      start_time: "17:00",
      end_time: "19:00",
    },
    {
      id: 6,
      name: "Sistem Basis Data 2",
      code: "SBD1052",
      grade_id: "Lanjut 2",
      program_id: "Sistem Informasi 2",
      index: "1055",
      start_time: "17:00",
      end_time: "19:00",
    },
    {
      id: 7,
      name: "Sistem Basis Data 3",
      code: "SBD1052",
      grade_id: "Lanjut 3",
      program_id: "Sistem Informasi 3",
      index: "1055",
      start_time: "17:00",
      end_time: "19:00",
    },
  ];

  const [action, setAction] = useState<"add" | "edit" | "show">("add");
  const [show, setShow] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogType, setDialogType] = useState<
    "delete" | "edit" | "show" | null
  >(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    row: any
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (type: "edit" | "show" | "delete") => {
    setDialogType(type);
    setAnchorEl(null);
    if (type === "edit" || type === "show") {
      setAction(type);
      setShow(true);
    }
    // For "delete", the dialog will show confirmation directly
  };

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h3">List Class</Typography>
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
            sx={{ minWidth: 650,
              "& tr:last-child": {
                borderBottom: "2px solid #ddd", // Garis pembatas tebal di bawah header
              },
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">No</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Kode</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Nama</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Tingkat</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Program Studi</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Indeks</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Waktu Mulai</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Waktu Selesai</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Aksi</Typography>
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
                    <Typography variant="subtitle2">{row.grade_id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {row.program_id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{row.index}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {row.start_time}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{row.end_time}</Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, row)}
                    >
                      <IconDotsVertical />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && selectedRow?.id === row.id}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={() => handleAction("show")}>
                        <IconEye style={{ marginRight: 8 }} /> Show
                      </MenuItem>
                      <MenuItem onClick={() => handleAction("edit")}>
                        <IconEdit style={{ marginRight: 8 }} /> Edit
                      </MenuItem>
                      <MenuItem onClick={() => handleAction("delete")}>
                        <IconTrash style={{ marginRight: 8 }} /> Delete
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Dialog for Add/Edit/Show */}
      <DialogClass
        open={show}
        handleClose={() => setShow(false)}
        onSuccess={() => setShow(false)}
        data={selectedRow || {}}
      />

      {/* Dialog for Delete Confirmation */}
      {dialogType === "delete" && (
        <DialogClass
          open={true}
          handleClose={() => setDialogType(null)}
          onSuccess={() => {
            console.log("Deleted:", selectedRow);
            setDialogType(null);
          }}
          // data={{}}
        />
      )}
    </div>
  );
}
