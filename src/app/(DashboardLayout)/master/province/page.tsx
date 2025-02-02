/** eslint-disable lines-around-comment */
"use client";

import { useState } from "react";
import DialogProvince from "@/app/views/master/province/DialogProvince";
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
      code: "ID-JK",
      province_name: "Jakarta",
      countryId: 1,
      country: {
        id: 1,
        code: "ID",
        name: "Indonesia",
        description: "Country in Southeast Asia",
      },
      description: "Capital city of Indonesia",
    },
    {
      id: 2,
      code: "ID-BT",
      province_name: "Banten",
      countryId: 1,
      country: {
        id: 1,
        code: "ID",
        name: "Indonesia",
        description: "Country in Southeast Asia",
      },
      description: "Province located on the west of Java",
    },
    {
      id: 3,
      code: "ID-JT",
      province_name: "Jawa Tengah",
      countryId: 1,
      country: {
        id: 1,
        code: "ID",
        name: "Indonesia",
        description: "Country in Southeast Asia",
      },
      description: "Central Java province",
    },
    {
      id: 4,
      code: "ID-YO",
      province_name: "Yogyakarta",
      countryId: 1,
      country: {
        id: 1,
        code: "ID",
        name: "Indonesia",
        description: "Country in Southeast Asia",
      },
      description: "Special Region of Yogyakarta",
    },
    {
      id: 5,
      code: "ID-SU",
      province_name: "Sumatera Utara",
      countryId: 1,
      country: {
        id: 1,
        code: "ID",
        name: "Indonesia",
        description: "Country in Southeast Asia",
      },
      description: "Province on the island of Sumatra",
    },
  ];

  const [show, setShow] = useState(false);
  const [action, setAction] = useState<"add" | "edit">("add");

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
                  <TableCell>
                    <Typography variant="subtitle2">{index + 1}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2"> {row.code}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {" "}
                      {row.province_name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {" "}
                      {row.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        setAction("edit");
                        setShow(true);
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <DialogProvince
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
