export enum ERoles {
  Mechanic = 'MECHANIC',
  Admin = 'ADMIN',
  Receptionist = 'RECEIVER',
  FullAdmin = 'FULL_ADMIN'
}

export enum ERolesWithAll {
  All = 'ALL',
  Mechanic = 'MECH',
  Admin = 'ADMIN',
  Receptionist = 'RECEP',
  FullAdmin = 'FULL_ADMIN'
}

export interface IUserResponse {
  id: number;
  role: ERoles
}

export interface IPersonal {
  firstName: string
  lastName: string
  middleName: string
}

export interface IUser {
  id: number
  userId: number
}
