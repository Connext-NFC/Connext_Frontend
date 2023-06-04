import { AxiosResponse } from "axios";
import { IUserRegisterInfo, IUserCredential, IUserInfo } from "../../types/User";

export interface IUserApiCall {
  getUserInfo: () => Promise<AxiosResponse>;
  getOtherUserInfo : (userName : string | undefined) => Promise<AxiosResponse>;
  updateUserInfo: (payload: IUserInfo) => Promise<AxiosResponse>;
  follow:(followId:string | undefined) => Promise<AxiosResponse>;
  unfollow:(unfollowId:string | undefined)=>Promise<AxiosResponse>;
}
