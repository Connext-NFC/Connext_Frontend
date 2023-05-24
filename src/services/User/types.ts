import { AxiosResponse } from "axios";
import {
  IUserRegisterInfo,
  IUserCredential,
  IUserInfo,
} from "../../types/User";

export interface IUserApiCall {
  getUserInfoByToken: () => Promise<AxiosResponse>;
  getUserInfoByUserName: (username: string) => Promise<AxiosResponse>;
  updateUserInfo: (payload: IUserInfo) => Promise<AxiosResponse>;
}
