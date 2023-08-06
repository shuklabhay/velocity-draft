import React, { Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";

import Home from "./components/Home.js";
import NotFound from "./components/NotFound.js";
import Calculator from "./components/Calculator.js";


const theme = createTheme({
  palette: {
    primary: {
      light: "#fffff", // White
      main: "#ffffff", // White
      dark: "#BFBFBF", // Dark Gray
      contrastText: "#00000", // Black
    },
    secondary: {
      light: "#d5f0f7", // Light Blue
      main: "#5d94c4", // Middle Blue
      dark: "#06075c", // Navy
      contrastText: "#ffffff",
    },
    mode: "light",
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>

  );
}
