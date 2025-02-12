import { useMemo, useState } from "react";
import DialogInstitute from "@/app/views/master/institute/DialogInstitute";
import Link from "next/link";
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
  TablePagination,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  IconCirclePlus,
  IconSearch,
  IconEdit,
  IconTrash,
  IconDotsVertical,
  IconArrowRight,
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
      province_id: "31",
      city_id: "3171",
      district_id: "317101",
      village_id: "317101001",
      post_code: "10110",
    },
    {
      code: "INST002",
      name: "SMP Negeri 1 Bandung",
      edu_level_id: "SMP",
      leader_name: "Rina Wijaya",
      email: "smpn1bandung@gmail.com",
      telephone: "02287654321",
      address: "Jl. Diponegoro No. 5, Bandung",
      province_id: "32",
      city_id: "3273",
      district_id: "327302",
      village_id: "327302001",
      post_code: "40115",
    },
    {
      code: "INST003",
      name: "SMA Unggulan Cendekia",
      edu_level_id: "SMA",
      leader_name: "Ahmad Fauzi",
      email: "sma.cendekia@gmail.com",
      telephone: "02198765432",
      address: "Jl. Sudirman No. 25, Surabaya",
      province_id: "35",
      city_id: "3578",
      district_id: "357801",
      village_id: "357801001",
      post_code: "60271",
    },
    {
      code: "INST004",
      name: "Universitas Terbuka Indonesia",
      edu_level_id: "Universitas",
      leader_name: "Prof. Siti Nurhaliza",
      email: "info@uti.ac.id",
      telephone: "02145678901",
      address: "Jl. Raya Bogor KM 20, Depok",
      province_id: "32",
      city_id: "3276",
      district_id: "327603",
      village_id: "327603001",
      post_code: "16424",
    },
    {
      code: "INST005",
      name: "PAUD Melati",
      edu_level_id: "PAUD",
      leader_name: "Anita Permata",
      email: "paudmelati@gmail.com",
      telephone: "02123456789",
      address: "Jl. Mawar No. 8, Bekasi",
      province_id: "32",
      city_id: "3275",
      district_id: "327504",
      village_id: "327504001",
      post_code: "17111",
    },
    {
      code: "INST006",
      name: "SMK Teknik Mandiri",
      edu_level_id: "SMK",
      leader_name: "Hendra Kusuma",
      email: "smk.mandiri@gmail.com",
      telephone: "02212345678",
      address: "Jl. Veteran No. 10, Semarang",
      province_id: "33",
      city_id: "3374",
      district_id: "337401",
      village_id: "337401001",
      post_code: "50139",
    },
    {
      code: "INST007",
      name: "TK Tunas Bangsa",
      edu_level_id: "TK",
      leader_name: "Lina Marlina",
      email: "tk.tunasbangsa@gmail.com",
      telephone: "02134567890",
      address: "Jl. Anggrek No. 15, Tangerang",
      province_id: "36",
      city_id: "3671",
      district_id: "367102",
      village_id: "367102001",
      post_code: "15111",
    },
    {
      code: "INST008",
      name: "Politeknik Negeri Jakarta",
      edu_level_id: "Politeknik",
      leader_name: "Dr. Agus Prasetyo",
      email: "info@pnj.ac.id",
      telephone: "02156789012",
      address: "Jl. Prof. DR. G.A. Siwabessy, Depok",
      province_id: "31",
      city_id: "3174",
      district_id: "317403",
      village_id: "317403001",
      post_code: "16425",
    },
    {
      code: "INST009",
      name: "Madrasah Aliyah Al-Ikhlas",
      edu_level_id: "MA",
      leader_name: "Ustadz Ahmad Rifai",
      email: "ma.alikhlas@gmail.com",
      telephone: "02167890123",
      address: "Jl. KH. Mas Mansyur No. 20, Bogor",
      province_id: "32",
      city_id: "3271",
      district_id: "327105",
      village_id: "327105001",
      post_code: "16151",
    },
    {
      code: "INST010",
      name: "Akademi Keperawatan Sehat",
      edu_level_id: "Akademi",
      leader_name: "Dra. Dewi Sartika",
      email: "akper.sehat@gmail.com",
      telephone: "02178901234",
      address: "Jl. Gatot Subroto No. 30, Yogyakarta",
      province_id: "34",
      city_id: "3471",
      district_id: "347102",
      village_id: "347102001",
      post_code: "55224",
    },
  ];

  const [show, setShow] = useState(false);
  const [action, setAction] = useState<"add" | "edit">("add");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Pagination minimal 5 baris
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Untuk menu dropdown
  const [selectedRow, setSelectedRow] = useState(null); // Untuk menyimpan baris yang dipilih

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = () => {
    setAction("edit");
    setShow(true);
    console.log("Editing:", selectedRow);
    handleCloseMenu();
  };

  const handleDelete = () => {
    console.log("Deleting:", selectedRow);
    handleCloseMenu();
  };

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>, row: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleGoToCardView = () => {
    window.location.href = "/master/institute/card"; // Redirect langsung ke halaman card view
  };

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h3">Daftar Institusi</Typography>
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
              placeholder="Cari..."
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
              Tambah
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Paper variant="outlined" sx={{ mt: 1 }}>
        <TableContainer>
          <Table
            size={"medium"}
            sx={{ minWidth: 650 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Kode</TableCell>
                <TableCell>Nama</TableCell>
                <TableCell>Tingkat Pendidikan</TableCell>
                <TableCell>Nama Pemimpin</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Telepon</TableCell>
                <TableCell>Alamat</TableCell>
                <TableCell>ID Provinsi</TableCell>
                <TableCell>ID Kota</TableCell>
                <TableCell>ID Kecamatan</TableCell>
                <TableCell>ID Desa</TableCell>
                <TableCell>Kode Pos</TableCell>
                <TableCell>Aksi</TableCell> {/* Kolom Aksi */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={row.code}>
                    <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                    <TableCell>{row.code}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.edu_level_id}</TableCell>
                    <TableCell>{row.leader_name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.telephone}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>{row.province_id}</TableCell>
                    <TableCell>{row.city_id}</TableCell>
                    <TableCell>{row.district_id}</TableCell>
                    <TableCell>{row.village_id}</TableCell>
                    <TableCell>{row.post_code}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-controls={Boolean(anchorEl) ? "menu" : undefined}
                        aria-haspopup="true"
                        onClick={(e) => handleClickMenu(e, row)}
                      >
                        <IconDotsVertical />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth={false} // Nonaktifkan fullWidth agar tombol tidak memenuhi lebar layar
          sx={{
            mt: 2,
            px: 3, // Padding horizontal lebih kecil
            py: 1, // Padding vertikal lebih kecil
            fontSize: "0.875rem", // Ukuran font lebih kecil
            width: "fit-content", // Lebar tombol menyesuaikan konten
            minWidth: "200px", // Minimal lebar tombol (opsional)
            textTransform: "none", // Menghilangkan transformasi teks menjadi kapital
            "&:hover": {
              backgroundColor: "#5d87ff", // Warna latar belakang saat hover
              color: "#fff", // Warna teks saat hover
            },
          }}
          onClick={handleGoToCardView}
        >
          Lihat Versi Kartu
          <IconArrowRight style={{ marginLeft: 4, width: 16, height: 16 }} />{" "}
          {/* Ikon lebih kecil */}
        </Button>
      </Box>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleEdit}>
          <IconEdit style={{ marginRight: 8 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <IconTrash style={{ marginRight: 8 }} />
          Hapus
        </MenuItem>
      </Menu>
      <DialogInstitute
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