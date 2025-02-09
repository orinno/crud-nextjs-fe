/** eslint-disable lines-around-comment */
"use client";

import { useMemo, useState } from "react";
import DialogCountry from "@/app/views/master/country/DialogCountry";
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
} from "@mui/material";
import { IconCirclePlus, IconSearch } from "@tabler/icons-react";

export default function List() {
    const rows = [
        {
          id: 1,
          country_name: "Indonesia",
          numcode: "360",
          nicename: "Indonesia",
          iso: "ID",
          iso3: "IDN",
          phonecode: "62"
        },
        {
          id: 2,
          country_name: "United States",
          numcode: "840",
          nicename: "United States",
          iso: "US",
          iso3: "USA",
          phonecode: "1"
        },
        {
          id: 3,
          country_name: "Japan",
          numcode: "392",
          nicename: "Japan",
          iso: "JP",
          iso3: "JPN",
          phonecode: "81"
        },
        {
          id: 4,
          country_name: "Germany",
          numcode: "276",
          nicename: "Germany",
          iso: "DE",
          iso3: "DEU",
          phonecode: "49"
        },
        {
          id: 5,
          country_name: "Australia",
          numcode: "036",
          nicename: "Australia",
          iso: "AU",
          iso3: "AUS",
          phonecode: "61"
        }
      ];
      

  const [show, setShow] = useState(false);
  const [action, setAction] = useState<"add" | "edit">("add");

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h3">List Data Kejadian</Typography>
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
      <Typography variant="h6">Nama Negara</Typography>
    </TableCell>
    <TableCell>
      <Typography variant="h6">Kode Numerik</Typography>
    </TableCell>
    <TableCell>
      <Typography variant="h6">Nama Singkat</Typography>
    </TableCell>
    <TableCell>
      <Typography variant="h6">Kode ISO</Typography>
    </TableCell>
    <TableCell>
      <Typography variant="h6">Kode ISO3</Typography>
    </TableCell>
    <TableCell>
      <Typography variant="h6">Kode Telepon</Typography>
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
        <Typography variant="subtitle2">{row.country_name}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{row.numcode}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{row.nicename}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{row.iso}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{row.iso3}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{row.phonecode}</Typography>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

          </Table>
        </TableContainer>
      </Paper>
      <DialogCountry
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
