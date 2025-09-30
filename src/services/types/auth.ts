export type TTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export type TLoginRequest = {
  identifier: string;
  password: string;
};

type TBaseRegisterRequest = {
  identity: {
    identifier: string,
    secret: string
  },
  firstname: string,
  lastname: string
  middlename: string
}

export type TAdminRegister = TBaseRegisterRequest & {
  filialId?: string
}

export type TMechanicRegister = TBaseRegisterRequest
export type TReceptionistRegister = TBaseRegisterRequest

export type TChangePassword = {
  prevPassword: string
  newPassword: string
}