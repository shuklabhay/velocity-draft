import * as React from "react";
import { Suspense, useEffect } from "react";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import {
  Container,
  createTheme,
  CssBaseline,
  PaletteColor,
  ThemeProvider,
} from "@mui/material";
import Home from "./pages/Home.tsx";
import Scheduler from "./pages/Scheduler.tsx";
import { AppProvider, useAppContext } from "./utils/AppContext.tsx";
import ReactGA from "react-ga4";

const AnalyticsTrackingID = import.meta.env.VITE_TRACKING_ID;
ReactGA.initialize(AnalyticsTrackingID);

declare module "@mui/material/styles" {
  interface PaletteOptions {
    iconColor: PaletteColor;
    disabledIconColor: PaletteColor;
    calendarLineColor: PaletteColor;
    calendarOffRangeColor: PaletteColor;
    calendarTodayColor: PaletteColor;
    agendaLineColor: PaletteColor;
  }
  interface Palette {
    iconColor: PaletteColor;
    disabledIconColor: PaletteColor;
    calendarLineColor: PaletteColor;
    calendarOffRangeColor: PaletteColor;
    calendarTodayColor: PaletteColor;
    agendaLineColor: PaletteColor;
  }
}

function AppContent() {
  const { darkMode } = useAppContext();
  const { palette } = createTheme();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        light: darkMode ? "#6A9bd2" : "#3978c0",
        main: darkMode ? "#3978c0" : "#346cad",
        dark: darkMode ? "#3167a5" : "#2e6099",
        contrastText: "#ffffff",
      },
      secondary: {
        light: darkMode ? "#3b3b3b" : "#ffffff",
        main: darkMode ? "#212121" : "#ffffff",
        dark: darkMode ? "#212121" : "#f5f5f5",
        contrastText: darkMode ? "#ffffff" : "#000000",
      },
      iconColor: palette.augmentColor({
        color: { main: darkMode ? "#f4f4f4" : "#828282" },
      }),
      disabledIconColor: palette.augmentColor({
        color: { main: darkMode ? "#595959" : "#cfcfcf" },
      }),
      calendarLineColor: palette.augmentColor({
        color: { main: darkMode ? "#808080" : "#dcdcdc" },
      }),
      calendarOffRangeColor: palette.augmentColor({
        color: { main: darkMode ? "#1a1a1a" : "#e5e5e5" },
      }),
      calendarTodayColor: palette.augmentColor({
        color: { main: darkMode ? "#03203a" : "#edf6fe" },
      }),
      agendaLineColor: palette.augmentColor({
        color: { main: "#dcdcdc" },
      }),
      mode: darkMode ? "dark" : "light",
    },
    typography: {
      h1: { fontSize: "6rem" },
      h2: { fontSize: "3rem" },
      h3: { fontSize: "2rem" },
      h4: { fontSize: "1.5rem" },
      h5: { fontSize: "1.25rem" },
      h6: { fontSize: "1rem" },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          * {
            transition: none !important;
          }
        `,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <BrowserRouter basename="/velocity-draft/">
          <Suspense>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/scheduler" element={<Scheduler />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
