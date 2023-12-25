import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import Box from "@mui/material/Box";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { useEffect } from "react";
import db from "../firestore.js";
import { onSnapshot, collection } from "firebase/firestore";

import { scheduleInputsOnCalender } from "../utils/SchedulingLogic.js";

export default function Calculator() {
  //Get school info from db
  const [schoolInfo, setSchoolInfo] = useState([]);
  useEffect(
    () =>
      onSnapshot(collection(db, "colleges"), (snapshot) => {
        setSchoolInfo(snapshot.docs.map((doc) => doc.data()));
      }),
    []
  );

  // UX VARIABLES/CONSTANTS
  const revsionChoices = Array.from({ length: 10 - 1 }, (x, i) => i + 2);
  const minCheckingDays = 5;
  const checkingLengthChoices = Array.from(
    { length: 10 - (minCheckingDays - 1) },
    (x, i) => i + minCheckingDays
  );
  let calenderEvents = [];

  // USER INPUTS
  let chosenColleges; // Colleges selected by user (Autocomplete is weird w/ useState)
  const [userWritingSpeed, setUserWritingSpeed] = useState([]); // Number days taken takes to write

  const [startDate, setStartDate] = useState(""); // do startDate.$d to access datetype
  const [checkingLength, setCheckingLength] = useState(""); // Number length of checking period in days

  const [revisionAmt, setRevisionAmt] = useState(""); // Number revisions on each essay (1 reivision per day)

  // IMPORTANT FUNCTIONS
  function setChosenColleges(newSelectedColleges) {
    chosenColleges = newSelectedColleges;
    console.log(chosenColleges);
  }

  function handleSubmit() {
    if (chosenColleges) {
      //Convert each date timestamp to date objects
      for (var i = 0; i < chosenColleges.length; i++) {
        chosenColleges[i].deadline.toDate();
        console.log(chosenColleges[i]);
      }

      //Create Calender Schedule
      calenderEvents = scheduleInputsOnCalender(
        userWritingSpeed,
        chosenColleges,
        startDate.$d,
        checkingLength,
        revisionAmt
      );
    } else {
      //no colleges are selected, tbh this check should be done otuside the funct
      console.log("something broke");
      console.log(chosenColleges, typeof chosenColleges);
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ flexGrow: 1, marginTop: 2 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item md={6} xs={12}>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={calenderEvents}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography
              align="center"
              variant="h5"
              color="primary.contrast"
              sx={{
                fontWeight: "heavy",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "arial",
              }}
            >
              Necessary Inputs
            </Typography>
            <FormControl fullWidth>
              <Autocomplete
                multiple
                label="Select Colleges"
                options={schoolInfo}
                getOptionLabel={(option) => option.college}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Colleges"
                    placeholder="Colleges"
                    required
                  />
                )}
                onChange={(e, value) => {
                  setChosenColleges(value);
                }}
              />
            </FormControl>
            <FormControl required fullWidth sx={{ marginTop: 1 }}>
              <InputLabel>Writing Speed</InputLabel>
              <Select
                required
                value={userWritingSpeed}
                label="Writing Speed"
                onChange={(e) => {
                  setUserWritingSpeed(e.target.value);
                }}
              >
                <MenuItem value={4}>Slow</MenuItem>
                <MenuItem value={2}>Moderate</MenuItem>
                <MenuItem value={1}>Fast</MenuItem>
              </Select>
            </FormControl>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 0 }}
            >
              <Grid xs={4}>
                <FormControl fullWidth sx={{ marginTop: 2 }}>
                  <DatePicker
                    label="Select Starting Date"
                    onChange={(event, NewStartDate) => {
                      setStartDate(event, NewStartDate);
                    }}
                    value={startDate}
                  />
                </FormControl>
              </Grid>
              <Grid xs={4}>
                <FormControl required fullWidth sx={{ marginTop: 2 }}>
                  <InputLabel>Checking Period Length</InputLabel>
                  <Select
                    value={checkingLength}
                    label="Checking Period Length"
                    onChange={(e) => {
                      setCheckingLength(e.target.value);
                    }}
                  >
                    {checkingLengthChoices.map((choiceNumber) => (
                      <MenuItem value={choiceNumber}>
                        {choiceNumber} Days
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={4}>
                <FormControl required fullWidth sx={{ marginTop: 2 }}>
                  <InputLabel>Revisions For Each Essay</InputLabel>
                  <Select
                    value={revisionAmt}
                    label="Revisions For Each Essay"
                    onChange={(e) => {
                      setRevisionAmt(e.target.value);
                    }}
                  >
                    <MenuItem value={1}>1 Revision </MenuItem>
                    {revsionChoices.map((choiceNumber) => (
                      <MenuItem value={choiceNumber}>
                        {choiceNumber} Revisions
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <Typography>
                  <Button
                    variant="contained"
                    sx={{ marginTop: 1, color: "white" }} //make the styling stuff better latrer
                    fullWidth
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
}
