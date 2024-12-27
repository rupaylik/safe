import { IDevice, ISim } from "../interfaces/data.ts";
import { IGeneralFilter } from "../interfaces/request.ts";

export const initialDevice: IDevice = {
  model: '',
  imei1: '',
  dateInventory: '',
  system: '',
  note: '',
  receiptDate: ''
}
export const initialSim: ISim = {
  simNo: '',
  dateInventory: '',
  note: '',
  receiptDate: '',
  smsGW: false,
  provisioning: false
}

export const initialGeneralFilter: IGeneralFilter={
  page: 0,
  pageSize: 20
}