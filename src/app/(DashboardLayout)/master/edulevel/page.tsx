"use client";

import { useState } from "react";
import DialogEdulevel from "@/app/views/master/edulevel/DialogEdulevel";
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
  Pagination,
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
    { code: "SD", name: "Sekolah Dasar", description: "Tingkat pendidikan dasar untuk anak usia 6 hingga 12 tahun." },
    { code: "SMP", name: "Sekolah Menengah Pertama", description: "Tingkat pendidikan menengah pertama untuk anak usia 12 hingga 15 tahun." },
    { code: "SMA", name: "Sekolah Menengah Atas", description: "Tingkat pendidikan menengah atas untuk remaja usia 15 hingga 18 tahun." },
    { code: "D3", name: "Diploma 3", description: "Program pendidikan vokasi setara dengan jenjang pendidikan diploma tiga." },
    { code: "S1", name: "Sarjana", description: "Tingkat pendidikan tinggi pertama yang ditempuh setelah SMA/SMK." },
    { code: "S2", name: "Magister", description: "Tingkat pendidikan pascasarjana setelah menyelesaikan program sarjana." },
    { code: "S3", name: "Doktor", description: "Tingkat pendidikan tertinggi yang ditempuh setelah magister." },
  ];

  const [action, setAction] = useState<"add" | "edit" | "show">("add");
  const [show, setShow] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogType, setDialogType] = useState<"delete" | "edit" | "show" | null>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const paginatedRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, row: any) => {
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
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h3">List Education level</Typography>
      </Box>
      <Box>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <TextField
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
            size="medium"
            sx={{
              minWidth: 650,
              "& tr:last-child": {
                borderBottom: "2px solid #ddd",
              },
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6">No</Typography></TableCell>
                <TableCell><Typography variant="h6">Name Edulevel</Typography></TableCell>
                <TableCell><Typography variant="h6">Code</Typography></TableCell>
                <TableCell><Typography variant="h6">Description</Typography></TableCell>
                <TableCell><Typography variant="h6">Action</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row, index) => (
                <TableRow key={row.code}>
                  <TableCell><Typography variant="subtitle2">{(page - 1) * rowsPerPage + index + 1}</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2">{row.name}</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2">{row.code}</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2">{row.description}</Typography></TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={(e) => handleMenuOpen(e, row)}>
                      <IconDotsVertical />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && selectedRow?.code === row.code}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={() => handleAction("show")}> <IconEye style={{ marginRight: 8 }} /> Show </MenuItem>
                      <MenuItem onClick={() => handleAction("edit")}> <IconEdit style={{ marginRight: 8 }} /> Edit </MenuItem>
                      <MenuItem onClick={() => handleAction("delete")}> <IconTrash style={{ marginRight: 8 }} /> Delete </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="center" my={2}>
          <Pagination
            count={Math.ceil(rows.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </Box>
      </Paper>

      <DialogEdulevel
        open={show}
        handleClose={() => setShow(false)}
        onSuccess={() => setShow(false)}
        data={selectedRow || {}}
      />

      {dialogType === "delete" && (
        <DialogEdulevel
          open={true}
          handleClose={() => setDialogType(null)}
          onSuccess={() => {
            console.log("Deleted:", selectedRow);
            setDialogType(null);
          }}
        />
      )}
    </div>
  );
} 
