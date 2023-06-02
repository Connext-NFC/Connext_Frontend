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
import { IUserInfo } from "../../../types/User";

export default function index(userInfo : IUserInfo | undefined) {
  return userInfo!=undefined? (
    <Container component="main" maxWidth="xs">
        <Box>
            <Typography>
                {userInfo.shortBio}
            </Typography>
        </Box>
    </Container>
  ):(
    <Container component="main" maxWidth="xs">
        <Box>
            Not Have Info
        </Box>
    </Container>
  );
}