import api from "../../utils/api";
import { IUserRegisterInfo, IUserCredential } from "../../types/User";
import type { IAuthApiCall } from "./types";

const AuthApiCall: IAuthApiCall = {
  login: async (userCredential: IUserCredential) => {
    return api({
      method: "POST",
      url: `/auth/login`,
      data: userCredential,
    });
  },

  register: async (registerPayload: IUserRegisterInfo) => {
    return api({
      method: "POST",
      url: `/auth/register`,
      data: registerPayload,
    });
  },
};

export { AuthApiCall };
