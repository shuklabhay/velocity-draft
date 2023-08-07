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

  console.log(colleges);

  useEffect(
    () =>
      onSnapshot(collection(db, "colleges"), (snapshot) => {
        setColleges(snapshot.docs.map((doc) => doc.data()));
      }),
    []
  );

  // test adding multiple universities
  const handleNew = async () => {
    const docRef = doc(db, "colleges", "Princeton University");
    const payload = {
      college: "Princeton University",
      EA: new Date("2023-11-01T23:59:00.000"),
      RD: new Date("2024-01-01T23:59:00.000"),
      ED: null,
    };
    await setDoc(docRef, payload);

    const collectionRef = collection(
      db,
      "colleges",
      "Princeton University",
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
                end: "2023-08-10T23:59:00",
              },
            ]}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <button onClick={handleNew}>test</button>
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
