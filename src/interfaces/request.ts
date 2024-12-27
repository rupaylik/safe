export interface IRequestLogin {
  username: string;
  password: string;
}

export interface IGeneralFilter {
  depId?: string;
  userId?: number;
  safeId?: number;
  typeId?: number;
  flagInventory?: boolean;
  page: number;
  pageSize: number;
  orderBy?: string;
  orderASC?: boolean;
  forInventory?: boolean;
  deleted?: boolean;
}

export interface IDeviceFilterRequest extends IGeneralFilter {
  model?: string
  imei?: string;
  snNumber?: string
  hashes?: string[];
  displaySize?: number;
  osId?: number;
  ppi?: number;
  brandId?: number;
  qrCodeScannerMode?: boolean;
}

export interface ISimFilterRequest extends IGeneralFilter {
  value?: string;
  provisioning?: boolean;
  smsGW?: boolean;
}
export interface ILogFilterRequest {
  userId?: number;
  message?: string;
  page: number;
  pageSize: number;
  orderBy?: string;
  orderASC?: boolean;
}