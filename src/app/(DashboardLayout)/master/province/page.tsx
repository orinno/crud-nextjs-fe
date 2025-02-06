/** eslint-disable lines-around-comment */
"use client";

import { useState } from "react";
import DialogProvince from "@/app/views/master/province/DialogProvince";
import {
  Box,
  Button,
  Grid,
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
  IconButton,
} from "@mui/material";
import {
  IconCirclePlus,
  IconSearch,
  IconDotsVertical,
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

  const [show, setShow] = useState(false);
  const [action, setAction] = useState<"add" | "edit">("add");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    row: any
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h3">List Data Edulevel</Typography>
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
          <Table size="medium" sx={{ minWidth: 650 }} aria-label="simple table">
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
              {rows.map((row, index) => (
                <TableRow key={row.code}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.code}</TableCell>
                  <TableCell>{row.province_name}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    <IconButton onClick={(e) => handleMenuClick(e, row)}>
                      <IconDotsVertical />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            setAction("edit");
            setShow(true);
            handleMenuClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
      </Menu>

      <DialogProvince
        open={show}
        handleClose={() => setShow(false)}
        onSuccess={() => setShow(false)}
        data={selectedRow || {}}
      />
    </div>
  );
}
