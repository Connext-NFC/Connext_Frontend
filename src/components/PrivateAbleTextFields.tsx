import React from "react";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { privateAbleKeyType, SOCIAL_LIST } from "../types/User";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";

const icons: { [key: string]: any } = {
  website: <PublicIcon color="primary" />,
  phone: <PhoneIcon color="primary" />,
  email: <EmailIcon color="primary" />,
};

interface IProps {
  socialName: privateAbleKeyType;
  socialData: {
    isShow: boolean;
    data: string;
  };
  handleChange: (
    social: privateAbleKeyType,
    newValue: string,
    newIsShow: boolean
  ) => void;
}
// TODO: disable when loading
const PrivateAbleTextFields = ({
  socialName,
  socialData,
  handleChange,
}: IProps) => (
  <FormControl
    key={socialName}
    sx={{ my: 1, width: "100%" }}
    variant="outlined"
  >
    <InputLabel htmlFor={`${socialName}` + "field"}>{socialName}</InputLabel>
    <OutlinedInput
      id={`${socialName}` + "field"}
      type="text"
      startAdornment={
        <InputAdornment position="start">{icons[socialName]}</InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end">
          <ButtonGroup>
            <Button
              variant={!socialData.isShow ? "contained" : "outlined"}
              size="small"
              style={{
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
              }}
              onClick={() => handleChange(socialName, socialData.data, false)}
            >
              <Typography color={!socialData.isShow ? "white" : "primary"}>
                Private
              </Typography>
            </Button>
            <Button
              variant={socialData.isShow ? "contained" : "outlined"}
              size="small"
              style={{
                borderTopRightRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
              onClick={() => handleChange(socialName, socialData.data, true)}
            >
              <Typography color={socialData.isShow ? "white" : "primary"}>
                Public
              </Typography>
            </Button>
          </ButtonGroup>
        </InputAdornment>
      }
      label={socialName}
      fullWidth={true}
      sx={{
        "& fieldset": {
          borderRadius: "16px",
        },
      }}
      value={socialData.data}
      disabled={socialName === "email"}
      onChange={(event) => {
        handleChange(socialName, event.target.value, socialData.isShow);
      }}
    />
  </FormControl>
);

export default PrivateAbleTextFields;
