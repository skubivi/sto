import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { BASE_URL } from "../utils/constants/api";
import { deleteCookie, getCookie, setCookie } from "../utils/helper-functions/cookie";
import { TTokenResponse } from "../types/auth";
import { userApi } from "./user";
import { getHeaders } from "../utils/helper-functions/headers";

const mutex = new Mutex();

const baseQueryWithRefresh = ({ url }: { url: string }) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: `${BASE_URL}/${url}`,
  });

  const customFetchBase: BaseQueryFn<
    FetchArgs,
    unknown,
    FetchBaseQueryError
  > = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();

    let result = await baseQuery(
      {
        ...args,
        headers: getHeaders(),
      },
      api,
      extraOptions
    );

    if (result.error?.status === 401) {
      if (!getCookie("accessToken") && !getCookie("refreshToken")) {
        return result;
      }

      if (!mutex.isLocked()) {
        const release = await mutex.acquire();

        try {
          const refreshResult = await baseQuery(
            {
              url: BASE_URL + "/refresh",
              method: "POST",
              headers: { authorization: getCookie("refreshToken") },
            },
            api,
            extraOptions
          );

          if (refreshResult.data) {
            setCookie(
              "accessToken",
              (refreshResult.data as TTokenResponse).accessToken
            );
            setCookie(
              "refreshToken",
              (refreshResult.data as TTokenResponse).refreshToken
            );

            result = await baseQuery(
              {
                ...args,
                headers: getHeaders((refreshResult.data as TTokenResponse).accessToken),
              },
              api,
              extraOptions
            );
          } else {
            deleteCookie("accessToken");
            deleteCookie("refreshToken");
            api.dispatch(userApi.util.resetApiState());
          }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await baseQuery(
          {
            ...args,
            headers: getHeaders(),
          },
          api,
          extraOptions
        );
      }
    }

    return result;
  };

  return customFetchBase;
};

export default baseQueryWithRefresh;
