import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import styled from "@mui/material/styles/styled";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Checkbox from "@mui/material/Checkbox";
import { useEffect } from "react";
import db from "../firestore.js";
import { onSnapshot, collection } from "firebase/firestore";

const logoPath = "frontend/public/rocket_logo_full.png";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

//for testing grid visualization
// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

export default function Calculator() {
  const [colleges, setColleges] = useState([]);

  console.log(colleges);

  useEffect(
    () =>
      onSnapshot(collection(db, "colleges"), (snapshot) => {
        setColleges(snapshot.docs.map((doc) => doc.data()));
      }),
    []
  );

  return (
    <Box sx={{ flexGrow: 1, marginTop: 2 }}>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={false}
            events={[
              { title: "event 1", start: "2023-08-01", allDay: true },
              {
                title: "event 2",
                start: "2023-08-09",
                end: "2023-08-10T24:00:00",
              },
            ]}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={colleges}
            disableCloseOnSelect
            getOptionLabel={(option) => option.college}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.college}
              </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Checkboxes"
                placeholder="Favorites"
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
