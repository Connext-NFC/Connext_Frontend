import { useState } from "react";
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
  Avatar
} from "@mui/material";
import {PostApiCall} from "../services/Post/post"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { IUserInfo } from "../types/User";

const AddPostModal = ({
  handleChangeModal,
  open,
  userInfo
}: {
  handleChangeModal: () => void;
  open: boolean;
  userInfo : IUserInfo | undefined
}) => {
    const [loading, setIsLoading] = useState<boolean>(false);
    const [isAddImage,setIsAddImage] = useState<boolean>(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);
    let payload = {
      image: data.get("image"),
      postDescription: data.get("description"),
    };
    PostApiCall.createPost(payload).then((res)=>{
      console.log(res.status)
    })
    setIsLoading(false);
  };
  const handleIsAddImage =async()=>{
    setIsAddImage(!isAddImage)
  }
  return (
    <Modal
      open={open}
      onClose={handleChangeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          maxWidth: "400px",
          borderRadius:"16px"
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          align="center"
        >
          Create Post
        </Typography>
        <Box sx={{
          display:"flex",
          alignItems:"center",
          my:2
        }}>
          <Box sx={{
            width:"50px",
            height:"50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius:"50%",
            mr:2
          }}>
            <img 
                  src={`${import.meta.env.VITE_API_BACKEND_URL}${
                    userInfo?.userImg
                  }`}
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
          </Box>
            <Typography
            variant="body1"
          >
            {userInfo?.userName}
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit}>
          <Box>
            <TextField
              placeholder="What do you think?"
              multiline
              rows={5}
              fullWidth
              variant="standard"
              id="description"
              name="description"
              InputProps={{
                disableUnderline: true,
              }}
            />
            {isAddImage==true?
              <Input type="file" id="image" name="image" disableUnderline={true} fullWidth={true}/>
            :""}
            <Box sx={{
              width:"100%",
              display:"flex",
              justifyContent:"end",
            }}
            >
              <Button onClick={()=>handleIsAddImage()}>
                <Avatar variant="rounded" sx={{  bgcolor: "pimary" ,width:'40px',height:'40px',borderRadius:"50%"}}>
                  <AddPhotoAlternateIcon fontSize="medium" />
                </Avatar>
              </Button>
          </Box>
          </Box>
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
                POST
              </Typography>
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddPostModal;
