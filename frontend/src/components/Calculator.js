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
import InputAdornment from "@mui/material/InputAdornment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { useEffect } from "react";
import db from "../firestore.js";
import {
  onSnapshot,
  collection,
  setDoc,
  doc,
  addDoc,
} from "firebase/firestore";

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

  // test adding multiple universities
  const handleNew = async () => {
    const docRef = doc(db, "colleges", "Princeton University EA");
    const payload = {
      college: "Princeton University EA",
      deadline: new Date("2023-11-01T23:59:00.000"), //EA
      //deadline: new Date("2024-01-01T23:59:00.000"), //RD
      //deadline: null,
    };
    await setDoc(docRef, payload);

    const collectionRef = collection(
      db,
      "colleges",
      "Princeton University EA",
      "essays"
    );
    const essayPayload = {
      essay:
        "Briefly elaborate on an activity, organization, work experience, or hobby that has been particularly meaningful to you. (Please respond in about 150 words)",
      maxWords: 150,
    };
    const essayPayload2 = {
      essay:
        "At Princeton, we value diverse perspectives and the ability to have respectful dialogue about difficult issues. Share a time when you had a conversation with a person or a group of people about a difficult topic. What insight did you gain, and how would you incorporate that knowledge into your thinking in the future?",
      maxWords: 250,
    };
    const essayPayload3 = {
      essay:
        "Princeton has a longstanding commitment to service and civic engagement. Tell us how your story intersects (or will intersect) with these ideals.",
      maxWords: 250,
    };
    const essayPayload4 = {
      essay: "What song represents the soundtrack of your life at this moment?",
      maxWords: 50,
    };
    const essayPayload5 = { essay: "What brings you joy? ", maxWords: 50 };
    const essayPayload6 = {
      essay: "What is a new skill you would like to learn in college? ",
      maxWords: 50,
    };

    await addDoc(collectionRef, essayPayload);
    await addDoc(collectionRef, essayPayload2);
    await addDoc(collectionRef, essayPayload3);
    await addDoc(collectionRef, essayPayload4);
    await addDoc(collectionRef, essayPayload5);
    await addDoc(collectionRef, essayPayload6);
  };
  let dateEvents = [
    { title: "event 1", start: "2023-08-01", allDay: true },
    {
      title: "event 2",
      start: "2023-08-09",
      end: "2023-08-12",
    },
  ];

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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ flexGrow: 1, marginTop: 2 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item md={6} xs={12}>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={dateEvents}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <button onClick={handleNew}>test</button>
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
                  <Button color="secondary">
                    Days Unwilling to Work (this is a button)
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
