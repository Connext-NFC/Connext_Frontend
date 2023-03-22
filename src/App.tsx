import "./App.css";
import "./index.css";
import CssBaseline from '@mui/material/CssBaseline';
import { RouterProvider, Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import router from "./router";
import CircularProgress from "@mui/material/CircularProgress";

let theme = createTheme({
  palette: {
    primary: {
      main: "#FD9340",
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
