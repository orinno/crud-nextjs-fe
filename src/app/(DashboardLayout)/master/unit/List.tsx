"use client";

import { useEffect, useState } from "react";
import DialogUnits from "@/app/views/master/units/DialogUnits";
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
import { getListUnit } from "@/service/master/UnitService";

export default function List() {
  // State to store fetched data
  const [rows, setRows] = useState<any[]>([]);

  // States for dialog and action
  const [action, setAction] = useState<"add" | "edit">("add");
  const [show, setShow] = useState(false);
  // State for menu anchor and selected row
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);

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

  // Handle actions
  const handleAction = (action: string) => {
    console.log(action, selectedRow);
    if(action === 'show') {
      setShow(true);
      setAction(action as any);
    } else if(action === 'edit') {
      setShow(true);
      setAction(action);
    } else if(action === 'delete') {
      // Show confirmation dialog directly
    }
    handleMenuClose();
  };

  // Fetch data from the API on component mount
  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getListUnit({ page: 1, pageSize: 10, search: "" });
        console.log(response)
        setRows(response as any); // Set the fetched data to the state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
                    <Typography variant="subtitle2">{index + 1}</Typography>
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
      <DialogUnits
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
