import { useUserStore } from "../store/store.ts";
import { hasAccessByPermissions } from "../util/authUtil.ts";
import { IPermissionProp } from "../interfaces/types.ts";
import { useMemo } from "react";

export const useHasAccessByPermissions = (permissions?: string[], data?: IPermissionProp) => {
  const currentUser = useUserStore((state) => state.currentUser);
  const hasAccess = currentUser && useMemo(() => hasAccessByPermissions(currentUser, permissions, data), [permissions, data])
  return hasAccess
}