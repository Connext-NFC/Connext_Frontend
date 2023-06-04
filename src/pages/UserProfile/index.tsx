import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { SHA256 } from "crypto-js";
// import { TabPanel } from "@mui/lab";
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
  Tabs,
  Tab,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SettingsIcon from "@mui/icons-material/Settings";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { IUserInfo } from "../../types/User";
import { UserApiCall } from "../../services/User/user";
import NotFound404 from "../NotFound404";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import InfoBox from "./Info";
import { UserContext } from "../../context/userContext";

import { type } from "os";
import { json } from "node:stream/consumers";
import jwtDecode from "jwt-decode";
import { IAccessToken } from "../../types/Token";

type IParams = {
  userName: string | undefined;
};

type IState = "Info" | "Post" | "Event";

export default function index() {
  const [loading, setIsLoading] = useState<boolean>(false);
  const [didFetch, setDidFetch] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
  const [showStete, setShowState] = useState<IState>("Info");
  const { userInfoContext, getUserInfoContext } = useContext(UserContext);
  const { userName } = useParams<IParams>();
  let token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  // const fetchData = async()=>{
  //   if(token==null || jwtDecode<IAccessToken>(token).userName!==userName){
  //     UserApiCall.getOtherUserInfo(userName).then((res) => {
  //     setUserInfo(res.data);
  //     setDidFetch(true);
  //   });
  // }else if(jwtDecode<IAccessToken>(token).userName===userName){
  //   await getUserInfoContext()
  //   await setUserInfo(userInfoContext);
  //   setDidFetch(true);
  // }
  // }

  useEffect(() => {
    UserApiCall.getOtherUserInfo(userName).then((res) => {
      setUserInfo(res.data);
      setDidFetch(true);
    });
  }, []);

  const handleShowState = (event: React.SyntheticEvent, newState: IState) => {
    event.preventDefault();
    setShowState(newState);
  };

  const followEvent =async () => {
    if (token == null){
      navigate("/login")
    }
    else if(userInfo?.followers.includes(jwtDecode<IAccessToken>(token)._id)){
      UserApiCall.unfollow(userInfo?._id)
    }else{
      UserApiCall.follow(userInfo?._id)
    }
  }

  return userInfo && didFetch ? (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <Avatar
              variant="rounded"
              sx={{ m: 1, bgcolor: "inherit", color: "black" }}
            >
              <ArrowBackIosIcon fontSize="small" />
            </Avatar>
            <Typography
              variant="h1"
              sx={{
                fontSize: "1.5rem",
              }}
            >
              {userInfo?.userName}
            </Typography>
            <Avatar
              variant="rounded"
              sx={{ m: 1, bgcolor: "inherit", color: "black" }}
            >
              <SettingsIcon fontSize="small" />
            </Avatar>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              borderTopRightRadius: "16px",
              borderTopLeftRadius: "16px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Box
              sx={{
                height: "170px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={`${import.meta.env.VITE_API_BACKEND_URL}${
                  userInfo?.wallpaperImg
                }`}
                alt=""
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              position: "relative",
              width: "100%",
              height: "70px",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "-50px",
                border: "2px solid white",
                left: "20px",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <img
                src={`${import.meta.env.VITE_API_BACKEND_URL}${
                  userInfo?.userImg
                }`}
                alt=""
              />
            </Box>
            <Box
              sx={{
                width: "70%",
                display: "flex",
                alignItems: "center",
                pr: "1.25rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mx: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: "1.2rem",
                  }}
                >
                  {userInfo?.followers.length}
                </Typography>
                <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                  Followers
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mx: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: "1.2rem",
                  }}
                >
                  {userInfo?.following.length}
                </Typography>
                <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                  Following
                </Typography>
              </Box>
              {token != null &&
              jwtDecode<IAccessToken>(token).userName === userName ? (
                <Link>
                  <Avatar
                    variant="rounded"
                    sx={{
                      mx: 1,
                      bgcolor: "#D9D9DA",
                      color: "#6E6E6E",
                      borderRadius: "16px",
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </Avatar>
                </Link>
              ) : token != null && userInfo?.followers.includes(jwtDecode<IAccessToken>(token)._id)? (
                <Link onClick={()=>followEvent()}>
                  <Avatar
                    variant="rounded"
                    sx={{
                      mx: 1,
                      bgcolor: "#D9D9DA",
                      color: "#6E6E6E",
                      borderRadius: "16px",
                    }}
                  >
                    <HowToRegIcon fontSize="small" />
                  </Avatar>
                </Link>
              ):(
                <Link onClick={()=>followEvent()}>
                  <Avatar
                    variant="rounded"
                    sx={{
                      mx: 1,
                      bgcolor: "#D9D9DA",
                      color: "#6E6E6E",
                      borderRadius: "16px",
                    }}
                  >
                    <PersonAddIcon fontSize="small" />
                  </Avatar>
                </Link>
              )}
            </Box>
          </Box>
        </Box>
        {token != null &&jwtDecode<IAccessToken>(token).userName === userName ?
        <Box
        sx={{
          width: "100%",
          paddingY: "10px",
          paddingX: " 20px",
          display: "flex",
          mb: "1rem",
        }}
      >
        <Button
          sx={{
            height: "2.5rem",
            color: "white",
            bgcolor: "#FD9340",
            width: "60%",
            borderRadius: "16px",
            mr: 1,
            textTransform: "none",
          }}
        >
          <Avatar variant="rounded" sx={{ bgcolor: "inherit", m: 0 }}>
            <AddCircleIcon fontSize="medium" />
          </Avatar>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            New post
          </Typography>
        </Button>
        <Button
          sx={{
            height: "2.5rem",
            color: "#FD9340",
            bgcolor: "white",
            border: "2px solid #FD9340",
            width: "30%",
            borderRadius: "16px",
            textTransform: "none",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            New event
          </Typography>
        </Button>
      </Box>:
      ""  
      }
        <TabContext value={showStete}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
            <TabList
              onChange={handleShowState}
              aria-label="lab API tabs example"
              variant="fullWidth"
            >
              <Tab label="Info" value="Info" />
              <Tab label="Event" value="Event" />
              <Tab label="Post" value="Post" />
            </TabList>
          </Box>
          <TabPanel value="Info" sx={{ width: "100%", padding: 0 }}>
            <InfoBox {...userInfo} />
          </TabPanel>
          <TabPanel value="Event">Event</TabPanel>
          <TabPanel value="Post">Post</TabPanel>
        </TabContext>
      </Box>
    </Container>
  ) : (
    <NotFound404 />
  );
}
