import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
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

  //console.log(colleges);

  useEffect(
    () =>
      onSnapshot(collection(db, "colleges"), (snapshot) => {
        setColleges(snapshot.docs.map((doc) => doc.data()));
      }),
    []
  );

  function setChosenColleges(event, newSelectedColleges) {
    console.log(selectedColleges);
    setSelectedColleges(newSelectedColleges);
    selectedColleges = newSelectedColleges; // removing this line might be necesarry later on if stuffs not adding up for this parameter
    console.log(selectedColleges);
  }

  const revsionChoices = Array.from({ length: 10 - 1 }, (x, i) => i + 2);
  const minCheckingDays = 5;
  const checkingLengthChoices = Array.from(
    { length: 10 - (minCheckingDays - 1) },
    (x, i) => i + minCheckingDays
  );

  // USER INPUTS
  var [selectedColleges, setSelectedColleges] = useState([]); // List of json objects [{deadline: , college: }]
  const [userWritingSpeed, setUserWritingSpeed] = useState([]); // Number days taken takes to write

  const [startDate, setStartDate] = useState(""); // do startDate.$d to access datetype
  const [checkingLength, setCheckingLength] = useState(""); // Number length of checking period in days

  const [revisionAmt, setRevisionAmt] = useState(""); // Number revisions on each essay (1 reivision per day)

  // Handle Submit
  var calenderEvents = [];
  function handleSubmit() {
    calenderEvents = scheduleInputsOnCalender(
      userWritingSpeed,
      selectedColleges,
      startDate.$d,
      checkingLength,
      revisionAmt
    );
    console.log(
      scheduleInputsOnCalender(
        userWritingSpeed,
        selectedColleges,
        startDate.$d,
        checkingLength,
        revisionAmt
      )
    );
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
            <FormControl fullWidth>
              <Autocomplete
                multiple
                label="Select Colleges"
                options={colleges}
                getOptionLabel={(option) => option.college}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Colleges"
                    placeholder="Colleges"
                  />
                )}
                onChange={(e, value) => setChosenColleges(e.nativeEvent, value)}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Writing Speed</InputLabel>
              <Select
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
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid xs={6}>
                <FormControl fullWidth>
                  <DatePicker
                    label="Select Starting Date"
                    onChange={(event, NewStartDate) => {
                      setStartDate(event, NewStartDate);
                    }}
                    value={startDate}
                  />
                </FormControl>
              </Grid>
              <Grid xs={6}>
                <FormControl fullWidth>
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
              <Grid xs={6}>
                <FormControl fullWidth>
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
              <Grid xs={6}>
                <Typography>
                  <Button color="primary" onClick={handleSubmit}>
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
