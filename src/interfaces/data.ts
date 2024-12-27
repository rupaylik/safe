import { INameId } from "./types.ts";

export interface ICurrentUser {
  id: number,
  depId: string,
  token: string,
  name: string,
  login: string,
  permissions: string[]
}

export interface IEquipment {
  id?: number;
  dateInventory?: string;
  startInventory?: string;
  receiptDate: string;
  userId?: number;
  userDepId?: string;
  userNameRus?: string;
  changerId?: number;
  changerNameRus?: string;
  safeId?: number;
  safeDepId?: string;
  safeName?: string
  temporaryUse?: ITemporaryUse;
  typeId?: number;
  typeName?: string
  system?: string;
  note: string
  dataDelete?: string
  deleteComment?: string
  agreementDelete?: string
}

export interface IDevice extends IEquipment {
  brandId?: number;
  brandName?: string;
  model: string;
  imei1: string;
  imei2?: string;
  snNumber?: string;
  displaySize?: number;
  ppi?: number;
  osId?: number;
  osName?: string;
  osVersion?: string
  hash?: string

  [key: string]: any
}

export interface ISim extends IEquipment {
  simNo: string;
  msisdn?: string;
  smsGW: boolean;
  provisioning: boolean;
}

export interface IUser {
  id: number;
  login: string;
  nameRus: string;
  depId: string;
  depName: string;
  dateMiss?: string;
  roleId: number;
  roleName: string;
}

export interface IUserCounts extends IUser {
  deviceCount: number;
  simCount: number;
}

export interface ISafe extends INameId<number> {
  depId: string;
  depName: string;
}

export interface ITemporaryUse {
  id: number | null;
  comment: string;
  dateCreate: Date;
  creatorId?: number;
}

export interface ILog {
  id: number;
  userNameRus?: string;
  date: string;
  level: string;
  message: string;
}

export interface IDep extends INameId<string> {
  children: IDep[]
}

export interface IBrand extends INameId<number> {
}

export interface IType extends INameId<number> {
}

export interface IOS extends INameId<number> {
}

export interface IRole extends INameId<number> {
}