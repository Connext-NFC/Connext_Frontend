import { useState, useEffect } from "react";
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
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import { IUserInfo } from "../../types/User";
import { UserApiCall } from "../../services/User/user";
import NotFound404 from "../NotFound404";
// import InfoBox from "./Info";

import { type } from "os";
import { json } from "node:stream/consumers";

type IParams = {
  userName: string | undefined;
};

type IState = "Info" | "Post" | "Event";

export default function index() {
  const [loading, setIsLoading] = useState<boolean>(false);
  const [didFetch, setDidFetch] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
  const [showStete, setShowState] = useState<IState>("Info");
  const { userName } = useParams<IParams>();
  useEffect(() => {
    UserApiCall.getOtherUserInfo(userName).then((res) => {
      console.log(res)
      setUserInfo(res.data);
      setDidFetch(true);
    });
  }, []);

  console.log(didFetch,userInfo);
  return userInfo && didFetch ?(
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
              <MoreHorizIcon fontSize="small" />
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
              pr: "1.25rem",
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
              <Avatar variant="rounded" sx={{ mx:{xs:1,sm:1}, bgcolor: "#6E6E6E" }}>
                <EditIcon fontSize="small" />
              </Avatar>
            </Box>
          </Box>
        </Box>
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
              px: "2.5rem",
              borderRadius: "16px",
              mr: 1,
              textTransform:"none"
            }}
          >
            <Avatar variant="rounded" sx={{ bgcolor: "inherit" }}>
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
              px: "1rem",
              borderRadius: "16px",
              textTransform:"none"
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
        </Box> 
        {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        {/* {showStete == "Info" ? <InfoBox {...userInfo} /> : <Box></Box>} */}
      </Box>
    </Container>
  ):(
    <NotFound404/>
  );
}