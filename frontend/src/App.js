import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const Home = React.lazy(() => import("./Home.js"));
  const NotFound = React.lazy(() => import("./NotFound.js"));
  const Calculator = React.lazy(() => import("./Calculator.js"));

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Suspense>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
