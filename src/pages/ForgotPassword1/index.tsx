import React, { useEffect, useState ,useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { regexValidator } from "../../utils/regexValidator";
import { AlertContext } from "../../context/alertContext";
import { AuthApiCall } from "../../services/Auth/auth";
import { Container,Typography,Button,CircularProgress,TextField,Link,Box} from "@mui/material";
// import { styled } from 'styled-components';

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
      email: data.get("email"),
    };

    if (validateForgotPasswordData(input.email)) {

      AuthApiCall.forgotPassword(input.email).then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          handleAlertChange({ type: "success", msg: "OTP sent to your email" });
          localStorage.setItem("forgotToken", res.data.forgotToken);
          navigate("/forgotPassword2");
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

  function validateForgotPasswordData(email : FormDataEntryValue | null): boolean {
    if (typeof email === "string") {
      return regexValidator.email(email);
    }
    return false;
  }

  return (
    <Container maxWidth="xs" component="main">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Typography variant="h4" sx={{ textAlign: "left" }}>
            Forgot Password
          </Typography>
          <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email"
                type="text"
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