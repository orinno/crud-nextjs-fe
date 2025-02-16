"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import DialogInstitute from "@/app/views/master/institute/DialogInstitute";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography,
  IconButton,
  Pagination,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  IconCirclePlus,
  IconDotsVertical,
  IconEdit,
  IconTrash,
  IconSearch,
  IconArrowLeft as IconBack,
} from "@tabler/icons-react";

export default function List() {
  const rows = [
    {
      code: "INST001",
      name: "Sekolah Dasar Harapan Bangsa",
      edu_level_id: "SD",
      leader_name: "Budi Santoso",
      email: "sd.harapanbangsa@gmail.com",
      telephone: "02112345678",
      address: "Jl. Merdeka No. 12, Jakarta Pusat",
    },
    {
      code: "INST002",
      name: "SMP Negeri 1 Bandung",
      edu_level_id: "SMP",
      leader_name: "Rina Wijaya",
      email: "smpn1bandung@gmail.com",
      telephone: "02287654321",
      address: "Jl. Diponegoro No. 5, Bandung",
    },
    {
      code: "INST003",
      name: "SMA Unggulan Cendekia",
      edu_level_id: "SMA",
      leader_name: "Ahmad Fauzi",
      email: "sma.cendekia@gmail.com",
      telephone: "02198765432",
      address: "Jl. Sudirman No. 25, Surabaya",
    },
    {
      code: "INST004",
      name: "Universitas Terbuka Indonesia",
      edu_level_id: "Universitas",
      leader_name: "Prof. Siti Nurhaliza",
      email: "info@uti.ac.id",
      telephone: "02145678901",
      address: "Jl. Raya Bogor KM 20, Depok",
    },
    {
      code: "INST005",
      name: "PAUD Melati",
      edu_level_id: "PAUD",
      leader_name: "Anita Permata",
      email: "paudmelati@gmail.com",
      telephone: "02123456789",
      address: "Jl. Mawar No. 8, Bekasi",
    },
    {
      code: "INST006",
      name: "SMK Teknik Mandiri",
      edu_level_id: "SMK",
      leader_name: "Hendra Kusuma",
      email: "smk.mandiri@gmail.com",
      telephone: "02212345678",
      address: "Jl. Veteran No. 10, Semarang",
    },
    {
      code: "INST007",
      name: "TK Tunas Bangsa",
      edu_level_id: "TK",
      leader_name: "Lina Marlina",
      email: "tk.tunasbangsa@gmail.com",
      telephone: "02134567890",
      address: "Jl. Anggrek No. 15, Tangerang",
    },
    {
      code: "INST008",
      name: "Politeknik Negeri Jakarta",
      edu_level_id: "Politeknik",
      leader_name: "Dr. Agus Prasetyo",
      email: "info@pnj.ac.id",
      telephone: "02156789012",
      address: "Jl. Prof. DR. G.A. Siwabessy, Depok",
    },
    {
      code: "INST009",
      name: "Madrasah Aliyah Al-Ikhlas",
      edu_level_id: "MA",
      leader_name: "Ustadz Ahmad Rifai",
      email: "ma.alikhlas@gmail.com",
      telephone: "02167890123",
      address: "Jl. KH. Mas Mansyur No. 20, Bogor",
    },
    {
      code: "INST010",
      name: "Akademi Keperawatan Sehat",
      edu_level_id: "Akademi",
      leader_name: "Dra. Dewi Sartika",
      email: "akper.sehat@gmail.com",
      telephone: "02178901234",
      address: "Jl. Gatot Subroto No. 30, Yogyakarta",
    },
  ];

  const [page, setPage] = useState(1);
  const rowsPerPage = 6; // Ubah menjadi 6 kartu per halaman
  const paginatedRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const [show, setShow] = useState(false);
  const [action, setAction] = useState<"add" | "edit">("add");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, row: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (type: "edit" | "delete") => {
    if (type === "edit") {
      setAction("edit");
      setShow(true);
    }
    handleMenuClose();
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h3">Daftar Institusi</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          size="small"
          placeholder="Cari..."
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
          Tambah
        </Button>
      </Box>
      <Grid container spacing={2}>
        {paginatedRows.map((row) => (
          <Grid item xs={12} sm={6} md={4} key={row.code}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{row.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Kode: {row.code}
                </Typography>
                <Typography variant="body2">Tingkat Pendidikan: {row.edu_level_id}</Typography>
                <Typography variant="body2">Nama Pemimpin: {row.leader_name}</Typography>
                <Typography variant="body2">Email: {row.email}</Typography>
                <Typography variant="body2">Telepon: {row.telephone}</Typography>
                <Typography variant="body2">Alamat: {row.address}</Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton size="small" onClick={(e) => handleMenuOpen(e, row)}>
                  <IconDotsVertical />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && selectedRow?.code === row.code}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleAction("edit")}>
                    <IconEdit style={{ marginRight: 8 }} /> Edit
                  </MenuItem>
                  <MenuItem onClick={() => handleAction("delete")}>
                    <IconTrash style={{ marginRight: 8 }} /> Hapus
                  </MenuItem>
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
        <Link href="/master/institute" passHref>
          <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 2 }}>
            <IconBack style={{ marginRight: 8 }} /> Kembali
          </Button>
        </Link>
      </Box>
      <DialogInstitute
        open={show}
        handleClose={() => setShow(false)}
        onSuccess={() => setShow(false)}
        data={selectedRow || {}}
      />
    </div>
  );
}