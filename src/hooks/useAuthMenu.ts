import { useEffect, useState } from "react";
import { IMainMenuStateItem, mainMenu } from "../constants/menuConst.ts";
import { getAuthMenu } from "../util/authUtil.ts";
import { useUserStore } from "../store/store.ts";

export default function useAuthMenu( ) {
  const [authMenu, setAuthMenu] = useState<IMainMenuStateItem[]>([]);
  const currentUser = useUserStore((state) => state.currentUser);
  useEffect(() => {
    const authMenu = getAuthMenu( mainMenu, currentUser);
    setAuthMenu(authMenu);
    // eslint-disable-next-line
  }, []);

  return { authMenu };
}
