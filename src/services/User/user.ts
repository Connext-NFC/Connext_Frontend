import { IUserInfo } from "../../types/User";
import api from "../../utils/api";
import type { IUserApiCall } from "./types";

const token = localStorage.getItem("accessToken");

const UserApiCall: IUserApiCall = {
  getUserInfoByToken: async () => {
    return api({
      method: "GET",
      url: `/user/getUserInfo`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getUserInfoByUserName: async (username: string) => {
    return api({
      method: "GET",
      url: `/user/getOtherUserInfo/${username}`,
    });
  },

  updateUserInfo: async (payload: IUserInfo) => {
    return api({
      method: "PATCH",
      url: `/user/editUserInfo`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: payload,
    });
  },
};

export { UserApiCall };
