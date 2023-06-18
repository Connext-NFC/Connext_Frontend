import { useState, useContext, useEffect } from "react";
import {
  Box,
  CircularProgress,
  FormControlLabel,
  Link,
  TextField,
  Typography,
  Checkbox,
  Button,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Chip,
  Divider,
} from "@mui/material";
import { Container } from "@mui/system";
import { AlertContext } from "../../context/alertContext";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { regexValidator } from "../../utils/regexValidator";
import {
  IUserInfo,
  IUserRegisterInfo,
  privateAbleKey,
  privateAbleKeyType,
  SOCIAL_LIST,
  userInfoKey,
} from "../../types/User";
import { SHA256 } from "crypto-js";
import { AuthApiCall } from "../../services/Auth/auth";
import { Theme, useTheme } from "@mui/material/styles";
import { UserApiCall } from "../../services/User/user";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import SocialTextFields from "../../components/SocialTextFields";
import PrivateAbleTextFields from "../../components/PrivateAbleTextFields";
import { UserInfo } from "os";
// TODO: Separate Update user information to a new page
type Props = {};

function index({}: Props) {
  const navigate = useNavigate();
  const theme = useTheme();

  const { handleAlertChange } = useContext(AlertContext);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [career, setCareer] = useState("");
  const [bDay, setBDay] = useState<Dayjs | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCPassword, setShowCPassword] = useState<boolean>(false);
  const [interested, setInterested] = useState<string[]>([]);
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
  const [didFetch, setDidFetch] = useState<boolean>(false);
  const [isChange, serIsChange] = useState<boolean>(false);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const privateAbleKey: privateAbleKeyType[] = ["email", "phone", "website"];
  const PAYLOAD_KEY: userInfoKey[] = [
    "email",
    "phone",
    "website",
    "socialMedia",
    "firstName",
    "lastName",
    "userName",
    "bornDate",
    "attention",
    "career",
    "shortBio",
  ];

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const INTERESTED_TOPIC = [
    "Business",
    "Marketing",
    "Finance",
    "Technology",
    "Art",
    "Music",
  ];

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowCPassword = () => setShowCPassword((show) => !show);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const data = new FormData(event.currentTarget);

    let input: IUserRegisterInfo = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: (document.getElementById("password") as HTMLInputElement).value,
      confirmPassword: (
        document.getElementById("confirmPassword") as HTMLInputElement
      ).value,
      bornDate: bDay,
    };
    console.log(input);

    if (validateRegisterInfo(input)) {
      delete input["confirmPassword"];
      hashPassword(input);

      const authAPIResponse = await AuthApiCall.register(input);

      if (authAPIResponse.status !== 201) {
        handleAlertChange({
          type: "error",
          msg: authAPIResponse.data.message || authAPIResponse,
        });
        return;
      }

      handleAlertChange({
        type: "success",
        msg: "Register Process Successfully",
      });

      let token = authAPIResponse.data.accessToken;

      const userAPIResponse: AxiosResponse<IUserInfo> =
        await UserApiCall.getUserInfo();

      handleAlertChange({});

      if (userAPIResponse.status === 200) {
        setUserInfo(userAPIResponse.data);
        setDidFetch(true);
        localStorage.setItem("accessToken", token);
      } else {
        navigate("/login");
      }
    }
  };

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (userInfo != null && validateUpdateInfo(userInfo)) {
      userInfo.attention = interested;
      userInfo.career = career;

      let payload: { [key: string]: any } = {};
      PAYLOAD_KEY.map((key: userInfoKey) => {
        payload[key] = userInfo[key];
      });

      const userAPIResponse = await UserApiCall.updateUserInfo(userInfo);
      if (userAPIResponse.status === 200) {
        handleAlertChange({
          type: "success",
          msg: "Update Information successfully",
        });
        navigate("/" + userInfo.userName);
      } else {
        handleAlertChange({
          type: "error",
          msg:
            typeof userAPIResponse.data.message === "string"
              ? userAPIResponse.data.message + " please try again"
              : "please try again",
        });
        return;
      }
    }
  };

  function validateUpdateInfo({
    phone,
    website,
    socialMedia,
  }: IUserInfo): boolean {
    if (!regexValidator.phone(phone.data) || phone.data === "") {
      handleAlertChange({
        type: "error",
        msg: "Phone have to contain 9-10 digits",
      });
      return false;
    }
    if (!regexValidator.url(website.data) || website.data === "") {
      handleAlertChange({
        type: "error",
        msg: "URL have to start with http or https or www",
      });
      return false;
    }

    Object.values(socialMedia).map((link) => {
      if (!regexValidator.url(link) || link === "") {
        handleAlertChange({
          type: "error",
          msg: "URL have to start with http or https",
        });
        return false;
      }
    });

    return true;
  }

  function validateRegisterInfo({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    bornDate,
  }: IUserRegisterInfo): boolean {
    if (
      typeof firstName === "string" &&
      typeof lastName === "string" &&
      typeof email === "string" &&
      bornDate != null
    ) {
      if (!regexValidator.name(firstName)) {
        handleAlertChange({
          type: "error",
          msg: "First name have to contain 2-50 characters",
        });
        return false;
      }
      if (!regexValidator.name(lastName)) {
        handleAlertChange({
          type: "error",
          msg: "Last name have to contain 2-50 characters",
        });
        return false;
      }
      if (!regexValidator.email(email)) {
        handleAlertChange({
          type: "error",
          msg: "Your email is incorrect format : xxx@xxx.xxx",
        });
        return false;
      }
      if (!regexValidator.password(password)) {
        handleAlertChange({
          type: "error",
          msg: "Password have to contain 8-50 letter with upper case, lower case and digit not allow for special characters",
        });
        return false;
      }
      if (password !== confirmPassword) {
        handleAlertChange({
          type: "error",
          msg: "Confirm password is incorrect",
        });
        return false;
      }
      if (!regexValidator.bornDate(bornDate)) {
        handleAlertChange({
          type: "error",
          msg: "Your birth date incorrect [Age more than 5]",
        });
        return false;
      }

      handleAlertChange({});
      return true;
    }
    handleAlertChange({
      type: "error",
      msg: "Please input required filed",
    });
    return false;
  }

  function hashPassword(payload: IUserRegisterInfo): void {
    payload.password = payload.password.trim();
    if (payload.password !== "") {
      payload.password = SHA256(payload.password).toString();
    }
  }

  function getStyles(
    topic: string,
    INTERESTED_TOPIC: readonly string[],
    theme: Theme
  ) {
    return {
      fontWeight:
        INTERESTED_TOPIC.indexOf(topic) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleSelectTopic = (event: SelectChangeEvent<typeof interested>) => {
    const {
      target: { value },
    } = event;
    setInterested(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  function handleSocialChange(social: SOCIAL_LIST, newValue: string) {
    if (userInfo) {
      let newObj = { ...userInfo };
      newObj.socialMedia[social] = newValue;
      setUserInfo(newObj);
      serIsChange(true);
    }
  }

  function handlePrivateDataChange(
    social: privateAbleKeyType,
    newValue: string,
    newIsShow: boolean
  ) {
    if (userInfo) {
      let newObj = { ...userInfo };
      newObj[social] = { data: newValue, isShow: newIsShow };
      setUserInfo(newObj);
      serIsChange(true);
    }
  }

  useEffect(() => {
    UserApiCall.getUserInfo().then((res) => {
        setUserInfo(res.data);
        setDidFetch(true);
      });

    handleAlertChange({});
  }, []);

  useEffect(() => {
    if (userInfo) {
      if (!career) setCareer(userInfo?.career);
      if (interested.length === 0) setInterested(userInfo?.attention);
    }
  }, [userInfo]);

  return (
        <Container maxWidth="xs">
          <Typography variant="h4" sx={{ textAlign: "left" }}>
            Update user info
          </Typography>
          <Box
            component="form"
            onSubmit={async (event) => {
              await handleSubmit(event);
              setIsLoading(false);
            }}
            noValidate
            sx={{ mt: 1 }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="firstName"
                label="First Name"
                type="text"
                id="firstName"
                autoComplete="first-name"
                inputProps={{ maxLength: 50 }}
                sx={{
                  mr: 2,
                  "& fieldset": {
                    borderRadius: "16px",
                  },
                }}

                // TODO: validate onMouseLeft
                // onBlur={(e) => regexValidator.name(e.target.value)}
                // error={(e) => !regexValidator.name(e.target.value)}
                // helperText="Please specify the first name"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="lastName"
                label="Last Name"
                type="text"
                id="lastName"
                autoComplete="last-name"
                inputProps={{ maxLength: 50 }}
                sx={{
                  "& fieldset": {
                    borderRadius: "16px",
                  },
                }}
              />
            </Box>
            <Box sx={{ mt: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <DatePicker
                    label="Date of birth"
                    value={bDay}
                    defaultValue={dayjs("2005-05-01")}
                    defaultCalendarMonth={dayjs("2005-05-01")}
                    slotProps={{
                      textField: {
                        helperText: "MM/DD/YYYY",
                      },
                    }}
                    onChange={(newValue) => setBDay(newValue)}
                    sx={{
                      width: "100%",
                      "& fieldset": {
                        borderRadius: "16px",
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <FormControl
                sx={{
                  minWidth: 200,
                  width: "100%",
                  display: "flex",
                  justifyContent: "start",
                  my: 1,
                  "& fieldset": {
                    borderRadius: "16px",
                  },
                }}
              >
                <InputLabel id="demo-simple-select-helper-label">
                  Career
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="select-helper"
                  value={career}
                  label="Career"
                  onChange={(event) => setCareer(event.target.value)}
                >
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="privateCompanyEmployees">
                    Private Company Employees
                  </MenuItem>
                  <MenuItem value="stateEnterpriseEmployees">
                    State Enterprise Employees
                  </MenuItem>
                  <MenuItem value="civilServant">Civil Servant</MenuItem>
                  <MenuItem value="factoryWorkers">Factory Workers</MenuItem>
                  <MenuItem value="businessOwner">Business Owner</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                sx={{
                  minWidth: 200,
                  width: "100%",
                  display: "flex",
                  justifyContent: "start",
                  my: 1,
                  "& fieldset": {
                    borderRadius: "16px",
                  },
                }}
              >
                <InputLabel id="demo-simple-select-helper-label">
                  Career
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="select-helper"
                  value={career}
                  label="Career"
                  onChange={(event) => setCareer(event.target.value)}
                >
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="privateCompanyEmployees">
                    Private Company Employees
                  </MenuItem>
                  <MenuItem value="stateEnterpriseEmployees">
                    State Enterprise Employees
                  </MenuItem>
                  <MenuItem value="civilServant">Civil Servant</MenuItem>
                  <MenuItem value="factoryWorkers">Factory Workers</MenuItem>
                  <MenuItem value="businessOwner">Business Owner</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                sx={{
                  minWidth: 200,
                  width: "100%",
                  display: "flex",
                  mt: 1,
                  mb: 2,
                  justifyContent: "start",
                  "& fieldset": {
                    borderRadius: "16px",
                  },
                }}
              >
                <InputLabel id="demo-multiple-chip-label">
                  Interested topic
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={interested}
                  onChange={handleSelectTopic}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {INTERESTED_TOPIC.map((topic) => (
                    <MenuItem
                      key={topic}
                      value={topic}
                      style={getStyles(topic, INTERESTED_TOPIC, theme)}
                    >
                      {topic}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Divider />
              {userInfo!=null?(
              <>
                <Box sx={{ my: 2 }}>
                {privateAbleKey.map((social: privateAbleKeyType) => (
                  <PrivateAbleTextFields
                    key={social}
                    socialName={social}
                    socialData={userInfo[social]}
                    handleChange={handlePrivateDataChange}
                  />
                ))}
              </Box>
              <Divider />
              <SocialTextFields
                socialMedia={userInfo.socialMedia}
                handleChange={handleSocialChange}
                />
              </>):("")}
              

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
                  REGISTER
                </Typography>
              )}
            </Button>
          </Box>
        </Container>
  );
}

export default index;
