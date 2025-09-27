import { IId } from "./base";

export interface IFilial {
  title: string;
  address: string
}

export type TFilialWithId = IFilial & IId

export interface IGetFilialsResponse {
  data: TFilialWithId[]
}