import { ICreatePost } from "../../types/Post";
import api from "../../utils/api";
import { IPostApiCall } from "./types";


const PostApiCall:IPostApiCall={
    createPost : async (payload:ICreatePost)=>{
        const token = await localStorage.getItem("accessToken");
        const formData = new FormData();
        if (payload.image) {
            formData.append('image', payload.image);
          }
          if (payload.postDescription) {
            formData.append('postDescription', payload.postDescription);
          }
        console.log(formData.get("image"))
        console.log(formData.get("postDescription"))
        return api({
            method:"POST",
            url:`/post/createPost`,
            headers:{
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            },
            data: formData,
        });
    },

    getPost:async(_id : string | null)=>{
        return api({
            method:"GET",
            url:`/post/getPost/${_id}`,
        });
    }
}

export {PostApiCall};