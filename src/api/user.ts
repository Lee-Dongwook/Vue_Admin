import { http } from "@/utils/http";

export type UserResult = {
  success: boolean;
  data: {
    avatar: string;
    username: string;
    nickname: string;
    roles: string[];
    permissions: string[];
    accessToken: string;
    refreshToken: string;
    expires: Date;
  };
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    expires: Date;
  };
};

export type UserInfo = {
  avatar: string;
  username: string;
  nickname: string;
  email: string;
  phone: string;
  description: string;
};

export type UserInfoResult = {
  success: boolean;
  data: UserInfo;
};

type ResultTable = {
  success: boolean;
  data?: {
    list: any[];
    total?: number;
    pageSize?: number;
    currentPage?: number;
  };
};

export const getLogin = (data?: object) => {
  return http.request<UserResult>("post", "/login", { data });
};

export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", "/refresh-token", { data });
};

export const getMine = (data?: object) => {
  return http.request<UserInfoResult>("get", "/mine", { data });
};

export const getMineLogs = (data?: object) => {
  return http.request<ResultTable>("get", "/mine-logs", { data });
};
