/** eslint-disable lines-around-comment */
"use client";

import { useMemo, useState } from "react";
import DialogSchedule from "@/app/views/master/schedule/DialogSchedule";
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
      class_id: "1",
      academic_year_id: 2023,
      teacher_id: 101,
      day: "Monday",
      start_time: "08:00 AM",
      end_time: "09:30 AM",
      status: "Active",
    },
    {
      class_id: "2",
      academic_year_id: 2023,
      teacher_id: 102,
      day: "Tuesday",
      start_time: "10:00 AM",
      end_time: "11:30 AM",
      status: "Active",
    },
    {
      class_id: "3",
      academic_year_id: 2023,
      teacher_id: 103,
      day: "Wednesday",
      start_time: "01:00 PM",
      end_time: "02:30 PM",
      status: "Inactive",
    },
    {
      class_id: "4",
      academic_year_id: 2023,
      teacher_id: 104,
      day: "Thursday",
      start_time: "03:00 PM",
      end_time: "04:30 PM",
      status: "Active",
    },
    {
      class_id: "5",
      academic_year_id: 2023,
      teacher_id: 105,
      day: "Friday",
      start_time: "08:00 AM",
      end_time: "09:30 AM",
      status: "Active",
    },
  ];

  const [show, setShow] = useState(false);
  const [action, setAction] = useState<"add" | "edit">("add");

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h3">List Data Jadwal</Typography>
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
      <Typography variant="h6">Class ID</Typography>
    </TableCell>
    <TableCell>
      <Typography variant="h6">Academic Year</Typography>
    </TableCell>
    <TableCell>
      <Typography variant="h6">Teacher ID</Typography>
    </TableCell>
    <TableCell>
      <Typography variant="h6">Day</Typography>
    </TableCell>
    <TableCell>
      <Typography variant="h6">Start Time</Typography>
    </TableCell>
    <TableCell>
      <Typography variant="h6">End Time</Typography>
    </TableCell>
    <TableCell>
      <Typography variant="h6">Status</Typography>
    </TableCell>
  </TableRow>
</TableHead>
<TableBody>
  {rows.map((row, index) => (
    <TableRow key={row.class_id}>
      <TableCell>
        <Typography variant="subtitle2">{index + 1}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{row.class_id}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{row.academic_year_id}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{row.teacher_id}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{row.day}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{row.start_time}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{row.end_time}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{row.status}</Typography>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

          </Table>
        </TableContainer>
      </Paper>
      <DialogSchedule
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
