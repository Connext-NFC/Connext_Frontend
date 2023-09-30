import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  TextField,
  Box,
} from "@mui/material";
import { IChangePassword } from "../../../types/User";
import { AlertContext } from "../../../context/alertContext";
import { AuthApiCall } from "../../../services/Auth/auth";
import { regexValidator } from "../../../utils/regexValidator";
import { SHA256 } from "crypto-js";

type Props = {};

function index({}: Props) {
  const navigate = useNavigate();
  const { handleAlertChange } = useContext(AlertContext);
  const [loading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const data = new FormData(event.currentTarget);

    let input = {
      newPassword: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
    };

    if (validateNewPasswordData(input)) {
      hashPassword(input);
      AuthApiCall.changeForgotPassword(input).then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          handleAlertChange({
            type: "success",
            msg: "Your password has been changed",
          });
          localStorage.removeItem("forgotToken");
          navigate("/login");
        } else {
          handleAlertChange({ type: "error", msg: res.data.message || res });
        }
      });
    } else {
      handleAlertChange({
        type: "error",
        msg: "Password must contain requirement",
      });
    }
    setIsLoading(false);
  };

  function validateNewPasswordData({
    newPassword,
    confirmPassword,
  }: IChangePassword): boolean {
    if (
      typeof newPassword === "string" &&
      typeof confirmPassword === "string"
    ) {
      return (
        regexValidator.password(newPassword) &&
        regexValidator.password(confirmPassword)
      );
    }
    return false;
  }

  function hashPassword(payload: IChangePassword): void {
    // Generate a salt Hash the password Ref: https://auth0.com/blog/adding-salt-to-hashing-a-better-way-to-store-passwords/
    if (
      typeof payload.newPassword === "string" &&
      typeof payload.confirmPassword === "string"
    ) {
      // Create a hash object with the SHA-256 algorithm
      payload.newPassword = SHA256(payload.newPassword).toString();
      payload.confirmPassword = SHA256(payload.confirmPassword).toString();
    }
  }

  return (
    <Container maxWidth="xs">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Typography variant="h4" sx={{ textAlign: "left" }}>
          Reset Password
        </Typography>
        <Box sx={{ mt: 2, mb: 4 }}>
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-confirmPassword"
            inputProps={{ maxLength: 50 }}
            sx={{
              "& fieldset": {
                borderRadius: "16px",
              },
            }}
            onChange={() => handleAlertChange({})}
          />
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
              UPDATE PASSWORD
            </Typography>
          )}
        </Button>
      </Box>
    </Container>
  );
}

export default index;
