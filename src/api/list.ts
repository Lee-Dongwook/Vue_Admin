import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data?: {
    list: any[];
  };
};

export const getCardList = (data?: object) => {
  return http.request<Result>("post", "/get-card-list", { data });
};
