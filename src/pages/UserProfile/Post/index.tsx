import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SHA256 } from "crypto-js";
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
} from "@mui/material";
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import { IUserInfo } from "../../../types/User";
import ShowPost from "../../../components/ShowPost";


export default function index({userInfo}: {userInfo: IUserInfo | undefined}) {
  return userInfo!=undefined? (
    <Box>
        {Object.entries(userInfo.posts).map(([key,val])=>{
                            return val!=""?(
                                <ShowPost userID={userInfo.userName} postID={val} key={key}/>
                            ):("")
                        })}
    </Box>
  ):(
    <Container component="main" maxWidth="xs">
        <Box>
            Not Have Info
        </Box>
    </Container>
  );
}