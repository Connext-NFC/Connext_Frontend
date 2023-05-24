import { AxiosResponse } from "axios";
import { IUserRegisterInfo, IUserCredential, IUserInfo } from "../../types/User";

export interface IUserApiCall {
  getUserInfo: () => Promise<AxiosResponse>;
  updateUserInfo: (payload: IUserInfo) => Promise<AxiosResponse>;

}
