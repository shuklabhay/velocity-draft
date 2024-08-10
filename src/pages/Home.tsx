import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import {
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TypeAnimation } from "react-type-animation";
import { useEffect, useRef, useState } from "react";

function Home() {
  // Hooks
  const [name, setName] = useState("");
  const theme = useTheme();
  let navigate = useNavigate();
  const isNameEntered = name.length > 0;

  // Resize based on page size
  const desiredEdgeDistance = 20;
  const [scaleFactor, setScaleFactor] = useState(1);

  const titleStackRef = useRef(null);
  console.log(titleStackRef);

  useEffect(() => {
    const handleResize = () => {
      const calculateScale = (windowWidth: number, elementWidth: number) => {
        const maxWidth = windowWidth - desiredEdgeDistance * 2;
        return maxWidth / elementWidth;
      };

      const elementWidth = titleStackRef.current.offsetWidth;
      const windowWidth = window.innerWidth;
      const calculatedScale = calculateScale(windowWidth, elementWidth);

      console.log(elementWidth, windowWidth, calculatedScale);
      setScaleFactor(calculatedScale);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        <Grid
          item
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Stack
            ref={titleStackRef}
            direction="row"
            spacing={2}
            sx={{
              paddingRight: 2,
              transform: scaleFactor < 1 ? `scale(${scaleFactor})` : "scale(1)",
            }}
          >
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
                  style={{
                    color: theme.palette.secondary.contrastText,
                    fontSize: 33,
                    fontWeight: 500,
                    paddingLeft: 7,
                    alignContent: "left",
                    alignItems: "left",
                    whiteSpace: "nowrap",
                  }}
                />
              </Typography>
            </Stack>
          </Stack>
        </Grid>

        <Grid item sx={{ padding: 3, width: "100%" }}>
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
                  marginTop: "1px",
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
