"use client";

import { useEffect, useState } from "react";
import DialogUnits from "@/app/views/master/units/DialogUnits";
import DialogDeleteUnits from "@/app/views/master/units/DialogDeleteUnits";
import PaginationActions from "@/app/Components/ui-component/PaginationAction";
// import LocalTimestamp from "@/app/Components/ui-component/LocalTimestamp";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography, MenuItem,
} from "@mui/material";
import { IconCirclePlus, IconDotsVertical, IconSearch } from "@tabler/icons-react";
import ApiService from "@/service/BaseService"; // Import ApiService
import { IconEye, IconEdit, IconTrash } from "@tabler/icons-react";
import { getListUnit, deleteUnit } from "@/service/master/UnitService";
import { rowHeightWarning } from "@mui/x-data-grid/hooks/features/rows/gridRowsUtils";
import DropdownAction from "@/app/Components/ui-component/ActionDropdown";
import DocumentUploadForm from "@/app/Components/ui-component/DocumentUploadForm";
import Loading from "@/app/loading";

export default function List() {
  // State to store fetched data
  const [rows, setRows] = useState<any[]>([]);
  const [totalRows, setTotalRows] = useState(0); // Total number of rows
  const [page, setPage] = useState(1); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

  //untuk searching
  const [searchQuery, setSearchQuery] = useState("");

  // States for dialog and action
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showShowDialog, setShowShowDialog] = useState(false); // Untuk dialog Show
  const [showEditDialog, setShowEditDialog] = useState(false); // Untuk dialog Edit
  const [showDeleteDialog, setShowDeleteDialog] = useState(false); // Untuk dialog Delete
  const [selectedRow, setSelectedRow] = useState<any>(null); // Data baris yang dipilih

  // State for menu anchor and selected row
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Handle menu open
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, row: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };


  const handleAction = (action: string) => {
    if (action === 'show') {
      setShowShowDialog(true); // Buka dialog Show
    } else if (action === 'edit') {
      setShowEditDialog(true); // Buka dialog Edit
    } 
    handleMenuClose(); // Tutup menu dropdown
  };

  const handleDeleteClick = (row: any) => {
    console.log(row);
    setSelectedRow(row); // Set selectedRow dengan data baris yang dipilih
    setShowDeleteDialog(true); // Buka dialog delete
  };

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const response = await getListUnit({ page: page, pageSize: rowsPerPage, search: searchQuery });
      console.log(response.data);
      setRows(response.data); // Set the fetched data to the state
      setTotalRows(response.total); // Set the total rows
      // console.log(response.total); // Set
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data from the API on component mount
  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, searchQuery]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      fetchData(); // Jalankan pencarian ketika tombol Enter ditekan
    }
  };
  // console.log(rowsPerPage);
  // console.log(page);
  // Handle page change
  const handleChangePage = (
    event: React.ChangeEvent<HTMLInputElement>,
    newPage: number
  ) => {
    console.log(newPage);
    setPage(newPage); // Perbarui state page
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  const handleConfirmDelete = async () => {
  try {
    if (selectedRow && selectedRow.id) {
      console.log(selectedRow.id);
      await deleteUnit(`${selectedRow.id}`);
    } else {
      console.error("Selected row is null or undefined");
    }
    setShowDeleteDialog(false);
    // Refresh data setelah penghapusan
    const response = await getListUnit({ page: page, pageSize: rowsPerPage, search: searchQuery });
    setRows(response.data);
    setTotalRows(response.total);
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};

  return (
    <div>
      <Box sx={{ mb: 2 }}>
      <Typography variant="h3">List Units</Typography>
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
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown} // Tambahkan event listener untuk tombol Enter
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
          onClick={() => setShowAddDialog(true)}
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
        sx={{ minWidth: 650, maxHeight: 300 }}
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
            <Typography variant="h6">Desc</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h6">Aksi</Typography>
          </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any, index: number) => (
          <TableRow key={row.id}>
            <TableCell>
            <Typography variant="subtitle2">{index - 4 + page * rowsPerPage}</Typography>
            </TableCell>
            <TableCell>
            <Typography variant="subtitle2"> {row.name}</Typography>
            </TableCell>
            <TableCell>
            <Typography variant="subtitle2"> {row.description}</Typography>
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
                      <MenuItem onClick={() => handleDeleteClick(row)}>
                        <IconTrash style={{ marginRight: 8 }} /> Delete
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
              <PaginationActions
              count={totalRows}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
            />
        </TableContainer>
      </Paper>

      

      {/* Dialog for Add */}
      <DialogUnits
        open={showAddDialog}
        handleClose={() => setShowAddDialog(false)}
        onSuccess={() => {
          setShowAddDialog(false);
          fetchData();
          // Refresh data atau lakukan sesuatu setelah sukses
        }}
        mode="add"
      />

      {/* Dialog for Show */}
      <DialogUnits
        open={showShowDialog}
        handleClose={() => setShowShowDialog(false)}
        onSuccess={() => {
          setShowShowDialog(false)
          fetchData();
        }}
        data={selectedRow} // Pastikan selectedRow diteruskan
        mode="show" // Mode show  
      />

      {/* Dialog for Edit */}
      <DialogUnits
        open={showEditDialog}
        handleClose={() => setShowEditDialog(false)}
        onSuccess={() => {
          setShowEditDialog(false);
          fetchData();
          // Refresh data atau lakukan sesuatu setelah sukses
        }}
        data={selectedRow}
        mode="edit"
      />

      {/* Dialog for Delete */}
      <DialogDeleteUnits
        open={showDeleteDialog}
        handleClose={() => setShowDeleteDialog(false)}
        onClose={() => setShowDeleteDialog(false)}
        onSuccess={() => {
          setShowDeleteDialog(false);
          fetchData(); // Refresh data after successful deletion
        }}
        onConfirm={handleConfirmDelete}
        data={selectedRow}
      />

    </div>
  );
}