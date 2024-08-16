import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, useTheme } from "@mui/material";
import * as React from "react";
import AppBar from "../components/AppBar";

export default function NotFound() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <AppBar />

      <Grid
        container
        spacing={0}
        direction="column"
        sx={{
          paddingTop: 7,
          height: "100svh",
          display: "grid",
        }}
      >
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

        <Grid item sx={{ padding: 1, paddingTop: 45 }}>
          <Button
            variant="contained"
            fullWidth
            sx={{ textTransform: "none", paddingTop: 1 }}
            onClick={() => {
              navigate("/");
            }}
          >
            <Typography variant="h6">Let's Go Home!</Typography>
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
