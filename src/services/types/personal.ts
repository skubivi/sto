import { ICreatedAt, IId } from "./base";
import { ERoles } from "./user";

export interface IPerson {
    firstName: string;
    lastName: string;
    middleName: string;
    role: ERoles
}

export type TFullPerson = IPerson & IId & ICreatedAt

export interface IGetPersonalResponse {
    data: TFullPerson[]
}

export type TNewPerson = {
    identifier: string
    password: string
} & IPerson