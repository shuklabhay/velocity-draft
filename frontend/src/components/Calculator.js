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
      end: "2023-08-10T23:59:00",
    },
  ];

  function setChosenColleges(event, chosenColleges) {
    setSelectedColleges(chosenColleges);
  }

  // USER INPUTS
  const [userWritingSpeed, setUserWritingSpeed] = useState([]); // this represents how many days it takes to write

  const [selectedColleges, setSelectedColleges] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [checkingLength, setCheckingLength] = useState(""); // checkingLength represents how many revisions on each essay

  const [revisionAmt, setRevisionAmt] = useState(""); // revisionAmt represents how many revisions on each essay

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ flexGrow: 1, marginTop: 2 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item md={6} xs={12}>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              weekends={false}
              events={dateEvents}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <button onClick={handleNew}>test</button>
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
                <DatePicker
                  label="Chose Starting Date"
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                  value={startDate}
                />
              </Grid>
              <Grid xs={6}>
                <Typography>
                  <TextField
                    label="Checking Period Length"
                    id="fullwidth"
                    type="number"
                    placeholder="Enter Amount of Days"
                    endAdornment={
                      <InputAdornment position="end">days</InputAdornment>
                    }
                    onChange={(e) => {
                      setCheckingLength(e.target.value);
                    }}
                    value={checkingLength}
                  />
                </Typography>
              </Grid>
              <Grid xs={6}>
                <TextField
                  label="Revision Amount"
                  placeholder="Enter Amount of Revisions"
                  id="fullwidth"
                  type="number"
                  onChange={(e) => {
                    setRevisionAmt(e.target.value);
                  }}
                  value={revisionAmt}
                />
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
