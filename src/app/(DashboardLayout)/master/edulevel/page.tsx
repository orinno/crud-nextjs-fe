/** eslint-disable lines-around-comment */
"use client";

import { useState } from "react";
import DialogEdulevel from "@/app/views/master/edulevel/DialogEdulevel";
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
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  IconCirclePlus,
  IconSearch,
  IconDotsVertical,
} from "@tabler/icons-react";

export default function List() {
  const rows = [
    {
      name: 'Primary School',
      code: 'PS',
      description: 'The first stage of formal education, typically for children aged 6 to 12.'
    },
    {
      name: 'Junior High School',
      code: 'JHS',
      description: 'The stage of education typically for children aged 12 to 15.'
    },
    {
      name: 'Senior High School',
      code: 'SHS',
      description: 'The stage of education typically for adolescents aged 15 to 18.'
    },
    {
      name: 'Undergraduate',
      code: 'UG',
      description: 'The education level pursued after high school, typically leading to a Bachelor\'s degree.'
    },
    {
      name: 'Graduate',
      code: 'G',
      description: 'Education beyond the undergraduate level, leading to a Master\'s or Doctoral degree.'
    }
  ];

  const [show, setShow] = useState(false);
  const [action, setAction] = useState<"add" | "edit">("add");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };
  const handleMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    row: any
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };
  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h3">List Data Edulevel</Typography>
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
                  <Typography variant="h6">Nama Edulevel</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Kode</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Deskripsi</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={row.code}>
                  <TableCell>
                    <Typography variant="subtitle2">{index + 1}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2"> {row.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2"> {row.code}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2"> {row.description}</Typography>
                  </TableCell>
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
      <DialogEdulevel
        open={show}
        handleClose={() => {
          setShow(false);
        }}
        onSuccess={() => {
          setShow(false);
        }}
        data={{} as any} // This is where you would pass the data for the dialog, possibly based on action type
      />
    </div>
  );
}
