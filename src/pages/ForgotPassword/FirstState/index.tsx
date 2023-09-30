import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { regexValidator } from "../../../utils/regexValidator";
import { AlertContext } from "../../../context/alertContext";
import { AuthApiCall } from "../../../services/Auth/auth";
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  TextField,
  Link,
  Box,
} from "@mui/material";

type Props = {};

function index({}: Props) {
  const { handleAlertChange } = useContext(AlertContext);
  const [loading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const data = new FormData(event.currentTarget);

    let input = {
      email: data.get("email"),
    };

    if (validateForgotPasswordData(input.email)) {
      AuthApiCall.forgotPassword(input.email).then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          handleAlertChange({ type: "success", msg: "OTP sent to your email" });
          localStorage.setItem("forgotToken", res.data.forgotToken);
          window.location.reload();
        } else {
          handleAlertChange({ type: "error", msg: res.data.message || res });
        }
      });
    } else {
      handleAlertChange({
        type: "error",
        msg: "Your email incorrect format",
      });
    }
    setIsLoading(false);
  };

  function validateForgotPasswordData(
    email: FormDataEntryValue | null
  ): boolean {
    if (typeof email === "string") {
      return regexValidator.email(email);
    }
    return false;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Typography variant="h4" sx={{ textAlign: "left", width: "100%" }}>
          Forgot Password
        </Typography>
        <Box sx={{ mt: 2, mb: 6 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
            autoComplete="email"
            inputProps={{ maxLength: 50 }}
            sx={{
              mr: 2,
              "& fieldset": {
                borderRadius: "16px",
              },
            }}
          />
          <Typography
            variant="body2"
            sx={{
              mt: 2,
            }}
          >
            {"Have an account?"}{" "}
            <Link href="/login" variant="body2" underline="hover">
              {"Login"}
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
              Next
            </Typography>
          )}
        </Button>
      </Box>
    </Container>
  );
}

export default index;
