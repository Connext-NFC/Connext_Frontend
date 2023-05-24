import React from "react";

import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { SOCIAL_LIST } from "../types/User";
import lineImg from "../assets/Social/line.png";
import instagramImg from "../assets/Social/instagram.png";
import tiktokImg from "../assets/Social/tiktok.png";
import youtubeImg from "../assets/Social/youtube.png";
import discordImg from "../assets/Social/discord.png";
import twitterImg from "../assets/Social/twitter.png";
import telegramImg from "../assets/Social/telegram.png";
import linkedInImg from "../assets/Social/linkedIn.png";
import facebookImg from "../assets/Social/facebook.png";
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

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

interface IProps {
  socialMedia: { [key in SOCIAL_LIST]: string };
  handleChange: (social: SOCIAL_LIST, newValue: string) => void;
}
// TODO: disable when loading
const SocialTextFields = ({ socialMedia, handleChange }: IProps) => (
  <Box sx={{ my: 2 }}>
    {Object.entries(socialMedia).map(([key, val]) => {
      return (
        <FormControl key={key} sx={{ my: 1, width: "100%" }} variant="outlined">
          <InputLabel htmlFor={`${key}` + "field"}>{key}</InputLabel>
          <OutlinedInput
            id={`${key}` + "field"}
            type="text"
            startAdornment={
              <InputAdornment position="start">
                <img
                  src={SOCIALS_PATH_LIST[key as SOCIAL_LIST]}
                  alt={`${key}` + " icon"}
                  width={30}
                  height={30}
                />
              </InputAdornment>
            }
            label={key}
            fullWidth={true}
            sx={{
              "& fieldset": {
                borderRadius: "16px",
              },
            }}
            value={val}
            onChange={(event) => {
              handleChange(key as SOCIAL_LIST, event.target.value);
            }}
          />
        </FormControl>
      );
    })}
  </Box>
);

export default SocialTextFields;
