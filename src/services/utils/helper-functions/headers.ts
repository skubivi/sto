import { getCookie } from "./cookie";
import { getStringFilialFromLocalStorage } from "./filial";

export const getHeaders = (token?: string) => {
  return {
    authorization: token ?? getCookie("accessToken"),
    filialId: getStringFilialFromLocalStorage() ?? undefined,
  };
};