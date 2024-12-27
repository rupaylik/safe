import { ICurrentUser } from "./data.ts";
import { IDeviceFilterRequest, ISimFilterRequest } from "./request.ts";


export interface IUserState {
  currentUser: ICurrentUser,
  deviceFilter: IDeviceFilterRequest,
  simFilter: ISimFilterRequest,
  loading: boolean
  isDarkMode: boolean
}

export interface IDecodedToken {
  id: number
  displayName: string;
  login: string;
  depId?: string
  roles: [{ authority: string }];
}