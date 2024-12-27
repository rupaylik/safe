import { ICurrentUser } from "../interfaces/data.ts";
import { IUserState } from "../interfaces/state.ts";
import { initialGeneralFilter } from "../constants/initialObj.ts";

export const initialUserState: IUserState = {
  currentUser: {} as ICurrentUser,
  deviceFilter: initialGeneralFilter,
  simFilter: initialGeneralFilter,
  loading: false,
  isDarkMode: false
}