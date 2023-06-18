import { IUserInfo } from "../../types/User";
import api from "../../utils/api";
import type { IUserApiCall } from "./types";

const UserApiCall: IUserApiCall = {
  getUserInfo: async () => {
    const token = await localStorage.getItem("accessToken");
    return api({
      method: "GET",
      url: `/user/getUserInfo`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getOtherUserInfo: async (userName : string | undefined) => {
    return api({
      method: "GET",
      url: `/user/getOtherUserInfo/${userName}`,
    });
  },

  updateUserInfo: async (payload: IUserInfo) => {
    const token = localStorage.getItem("accessToken");
    return api({
      method: "PATCH",
      url: `/user/editUserInfo`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: payload,
    });
  },

  follow:async(followId : string | undefined)=>{
    const token = localStorage.getItem("accessToken");
    return api({
      method:"POST",
      url:`/user/follow`,
      headers:{
        Authorization: `Bearer ${token}`,
      },
      data:{followId:followId}
    });
  },

  unfollow:async(unfllowId:string | undefined)=>{
    const token = localStorage.getItem("accessToken");
    return api({
      method:"POST",
      url:`/user/unfollow`,
      headers:{
        Authorization: `Bearer ${token}`,
      },
      data:{followId:unfllowId}
    })
  }
};

export { UserApiCall };
