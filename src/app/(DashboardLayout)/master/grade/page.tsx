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
import DialogGrade from "@/app/views/master/grade/DialogGrade";

export default function List() {
    const rows = [
        { name: "Mathematics", code: "MATH101", description: "Introduction to Mathematics" },
        { name: "Physics", code: "PHYS101", description: "Basics of Physics" },
        { name: "Chemistry", code: "CHEM101", description: "Fundamentals of Chemistry" },
        { name: "Biology", code: "BIO101", description: "General Biology" },
        { name: "History", code: "HIST101", description: "World History Overview" },
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
      <Typography variant="h6">Name</Typography>
    </TableCell>
    <TableCell>
      <Typography variant="h6">Code</Typography>
    </TableCell>
    <TableCell>
      <Typography variant="h6">Description</Typography>
    </TableCell>
  </TableRow>
</TableHead>
<TableBody>
  {rows.map((row, index) => (
    <TableRow key={index}>
      <TableCell>
        <Typography variant="subtitle2">{index + 1}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{row.name}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{row.code}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{row.description}</Typography>
      </TableCell>
    </TableRow>
  ))}
</TableBody>


          </Table>
        </TableContainer>
      </Paper>
      <DialogGrade
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
