import "./App.css";
import "./index.css";
import CssBaseline from "@mui/material/CssBaseline";
import { RouterProvider, Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { router } from "./router";
import CircularProgress from "@mui/material/CircularProgress";
import createPalette from "@mui/material/styles/createPalette";

let theme = createTheme({
  palette: {
    primary: {
      main: "#FD9340",

    },

  },
  typography: {
    fontFamily: "'Kanit', sans-serif",
  },breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} fallbackElement={<CircularProgress />} />
    </ThemeProvider>
  );
}

export default App;
