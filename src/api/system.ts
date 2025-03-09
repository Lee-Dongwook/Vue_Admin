import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data?: any[];
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

export const getUserList = (data?: object) => {
  return http.request<ResultTable>("post", "/user", { data });
};

export const getAllRoleList = () => {
  return http.request<Result>("get", "/list-all-role");
};

export const getRoleIds = (data?: object) => {
  return http.request<Result>("post", "/list-role-ids", { data });
};

export const getRoleList = (data?: object) => {
  return http.request<ResultTable>("post", "/role", { data });
};

export const getMenuList = (data?: object) => {
  return http.request<Result>("post", "/menu", { data });
};

export const getDeptList = (data?: object) => {
  return http.request<Result>("post", "/dept", { data });
};

export const getOnlineLogsList = (data?: object) => {
  return http.request<ResultTable>("post", "/online-logs", { data });
};

export const getLoginLogsList = (data?: object) => {
  return http.request<ResultTable>("post", "/login-logs", { data });
};

export const getOperationLogsList = (data?: object) => {
  return http.request<ResultTable>("post", "/operation-logs", { data });
};

export const getSystemLogsList = (data?: object) => {
  return http.request<ResultTable>("post", "/system-logs", { data });
};

export const getSystemLogsDetail = (data?: object) => {
  return http.request<Result>("post", "/system-logs-detail", { data });
};

export const getRoleMenu = (data?: object) => {
  return http.request<Result>("post", "/role-menu", { data });
};

export const getRoleMenuIds = (data?: object) => {
  return http.request<Result>("post", "/role-menu-ids", { data });
};
