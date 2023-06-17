import { useState, useEffect } from "react";
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
  Container,
  Modal,
  Input,
  Avatar,
} from "@mui/material";
import { PostApiCall } from "../services/Post/post";
import { UserApiCall } from "../services/User/user";
import { IUserInfo } from "../types/User";
import { IPostInfo } from "../types/Post";
import moment from "moment";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const ShowPost = ({
  userID,
  postID,
}: {
  userID: string | undefined;
  postID: string | null;
}) => {
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
  const [postInfo, setPostInfo] = useState<IPostInfo | null>(null);
  const [didFetch, setDidFetch] = useState<boolean>(false);

  const fetchData = async () => {
    await UserApiCall.getOtherUserInfo(userID).then((res) => {
      setUserInfo(res.data);
      PostApiCall.getPost(postID).then((res) => {
        setPostInfo(res.data);
        setDidFetch(true);
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return didFetch == true ? (
    <Box sx={{
        borderBottom: "1px solid rgba(0, 0, 0, .1)",
        my:2
    }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          my:1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "40px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              mr: 2,
            }}
          >
            <img
              src={`${import.meta.env.VITE_API_BACKEND_URL}${
                userInfo?.userImg
              }`}
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
          <Box
            sx={{
              textAlign: "left",
            }}
          >
            <Typography variant="body1">{userInfo?.userName}</Typography>
            <Typography variant="body1">
              {moment(postInfo?.createdAt).format("Do MMMM YYYY")}
            </Typography>
          </Box>
        </Box>
        <Box>
            <Button sx={{p:0}}>
                <Avatar variant="rounded"  sx={{ bgcolor: "inherit", color:"black" }}>
                    <MoreHorizIcon fontSize="medium" />
                </Avatar>
            </Button>
        </Box>
      </Box>
      <Box>
        {postInfo?.postImg?<img
          src={`${import.meta.env.VITE_API_BACKEND_URL}${postInfo?.postImg}`}
          alt=""
          style={{ width: "100%", height: "100%" }}
        />:""}
        <Typography variant="body1" align="left" marginY={1}>
          {postInfo?.postDescription}
        </Typography>
      </Box>
    </Box>
  ) : (
    <Container component="main" maxWidth="xs">
      <Box>Loading...</Box>
    </Container>
  );
};

export default ShowPost;
