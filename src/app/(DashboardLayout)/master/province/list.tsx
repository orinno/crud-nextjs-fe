"use client";

import { useState } from "react";
import DialogProvince from "@/app/views/master/province/DialogProvince";
import Link from "next/link";
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
  IconArrowRight,
} from "@tabler/icons-react";

export default function List() {
  const rows = [
    {
      id: 1,
      code: "ID-JK",
      province_name: "Jakarta",
      description: "Ibu kota Indonesia",
    },
    {
      id: 2,
      code: "ID-BT",
      province_name: "Banten",
      description: "Provinsi yang terletak di bagian barat pulau jawa",
    },
    {
      id: 3,
      code: "ID-JT",
      province_name: "Jawa Tengah",
      description: "Terletak di bagian tengah pulau jawa",
    },
    {
      id: 4,
      code: "ID-YO",
      province_name: "Yogyakarta",
      description: "Daerah istimewa Yogyakarta",
    },
    {
      id: 5,
      code: "ID-SU",
      province_name: "Sumatera Utara",
      description: "Provinsi yang berada di pulau sumatra",
    },
  ];

  const [action, setAction] = useState<"add" | "edit" | "show">("add");
  const [show, setShow] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogType, setDialogType] = useState<
    "delete" | "edit" | "show" | null
  >(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const paginatedRows = rows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

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
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h3">List Province</Typography>
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
                <TableCell>
                  <Typography variant="h6">No</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Code</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Name Province</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Description</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {(page - 1) * rowsPerPage + index + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{row.code}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {row.province_name}
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
                        {" "}
                        <IconEye style={{ marginRight: 8 }} /> Show{" "}
                      </MenuItem>
                      <MenuItem onClick={() => handleAction("edit")}>
                        {" "}
                        <IconEdit style={{ marginRight: 8 }} /> Edit{" "}
                      </MenuItem>
                      <MenuItem onClick={() => handleAction("delete")}>
                        {" "}
                        <IconTrash style={{ marginRight: 8 }} /> Delete{" "}
                      </MenuItem>
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

      <Box display="flex" justifyContent="center" mt={2}>
        <Link href="/master/province/card" passHref>
          <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 2 }}>
            Go to Card View<IconArrowRight style={{ marginLeft: 4 }} />
          </Button>
        </Link>
      </Box>

      <DialogProvince
        open={show}
        handleClose={() => setShow(false)}
        onSuccess={() => setShow(false)}
        data={selectedRow || {}}
      />

      {dialogType === "delete" && (
        <DialogProvince
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
