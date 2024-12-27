import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ICurrentUser } from "../interfaces/data.ts";
import { IUserState } from "../interfaces/state.ts";
import { initialUserState } from "../util/InitState.ts";
import { IDeviceFilterRequest, ISimFilterRequest } from "../interfaces/request.ts";
import { immer } from "zustand/middleware/immer";
import { DraftFunction } from "use-immer";

interface UserStore extends IUserState {
  setCurrentUser: (user: ICurrentUser) => void;
  setDeviceFilter: (updaterOrPartial: IDeviceFilterRequest | DraftFunction<IDeviceFilterRequest>) => void;
  setSimFilter: (updaterOrPartial: ISimFilterRequest | DraftFunction<ISimFilterRequest>) => void;
  cleanToken: () => void;
  setDarkMode: (isDarkMode: boolean) => void;
}

export const useUserStore = create<UserStore>()(
  devtools(persist(
    immer((set) => ({
      ...initialUserState,
      setCurrentUser: (user) => set((state) => ({
        currentUser: user,
        deviceFilter: { ...state.deviceFilter, depId: user.depId },
        simFilter: { ...state.simFilter, depId: user.depId }
      })),
      setDeviceFilter: (updaterOrPartial: IDeviceFilterRequest | DraftFunction<IDeviceFilterRequest>) => {
        set((state) => {
          if (typeof updaterOrPartial === 'function') {
            updaterOrPartial(state.deviceFilter);
          } else {
            state.deviceFilter = { ...updaterOrPartial }
          }
        });
      },
      setSimFilter: (updaterOrPartial: ISimFilterRequest | DraftFunction<ISimFilterRequest>) => {
        set((state) => {
          if (typeof updaterOrPartial === 'function') {
            updaterOrPartial(state.simFilter);
          } else {
            state.simFilter = { ...updaterOrPartial }
          }
        });
      },
      cleanToken: () => set((state) => ({
        ...initialUserState,
        isDarkMode: state.isDarkMode,
      })),
      setDarkMode: (isDarkMode) => set({ isDarkMode }),
    })),
    {
      name: "inventory_safe_front", // storage key
    }
  ))
);

