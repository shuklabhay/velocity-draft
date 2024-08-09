import * as React from "react";
import { Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";

import Home from "./pages/Home.js";
import NotFound from "./components/NotFound.js";
import Scheduler from "./pages/Scheduler.js";
import AppBar from "./components/SiteAppBar.js";

const theme = createTheme({
  palette: {
    primary: {
      light: "#fffff", // White
      main: "#06075c", // White
      dark: "#BFBFBF", // Dark Gray
      contrastText: "#00000", // Black
    },
    secondary: {
      light: "#d5f0f7", // Light Blue
      main: "#06075c", // Navy
      dark: "#5d94c4", // Middle Blue
      contrastText: "#ffffff",
    },
    mode: "light",
  },
});

export default function App({}) {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppBar />
        <Suspense>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Scheduler" element={<Scheduler />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}
