import React, { useEffect, useState,useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { MuiOtpInput } from 'mui-one-time-password-input'
import { Container,Typography,Button,CircularProgress,TextField,Link,Box} from "@mui/material";
import { regexValidator } from "../../utils/regexValidator";
import { AlertContext } from "../../context/alertContext";
import { AuthApiCall } from "../../services/Auth/auth";
// import { styled } from 'styled-components';

type Props = {};

function index({}: Props) {
  const navigate = useNavigate();
  const { handleAlertChange } = useContext(AlertContext);
  const [otp, setOtp] = useState<string>("")
  const [loading, setIsLoading] = useState<boolean>(false);

  const handleChange = (newValue: string) => {
    setOtp(newValue)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    console.log(otp)

    if (validateOTPData(otp)) {
      AuthApiCall.verifyOTPForgot(otp).then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          handleAlertChange({ type: "success", msg: "OTP sent to your email" });
          localStorage.setItem("forgotToken", res.data.accessToken);
          navigate("/forgotPassword3");
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

  function validateOTPData(otp : string): boolean {
    if (typeof otp === "string") {
      return /^[0-9]{4}$/.test(otp)
    }
    return false;
  }

  return (
    <Container maxWidth="xs">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Typography variant="h4" sx={{ textAlign: "left" }}>
            Forgot Password
          </Typography>
        <MuiOtpInput sx={{marginTop:"1rem"}} length={4} value={otp} onChange={handleChange} id="otp"/>
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
  )
}

export default index;