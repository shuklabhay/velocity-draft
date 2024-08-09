import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Stack, Typography } from "@mui/material";
import InfoBubble from "../components/InfoBubble";
import { TypeAnimation } from "react-type-animation";
import { useEffect, useState } from "react";

function Home() {
  // Hide cursor after typing
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCursor(false);
    }, 0.7);

    return () => clearTimeout(timer);
  }, []);

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
            <TypeAnimation
              sequence={["Flexible Application Essay Scheduler"]}
              speed={70}
              cursor={showCursor}
              wrapper="div"
              style={{
                fontSize: 33,
                fontWeight: 500,
                alignContent: "center",
                alignItems: "center",
              }}
            />
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
