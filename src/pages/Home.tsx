import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import {
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TypeAnimation } from "react-type-animation";
import { useEffect, useState } from "react";

function Home() {
  const [showCursor, setShowCursor] = useState(true);
  const [name, setName] = useState("");
  const theme = useTheme();

  const isNameEntered = name.length > 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCursor(false);
    }, 10);

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
          <Stack direction="row" spacing={2}>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderRightWidth: 5,
                borderRadius: 5,
              }}
            />

            <Stack>
              <Typography
                variant="h1"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                VelocityDraft
              </Typography>
              <Typography
                sx={{
                  fontSize: 33,
                  fontWeight: 400,
                  textAlign: "left",
                }}
              >
                <TypeAnimation
                  sequence={["Flexible Application Essay Scheduler"]}
                  speed={65}
                  cursor={showCursor}
                  wrapper="div"
                  style={{
                    color: theme.palette.secondary.contrastText,
                    fontSize: 33,
                    fontWeight: 500,
                    paddingLeft: 7,
                    alignContent: "left",
                    alignItems: "left",
                  }}
                />
              </Typography>
            </Stack>
          </Stack>
        </Grid>

        <Grid item>
          <Stack direction="row" spacing={1}>
            <TextField
              color="primary"
              label="Enter your name here..."
              fullWidth
              onChange={(e) => {
                setName(e.target.value);
              }}
              InputLabelProps={{
                shrink: false,
                style: {
                  marginTop: "2px",
                  opacity: isNameEntered ? 0 : 1,
                },
              }}
              InputProps={{
                style: {
                  borderRadius: 40,
                },
              }}
            />
            <Button
              variant="contained"
              disabled={!isNameEntered}
              sx={{ borderRadius: 40, minWidth: 0, aspectRatio: 1 / 1 }}
              onClick={() => navigate("/scheduler")}
            >
              <ArrowForwardIcon />
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
