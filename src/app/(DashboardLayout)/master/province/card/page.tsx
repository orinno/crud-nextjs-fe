"use client";

import { useState } from "react";
import DialogProvince from "@/app/views/master/province/DialogProvince";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  IconButton,
  Typography,
  Pagination,
  TextField,
  InputAdornment,
  Menu,
  MenuItem
} from "@mui/material";
import {
  IconCirclePlus,
  IconDotsVertical,
  IconEdit,
  IconEye,
  IconTrash,
  IconSearch,
  IconArrowLeft as IconBack
} from "@tabler/icons-react";

export default function List() {
  const rows = [
    { id: 1, code: "ID-JK", province_name: "Jakarta", description: "Ibu kota Indonesia" },
    { id: 2, code: "ID-BT", province_name: "Banten", description: "Provinsi yang terletak di bagian barat pulau jawa" },
    { id: 3, code: "ID-JT", province_name: "Jawa Tengah", description: "Terletak di bagian tengah pulau jawa" },
    { id: 4, code: "ID-YO", province_name: "Yogyakarta", description: "Daerah istimewa Yogyakarta" },
    { id: 5, code: "ID-SU", province_name: "Sumatera Utara", description: "Provinsi yang berada di pulau sumatra" },
  ];

  const [action, setAction] = useState<"add" | "edit" | "show">("add");
  const [show, setShow] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogType, setDialogType] = useState<"delete" | "edit" | "show" | null>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const [page, setPage] = useState(1);
  const rowsPerPage = 4;
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
        <Typography variant="h3">List Province</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
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
        <Button
          variant="contained"
          startIcon={<IconCirclePlus />}
          onClick={() => {
            setAction("add");
            setShow(true);
          }}
        >
          Add
        </Button>
      </Box>

      <Grid container spacing={2}>
        {paginatedRows.map((row) => (
          <Grid item xs={12} sm={6} md={4} key={row.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{row.province_name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Code: {row.code}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>{row.description}</Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton size="small" onClick={(e) => handleMenuOpen(e, row)}>
                  <IconDotsVertical />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && selectedRow?.id === row.id}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleAction("show")}> <IconEye style={{ marginRight: 8 }} /> Show </MenuItem>
                  <MenuItem onClick={() => handleAction("edit")}> <IconEdit style={{ marginRight: 8 }} /> Edit </MenuItem>
                  <MenuItem onClick={() => handleAction("delete")}> <IconTrash style={{ marginRight: 8 }} /> Delete </MenuItem>
                </Menu>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" my={2}>
        <Pagination
          count={Math.ceil(rows.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
      <Box display="flex" justifyContent="center" mt={2}>
        <Link href="/master/province" passHref>
          <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 2 }}>
            <IconBack style={{ marginRight: 8 }} />
            Back
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
