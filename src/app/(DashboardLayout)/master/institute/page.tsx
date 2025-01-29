/** eslint-disable lines-around-comment */
"use client";

import { useMemo, useState } from "react";
import DialogInstitute from "@/app/views/master/institute/DialogInstitute";
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
      code: "INST001",
      name: "Alpha Institute",
      edu_level_id: "1",
      leader_name: "Dr. John Doe",
      email: "contact@alphainstitute.com",
      telephone: "1234567890",
      address: "123 Alpha Street",
      province_id: "10",
      city_id: "100",
      district_id: "1000",
      village_id: "10000",
      post_code: "54321",
      logo: "https://example.com/logo1.png",
    },
    {
      code: "INST002",
      name: "Beta Academy",
      edu_level_id: "2",
      leader_name: "Prof. Jane Smith",
      email: "info@betaacademy.com",
      telephone: "0987654321",
      address: "456 Beta Avenue",
      province_id: "20",
      city_id: "200",
      district_id: "2000",
      village_id: "20000",
      post_code: "65432",
      logo: "https://example.com/logo2.png",
    },
    {
      code: "INST003",
      name: "Gamma College",
      edu_level_id: "3",
      leader_name: "Mr. Alan Brown",
      email: "support@gammacollege.com",
      telephone: "1112223334",
      address: "789 Gamma Road",
      province_id: "30",
      city_id: "300",
      district_id: "3000",
      village_id: "30000",
      post_code: "76543",
      logo: "https://example.com/logo3.png",
    },
    {
      code: "INST004",
      name: "Delta University",
      edu_level_id: "4",
      leader_name: "Dr. Clara White",
      email: "admin@deltauniversity.com",
      telephone: "5556667778",
      address: "101 Delta Blvd",
      province_id: "40",
      city_id: "400",
      district_id: "4000",
      village_id: "40000",
      post_code: "87654",
      logo: "https://example.com/logo4.png",
    },
    {
      code: "INST005",
      name: "Epsilon Academy",
      edu_level_id: "5",
      leader_name: "Ms. Emily Green",
      email: "contact@epsilonacademy.com",
      telephone: "9998887776",
      address: "202 Epsilon Drive",
      province_id: "50",
      city_id: "500",
      district_id: "5000",
      village_id: "50000",
      post_code: "98765",
      logo: "https://example.com/logo5.png",
    },
  ];

  const [show, setShow] = useState(false);
  const [action, setAction] = useState<"add" | "edit">("add");

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h3">List Data Institusi</Typography>
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
      <Typography variant="h6">Code</Typography>
    </TableCell>
    <TableCell>
      <Typography variant="h6">Name</Typography>
    </TableCell>
    <TableCell>
      <Typography variant="h6">Education Level</Typography>
    </TableCell>
    <TableCell>
      <Typography variant="h6">Leader Name</Typography>
    </TableCell>
    <TableCell>
      <Typography variant="h6">Email</Typography>
    </TableCell>
    <TableCell>
      <Typography variant="h6">Telephone</Typography>
    </TableCell>
    <TableCell>
      <Typography variant="h6">Address</Typography>
    </TableCell>
    <TableCell>
      <Typography variant="h6">Province ID</Typography>
    </TableCell>
    <TableCell>
      <Typography variant="h6">City ID</Typography>
    </TableCell>
    <TableCell>
      <Typography variant="h6">District ID</Typography>
    </TableCell>
    <TableCell>
      <Typography variant="h6">Village ID</Typography>
    </TableCell>
    <TableCell>
      <Typography variant="h6">Post Code</Typography>
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
        <Typography variant="subtitle2">{row.code}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{row.name}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{row.edu_level_id}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{row.leader_name}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{row.email}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{row.telephone}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{row.address}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{row.province_id}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{row.city_id}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{row.district_id}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{row.village_id}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{row.post_code}</Typography>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

          </Table>
        </TableContainer>
      </Paper>
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
