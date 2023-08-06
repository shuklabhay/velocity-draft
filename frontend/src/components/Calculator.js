import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import styled from '@mui/material/styles/styled';


const logoPath = "frontend/public/rocket_logo_full.png";

//for testing grid visualization
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function Calculator() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={false}
            events={[
              { title: 'event 1', start: '2023-08-01', allDay: true },
              {
                title: 'event 2',
                start: '2023-08-09',
                end: '2023-08-10T24:00:00',
              },
            ]}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          sheesh
        </Grid>
      </Grid>
    </Box>



  );
}

export default Calculator;
