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
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "80%",
            overflow: "hidden",
            "& > *": {
              transform:
                "scale(clamp(0.5, calc(0.5 + (100vw - 300px) * 0.1), 1))",
              transformOrigin: "center center",
              transition: "transform 0.3s ease-out",
            },
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{
              // transform: "scale(var(--scale))",
              // transformOrigin: "center center",
              // "--scale": {
              //   xs: "0.7",
              //   sm: "1",
              //   md: "1",
              //   lg: "1",
              // },
              maxWidth: "100%",
              maxHeight: "100%",
              display: "flex",
              justifyContent: "center",
              width: "fit-content",
              margin: "0 auto",
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
