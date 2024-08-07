import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function TestAppBar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          <Typography
            color="common.white"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            VelocityDraft
          </Typography>
          <Button
            color="inherit"
            sx={{ color: "common.white" }}
            onClick={() => navigate("/")}
          >
            Home
          </Button>
          <Button
            color="inherit"
            sx={{ color: "common.white" }}
            onClick={() => navigate("/scheduler")}
          >
            Scheduler
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
