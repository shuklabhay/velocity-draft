import React from "react";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useDarkMode } from "./DarkModeContext";

export default function DarkModeBubble() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <IconButton onClick={toggleDarkMode}>
      {darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
    </IconButton>
  );
}
