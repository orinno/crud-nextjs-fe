"use client";
import { useMemo, useState } from "react";
import DialogCity from "@/app/views/master/city/DialogCity";

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
      code: "K001",
      city_name: "Jakarta",
      provinceId: 1,
      province: { name: "DKI Jakarta" },
      description: "Pusat pemerintahan dan ekonomi Indonesia.",
    },
    {
      id: 2,
      code: "K002",
      city_name: "Bandung",
      provinceId: 2,
      province: { name: "Jawa Barat" },
      description: "Kota kreatif dengan suasana pegunungan.",
    },
    {
      id: 3,
      code: "K003",
      city_name: "Surabaya",
      provinceId: 3,
      province: { name: "Jawa Timur" },
      description: "Kota pahlawan dengan pelabuhan besar.",
    },
    {
      id: 4,
      code: "K004",
      city_name: "Yogyakarta",
      provinceId: 4,
      province: { name: "DI Yogyakarta" },
      description: "Kota budaya dan pusat pendidikan.",
    },
    {
      id: 5,
      code: "K005",
      city_name: "Medan",
      provinceId: 5,
      province: { name: "Sumatera Utara" },
      description: "Kota terbesar di Sumatera Utara.",
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
    // "delete" will show confirmation dialog directly
  };

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h3">List City</Typography>
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
                  <Typography variant="h6">Nama Kota</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">ID Provinsi</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Nama Provinsi</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Deskripsi</Typography>
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
                    <Typography variant="subtitle2">{row.city_name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {row.provinceId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {row.province?.name || "N/A"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {row.description}
                    </Typography>
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
      <DialogCity
        open={show}
        handleClose={() => setShow(false)}
        onSuccess={() => setShow(false)}
        // data={selectedRow || {}}
      />

      {/* Dialog for Delete Confirmation */}
      {dialogType === "delete" && (
        <DialogCity
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
