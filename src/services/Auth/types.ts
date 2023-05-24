import { AxiosResponse } from "axios";
import { IUserRegisterInfo, IUserCredential, IChangePassword } from "../../types/User";

export interface IAuthApiCall {
  login: (userCredential: IUserCredential) => Promise<AxiosResponse>;
  register: (registerPayload: IUserRegisterInfo) => Promise<AxiosResponse>;
  forgotPassword : (email : FormDataEntryValue | null) => Promise<AxiosResponse>;
  verifyOTPForgot : (otp: string) => Promise<AxiosResponse>;
  changeForgotPassword : (changePassword : IChangePassword) => Promise<AxiosResponse>;
}
