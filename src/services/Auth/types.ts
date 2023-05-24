import { AxiosResponse } from "axios";
import { IUserRegisterInfo, IUserCredential } from "../../types/User";

export interface IAuthApiCall {
  login: (userCredential: IUserCredential) => Promise<AxiosResponse>;
  register: (registerPayload: IUserRegisterInfo) => Promise<AxiosResponse>;
}
