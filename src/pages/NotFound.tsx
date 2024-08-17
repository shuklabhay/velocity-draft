import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, useTheme } from "@mui/material";
import AppBar from "../components/AppBar";

export default function NotFound() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      sx={{
        height: "100svh",
        display: "grid",
        paddingTop: 9,
      }}
    >
      <AppBar />
      <Grid
        item
        sx={{
          display: "flex",
          overflow: "hidden",
          marginBottom: "5vh",
        }}
      >
        <Typography variant="h4" sx={{ paddingTop: 1, paddingBottom: 2 }}>
          Hi{" "}
          <span
            style={{
              color: theme.palette.primary.main,
              fontWeight: "bold",
            }}
          >
            VelocityDrafter,
          </span>{" "}
          you've reached a page that doesn't exist.
        </Typography>
      </Grid>

      <Grid item sx={{ padding: 1, paddingTop: 50 }}>
        <Button
          variant="contained"
          fullWidth
          sx={{ textTransform: "none", paddingTop: 1 }}
          onClick={() => {
            navigate("/");
          }}
        >
          Return Home
        </Button>
      </Grid>
    </Grid>
  );
}
