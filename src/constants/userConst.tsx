import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { IRole, IUser, IUserCounts } from "../interfaces/data.ts";
import { SelectorINameId } from "../companent/SelectorINameId.tsx";
import { useHasAccessByPermissions } from "../hooks/useHasAccessByPermissions.ts";
import { hasAccessByPermissions } from "../util/authUtil.ts";
import { useUserStore } from "../store/store.ts";

export const getUserColumns = (label: any, roles: IRole[] | undefined, setUserRole: (user: IUser, roleId?: number) => void) => {
  const isAdmin = useHasAccessByPermissions();
  const currentUser = useUserStore((state) => state.currentUser);
  const canEditRile = (item: IUserCounts) => {
    return hasAccessByPermissions(
      currentUser,
      ['USER:DEP_MANAGER_ROLE_EDIT'],
      {
        depId: item?.depId
      }
    ) && (hasAccessByPermissions(currentUser) || item.roleId == 3)
  }

  let columns: GridColDef[] = [
    { field: 'nameRus', headerName: `${label.name}`, width: 300, sortable: true },
    { field: 'depName', headerName: `${label.department}`, flex: 1, sortable: true },
    { field: 'deviceCount', headerName: `${label.deviceCount}`, width: 150, sortable: false },
    { field: 'simCount', headerName: `${label.simCount}`, width: 150, sortable: false },
    {
      field: 'roleId', headerName: `${label.role}`, width: 150, sortable: false,
      renderCell: (params: GridRenderCellParams<IUserCounts>) => {
        const accessedRoles = roles?.filter(r => isAdmin || r.id != 1)
        const can = canEditRile(params.row);
        return can
          ? <SelectorINameId
            withoutNone={true}
            sx={{ flexGrow: 1, my: '0.3rem' }}
            value={params.row.roleId}
            items={accessedRoles || []}
            setValue={(roleId?: number) => setUserRole(params.row, roleId)}
          />
          : roles?.find(r => r.id == params.row.roleId)?.name
      }
    },
  ];

  return columns
}