import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import logo from "../images/rocket_logo_full.png";

export default function TestAppBar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img
            src={logo}
            width="50"
            height="50"
            onClick={() => navigate("/")}
          ></img>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            VelocityDraft
          </Typography>
          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/calculator")}>
            Scheduler
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
