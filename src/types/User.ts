import { Dayjs } from "dayjs";
import { type } from "os";
export interface IUserCredential {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}

export interface IUserRegisterInfo {
  firstName: FormDataEntryValue | null;
  lastName: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  password: string;
  confirmPassword?: string;
  bornDate: Dayjs | null;
}

export interface IUserInfo {
  email: {
    data: string;
    isShow: boolean;
  };
  phone: {
    isShow: boolean;
    data: string;
  };
  website: {
    isShow: boolean;
    data: string;
  };
  socialMedia: {
    facebook: string;
    line: string;
    instagram: string;
    tiktok: string;
    youtube: string;
    discord: string;
    twitter: string;
    telegram: string;
    linkedIn: string;
  };
  _id: string;
  userID: string;
  firstName: string;
  lastName: string;
  bornDate: string;
  attention: string[];
  userName: string;
  userImg: string;
  wallpaperImg: string;
  followers: string[];
  following: string[];
  posts: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  career: string;
}

export interface IChangePassword{
  newPassword: FormDataEntryValue | null;
  confirmPassword: FormDataEntryValue | null;
}

export type SOCIAL_LIST = keyof IUserInfo["socialMedia"];

export const privateAbleKey = ["email", "phone", "website"] as const;
export type privateAbleKeyType = "email" | "phone" | "website";
// export type privateAbleKeyType = typeof privateAbleKey;
