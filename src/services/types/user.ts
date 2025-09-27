export enum ERoles {
  Mechanic = 'MECH',
  Admin = 'ADMIN',
  Receptionist = 'RECEP',
  FullAdmin = 'FULL ADMIN'
}

export enum ERolesWithAll {
  All = 'ALL',
  Mechanic = 'MECH',
  Admin = 'ADMIN',
  Receptionist = 'RECEP',
  FullAdmin = 'FULL ADMIN'
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
