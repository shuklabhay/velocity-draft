import * as React from "react";
import { Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { createTheme, styled, ThemeProvider } from "@mui/material";

import Home from "./pages/Home.tsx";
import NotFound from "./components/NotFound.tsx";
import Scheduler from "./pages/Scheduler.tsx";
import InfoBubble from "./components/InfoBubble.tsx";

const theme = createTheme({
  palette: {
    primary: {
      light: "#d5f0f7",
      main: "#5d94d4",
      dark: "#06075c",
      contrastText: "#ffffff", // White
    },
    secondary: {
      light: "#ffffff",
      main: "#ffffff",
      dark: "#ffffff",
      contrastText: "#000000", // Black
    },
    mode: "light",
  },
});

const InfoBubbleContainer = styled("div")({
  position: "absolute",
  bottom: 16,
  right: 16,
});

export default function App({}) {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <InfoBubbleContainer />
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
