import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SHA256 } from "crypto-js";
import {
  Container,
  Box,
  Link,
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { AuthApiCall } from "../../services/Auth/auth";
import { IUserCredential } from "../../types/User";
import { regexValidator } from "../../utils/regexValidator";
import { AlertContext } from "../../context/alertContext";
import { UserContext } from "../../context/userContext";

export default function index() {
  const navigate = useNavigate();
  const { handleAlertChange } = useContext(AlertContext);
  const { getUserInfoContext} = useContext(UserContext);
  const [loading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });

    let input = {
      email: data.get("email"),
      password: data.get("password"),
    };

    if (validateLoginData(input)) {
      hashPassword(input);

      AuthApiCall.login(input).then((res) => {
        // console.log("res", res);
        if (res.status === 200) {
          handleAlertChange({ type: "success", msg: "Login Success" });
          localStorage.setItem("accessToken", res.data.accessToken);
          getUserInfoContext()
          navigate("/");
        } else {
          handleAlertChange({ type: "error", msg: res.data.message || res });
        }
      });
    } else {
      handleAlertChange({
        type: "error",
        msg: "Your email or password are incorrect format",
      });
    }
    setIsLoading(false);
  };

  function validateLoginData({ email, password }: IUserCredential): boolean {
    if (typeof email === "string" && typeof password === "string") {
      // console.log(
      //   email,
      //   password,
      //   regexValidator.email(email),
      //   regexValidator.password(password)
      // );
      return regexValidator.email(email) && regexValidator.password(password);
    }
    return false;
  }

  function hashPassword(payload: IUserCredential): void {
    // Generate a salt Hash the password Ref: https://auth0.com/blog/adding-salt-to-hashing-a-better-way-to-store-passwords/
    if (typeof payload.password === "string") {
      // Create a hash object with the SHA-256 algorithm
      payload.password = SHA256(payload.password).toString();
    }
  }

  // TODO: implement remember me logic

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Avatar variant="rounded" sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon fontSize="large" />
          </Avatar>
        </Box>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            type="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputProps={{ maxLength: 50 }}
            sx={{
              "& fieldset": {
                borderRadius: "16px",
              },
            }}
            onChange={() => handleAlertChange({})}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputProps={{ maxLength: 50 }}
            sx={{
              "& fieldset": {
                borderRadius: "16px",
              },
            }}
            onChange={() => handleAlertChange({})}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {/* TODO: Login by facebook &... */}
          {/* TODO: add information button for user when input password */}
          <Box
            sx={{
              display: "flex",
              my: 5,
            }}
          >
            {" "}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "column", md: "row" },
              justifyContent: "space-between",
              padding: 0,
              mt: 1,
            }}
          >
            <Link href="/forgotPassword" variant="body2" underline="hover">
              Forgot password?
            </Link>
            <Typography variant="body2">
              {"Don’t have an account?"}{" "}
              <Link href="/register" variant="body2" underline="hover">
                {"Create Account"}
              </Link>
            </Typography>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              px: 1,
              py: 2,
              borderRadius: "16px",
              color: "white",
              fontWeight: "bold",
              fontSize: "0.93rem",
            }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress color="inherit" size={16} />
            ) : (
              <Typography sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                LOGIN
              </Typography>
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
