import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

const logoPath = "frontend/public/rocket_logo_full.png";

function Home() {
  return (
    <>
      <Grid container rowSpacing={1} direction="column" columns={{ xs: 5 }}>
        <Grid item xs={6}>
          <Typography variant="h2" color="secondary.main">
            VelocityDraft
          </Typography>
          <Typography variant="h6" color="secondary.light">
            College Application Essay Scheduler
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <img src={logoPath} alt="VelocityDraft logo" style={{ height: 40 }} />
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
