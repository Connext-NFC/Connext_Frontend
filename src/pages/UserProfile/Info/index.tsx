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
import { SOCIAL_LIST } from "../../../types/User";
import lineImg from "../../../assets/Social/line.png";
import instagramImg from "../../../assets/Social/instagram.png";
import tiktokImg from "../../../assets/Social/tiktok.png";
import youtubeImg from "../../../assets/Social/youtube.png";
import discordImg from "../../../assets/Social/discord.png";
import twitterImg from "../../../assets/Social/twitter.png";
import telegramImg from "../../../assets/Social/telegram.png";
import linkedInImg from "../../../assets/Social/linkedIn.png";
import facebookImg from "../../../assets/Social/facebook.png";

const SOCIALS_PATH_LIST: { [key in SOCIAL_LIST]: string } = {
  line: lineImg,
  instagram: instagramImg,
  tiktok: tiktokImg,
  youtube: youtubeImg,
  discord: discordImg,
  twitter: twitterImg,
  telegram: telegramImg,
  linkedIn: linkedInImg,
  facebook: facebookImg,
};

export default function index({userInfo}: {userInfo: IUserInfo | undefined}) {
  return userInfo!=undefined? (
    <Box>
        <Box sx={{
            width:"100%",
        }}>
            <Typography>
                {userInfo.shortBio}
            </Typography>
        </Box>
        <Box sx={{
            width:"100%",
            bgcolor:"#F0F0F0",
            borderTopLeftRadius:"45px",
            borderTopRightRadius:"45px",
            paddingX:"1.25rem",
            // position:"absolute",
            // bottom:0,
        }} maxWidth="xs" >
            <Box>
                <Typography align="center">
                    CONTACT
                </Typography>
            </Box>
            <Box sx={{
                display:"flex",
                flexDirection:"column",
                width:"100%",
            }}>
                {userInfo.phone.isShow == true?
                <Box sx={{
                    display:"flex",
                    alignItems:"center",
                    width:"100%",
                    my:1
                }}>
                    <Avatar variant="rounded" sx={{ bgcolor: "black",borderRadius:"50%" }}>
                        <PhoneIphoneIcon fontSize="large" />
                    </Avatar>
                    <Box sx={{
                        textAlign:"left",
                        mx:2
                    }}>
                        <Typography variant="body2">
                            Phone
                        </Typography>
                        <Typography variant="body1" sx={{fontWeight:"500"}}>
                            {userInfo.phone.data}
                        </Typography>
                    </Box>
                </Box>:""}
                {userInfo.email.isShow == true?
                <Box sx={{
                    display:"flex",
                    alignItems:"center",
                    width:"100%",
                    my:1
                }}>
                    <Avatar variant="rounded" sx={{ bgcolor: "black",borderRadius:"50%" }}>
                        <EmailIcon fontSize="large" />
                    </Avatar>
                    <Box sx={{
                        textAlign:"left",
                        mx:2
                    }}>
                        <Typography variant="body2">
                            Email
                        </Typography>
                        <Typography variant="body1">
                            {userInfo.email.data}
                        </Typography>
                    </Box>
                </Box>:""}
                {userInfo.website.isShow == true?
                <Box sx={{
                    display:"flex",
                    alignItems:"center",
                    width:"100%",
                    my:1
                }}>
                    <Avatar variant="rounded" sx={{ bgcolor: "black",borderRadius:"50%" }}>
                        <LanguageIcon fontSize="large" />
                    </Avatar>
                    <Box sx={{
                        textAlign:"left",
                        mx:2
                    }}>
                        <Typography variant="body2">
                            Website
                        </Typography>
                        <Typography variant="body1">
                            {userInfo.website.data}
                        </Typography>
                    </Box>
                </Box>:""}
                <Box>
                    <Typography align="left">
                        Social media
                    </Typography>
                    <Box sx={{
                        display:"flex",
                    }}>
                        {Object.entries(userInfo.socialMedia).map(([key,val])=>{
                            return val!=""?(
                                <Link href={val} key={key} ><img
                                src={SOCIALS_PATH_LIST[key as SOCIAL_LIST]}
                                alt={`${key}` + " icon"}
                                width={40}
                                height={40}
                              /></Link>
                            ):("")
                        })}
                    </Box>
                </Box>
            </Box>
        </Box>
        
    </Box>
  ):(
    <Container component="main" maxWidth="xs">
        <Box>
            Not Have Info
        </Box>
    </Container>
  );
}