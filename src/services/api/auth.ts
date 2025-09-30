import {
  TAdminRegister,
  TLoginRequest,
  TMechanicRegister,
  TReceptionistRegister,
  TTokenResponse,
} from "../types/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "./user";
import { BASE_URL } from "../utils/constants/api";
import { AuthEndpointRoutes } from "../routes/endpoints/auth";
import { deleteCookie, getCookie, setCookie } from "../utils/helper-functions/cookie";
import { personalApi } from "./personal";

const setTokens = (tokens: TTokenResponse) => {
  setCookie("accessToken", tokens.accessToken);
  setCookie("refreshToken", tokens.refreshToken);
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/${AuthEndpointRoutes.Base}`,
  }),
  endpoints: (builder) => ({
    registerAdmin: builder.mutation<undefined, TAdminRegister>({
      query: (body) => ({
        url: AuthEndpointRoutes.RegisterAdmin,
        method: "POST",
        body
      }),
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
          dispatch(personalApi.util.resetApiState())
        } catch { /* empty */ }
      }
    }),
    registerMechanic: builder.mutation<undefined, TMechanicRegister>({
      query: (body) => ({
        url: AuthEndpointRoutes.RegisterMechanic,
        method: "POST",
        body
      }),
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
          dispatch(personalApi.util.resetApiState())
        } catch { /* empty */ }
      }
    }),
    registerReceptionist: builder.mutation<undefined, TReceptionistRegister>({
      query: (body) => ({
        url: AuthEndpointRoutes.RegisterReceptionist,
        method: "POST",
        body
      }),
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
          dispatch(personalApi.util.resetApiState())
        } catch { /* empty */ }
      }
    }),
    postLogin: builder.mutation<TTokenResponse, TLoginRequest>({
      query: (body) => ({
        url: AuthEndpointRoutes.Login,
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          setTokens(data);
          await dispatch(userApi.endpoints.getMe.initiate());
        // eslint-disable-next-line no-empty
        } catch { }
      },
    }),
    getLogout: builder.mutation<void, void>({
      query: () => ({
        url: AuthEndpointRoutes.Logout,
        method: "GET",
        headers: { authorization: getCookie("refreshToken") },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Logout query failed:", error);
        } finally {
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
          dispatch(userApi.util.resetApiState());
        }
      },
    }),
  }),
});

export const {
  usePostLoginMutation,
  useGetLogoutMutation,
  useRegisterAdminMutation,
  useRegisterMechanicMutation,
  useRegisterReceptionistMutation
} = authApi;
