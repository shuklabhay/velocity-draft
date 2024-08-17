import * as React from "react";
import { Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import {
  Container,
  createTheme,
  CssBaseline,
  PaletteColor,
  ThemeProvider,
} from "@mui/material";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import Scheduler from "./pages/Scheduler.tsx";
import { FormProvider } from "./components/FormContext.tsx";
import {
  DarkModeProvider,
  useDarkMode,
} from "./components/DarkModeContext.tsx";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    iconColor: PaletteColor;
    calendarLineColor: PaletteColor;
    calendarOffRangeColor: PaletteColor;
    calendarTodayColor: PaletteColor;
    agendaLineColor: PaletteColor;
  }

  interface Palette {
    iconColor: PaletteColor;
    calendarLineColor: PaletteColor;
    calendarOffRangeColor: PaletteColor;
    calendarTodayColor: PaletteColor;
    agendaLineColor: PaletteColor;
  }
}

function AppContent() {
  const { darkMode } = useDarkMode();
  const { palette } = createTheme();
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
        color: { main: darkMode ? "#f4f4f4" : "#6e6e6e" },
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
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <BrowserRouter>
          <Suspense>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Scheduler" element={<Scheduler />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <DarkModeProvider>
      <FormProvider>
        <AppContent />
      </FormProvider>
    </DarkModeProvider>
  );
}
