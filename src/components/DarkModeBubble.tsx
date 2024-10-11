import React from "react";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useAppContext } from "../utils/AppContext";

export default function DarkModeBubble() {
  const { darkMode, toggleDarkMode } = useAppContext();

  return (
    <IconButton onClick={toggleDarkMode}>
      {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}
