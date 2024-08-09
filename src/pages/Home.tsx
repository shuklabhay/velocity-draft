import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Stack, Typography } from "@mui/material";
import * as React from "react";
import InfoBubble from "../components/InfoBubble";

function Home() {
  let navigate = useNavigate();

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        alignContent="center"
        sx={{
          height: "100vh",
          display: "grid",
          gridTemplateRows: "80% 50%",
        }}
      >
        <Grid item>
          <Typography
            variant="h1"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            VelocityDraft
          </Typography>
          <Typography
            sx={{
              fontSize: 33,
              fontWeight: 400,
              textAlign: "center",
            }}
          >
            Flexible Application Essay Scheduler
          </Typography>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            sx={{
              color: "white",
              fontWeight: "medium",
              fontSize: "20px",
            }}
            fullWidth
            onClick={() => navigate("/scheduler")}
          >
            Try it out! It's free!
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
