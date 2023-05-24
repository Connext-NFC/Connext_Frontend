import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button, Box, CircularProgress, Typography } from "@mui/material";
import { IUserInfo, userInfoKey } from "../../types/User";
import { AxiosResponse } from "axios";
import { UserApiCall } from "../../services/User/user";
import { Container } from "@mui/system";
import { AlertContext } from "../../context/alertContext";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

type Props = {};

const index = (props: Props) => {
  const params = useParams();
  const navigate = useNavigate();
  const { handleAlertChange } = useContext(AlertContext);
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
  const [didFetch, setDidFetch] = useState<boolean>(false);
  const PAYLOAD_KEY: string[] = [
    "shortBio",
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
  ];

  useEffect(() => {
    handleAlertChange({});
    if (typeof params.userName === "string") {
      let userName: string = params.userName;
      const fetchData = async (userName: string) => {
        const userAPIResponse: AxiosResponse<IUserInfo> =
          await UserApiCall.getUserInfoByUserName(userName);

        if (userAPIResponse.status === 200) {
          setUserInfo(userAPIResponse.data);
        }
      };
      fetchData(userName).catch(() => navigate("/notFound"));
      setDidFetch(true);
    }
  }, []);

  const Navbar = () =>
    userInfo ? (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link to="/">
          <ArrowBackIosNewIcon />
        </Link>
        <Typography>{userInfo.userName}</Typography>

        {localStorage.getItem("accessToken") && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                m: 1,
                p: 1,
                borderRadius: "5px",
                width: "10%",
                height: "50%",
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{
                m: 1,
                p: 1,
                borderRadius: "5px",
                width: "10%",
                height: "50%",
              }}
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </Button>
          </Box>
        )}
      </Box>
    ) : (
      <></>
    );

  return (
    <Container maxWidth="xs">
      {userInfo ? (
        <Box>
          <Navbar />
          {/* <img
            src={userInfo.wallpaperImg}
            style={{ borderRadius: "16px" }}
            width="80%"
          />
          <img src={userInfo.userImg} /> */}
          <Box sx={{ textAlign: "left" }}>
            <Typography>Email: {userInfo["email"].data}</Typography>
            <Typography>Phone: {userInfo["phone"].data}</Typography>
            <Typography>website: {userInfo["website"].data}</Typography>

            <Typography>SocialMedia:</Typography>
            <Typography>
              facebook : {userInfo["socialMedia"].facebook}
            </Typography>
            <Typography>line : {userInfo["socialMedia"].line}</Typography>
            <Typography>
              instagram : {userInfo["socialMedia"].instagram}
            </Typography>
            <Typography>tiktok : {userInfo["socialMedia"].tiktok}</Typography>
            <Typography>youtube : {userInfo["socialMedia"].youtube}</Typography>
            <Typography>discord : {userInfo["socialMedia"].discord}</Typography>
            <Typography>twitter : {userInfo["socialMedia"].twitter}</Typography>
            <Typography>
              telegram : {userInfo["socialMedia"].telegram}
            </Typography>
            <Typography>
              linkedIn : {userInfo["socialMedia"].linkedIn}
            </Typography>
          </Box>
        </Box>
      ) : (
        <CircularProgress color="inherit" size={16} />
      )}
    </Container>
  );
};

export default index;
