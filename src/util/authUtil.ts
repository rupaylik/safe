import { IMainMenuState, IMainMenuStateItem } from '../constants/menuConst';
import { ICurrentUser } from "../interfaces/data.ts";
import { IPermissionProp } from "../interfaces/types.ts";

export const hasAccessByPermissions = (currentUser: ICurrentUser, permissions?: string[], data?: IPermissionProp): boolean => {
  return currentUser.permissions?.find(p => p == 'P_FULL_ADMIN') != undefined ||
    (permissions != undefined
      && (permissions.length == 0 || (permissions.length > 0 &&
          currentUser.permissions?.find(uPerm =>
            permissions.some(perm => {
              const ownerUser = perm.includes('OWNER_USER_');
              const ownerDep = perm.includes('OWNER_DEP_');
              const managerDep = perm.includes('DEP_MANAGER_');

              const result = uPerm == perm &&
                ((!ownerUser && !managerDep) ||
                  (ownerUser && data?.userId != undefined && currentUser.id == data?.userId) ||
                  ((ownerDep && (data?.depId == undefined || data?.depId?.includes(currentUser.depId)))) ||
                  ((managerDep && (data?.depId == undefined || data?.depId?.includes(currentUser.depId))))
                )

              return result;
            })
          ) != undefined
        )
      )
    );
};

export const hasAnyPermissions = (currentUser: ICurrentUser, permissions: string[]) => {
  return currentUser.permissions.some(up => permissions.some(p => up == p))
}


export const getAuthMenu = (mainMenuState: IMainMenuState, currentUser: ICurrentUser) => {
  const tempData: IMainMenuStateItem[] = [];
  Object.keys(mainMenuState).forEach(key => {
    const isAuthTab = hasAccessByPermissions(currentUser, mainMenuState[key].permissions);
    if (isAuthTab) {
      const data = {
        ...mainMenuState[key], subItems: mainMenuState[key].subItems?.filter(sItem => {
          return hasAccessByPermissions(currentUser, sItem.permissions);
        })
      }
      tempData.push(data);
    }
  })
  return tempData;
};
