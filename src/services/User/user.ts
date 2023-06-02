import { IUserInfo } from "../../types/User";
import api from "../../utils/api";
import type { IUserApiCall } from "./types";

const token = localStorage.getItem("accessToken");

const UserApiCall: IUserApiCall = {
  getUserInfo: async () => {
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
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
