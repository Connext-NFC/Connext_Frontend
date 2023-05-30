import { createBrowserRouter, Link, Outlet } from "react-router-dom";
import { AlertProvider } from "./context/alertContext";
import CustomAlert from "./components/CustomAlert";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import NotFound404 from "./pages/NotFound404";
import ForgotPassword from "./pages/ForgotPassword";

import { Box } from "@mui/system";

//TODO: create real Navbar
const Navbar = () => (
  <Box sx={{ width: "50vw", display: "flex", justifyContent: "space-between" }}>
    <Link to="/">Home</Link>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
  </Box>
);

//ref https://stackoverflow.com/questions/74168742/how-to-template-jsx-with-createbrowserrouter
//TODO: create header and add header to router
const Layout = () => (
  <AlertProvider>
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <CustomAlert />
      {/* <header>
        <Navbar />
      </header> */}
      <Outlet />
    </Box>
  </AlertProvider>
);

// ref https://reactrouter.com/en/main/routers/create-browser-router
const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFound404 />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path:"forgotPassword",
        element:<ForgotPassword />
      }
    ],
  },
]);

export { router };
