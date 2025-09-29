import { getCookie } from "./cookie";
import { getFilialFromLocalStorage } from "./filial";

export const getHeaders = (token?: string) => {
  return {
    authorization: token ?? getCookie("accessToken"),
    filialId: getFilialFromLocalStorage() ?? undefined,
  };
};