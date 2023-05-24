import api from "../../utils/api";
import { IUserRegisterInfo, IUserCredential, IChangePassword } from "../../types/User";
import type { IAuthApiCall } from "./types";

const token = localStorage.getItem("accessToken");
const forgotToken = localStorage.getItem("forgotToken");

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

  forgotPassword : async (email : FormDataEntryValue | null) =>{
    return api({
      method:"POST",
      url:`/auth/forgotOTP`,
      data: {email},
    });
  },

  verifyOTPForgot: async(otp : string)=>{
    return api({
      method:"POST",
      url:`/auth/verifyOTPForgot`,
      headers: {
        Authorization: `Bearer ${forgotToken}`,
      },
      data: {otp},
    })
  },

  changeForgotPassword : async(changePassword:IChangePassword)=>{
    console.log(changePassword)
    return api({
      method:"PATCH",
      url:`/auth/changeForgotPassword`,
      headers: {
        Authorization: `Bearer ${forgotToken}`,
      },
      data: changePassword,
    })
  }
};


export { AuthApiCall };
