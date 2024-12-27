import { useState } from "react";
import { IDevice } from "../../../../interfaces/data.ts";
import { initialDevice } from "../../../../constants/initialObj.ts";
import { useGetDevicesQuery } from "../../../../service/rtk/api/deviceApi.ts";
import { getDeviceOrderColumn } from "../../../../constants/deviceConst.tsx";
import { GridRowParams } from "@mui/x-data-grid";
import { useUserStore } from "../../../../store/store.ts";
import { hasAnyPermissions } from "../../../../util/authUtil.ts";

const useDeviceList = () => {
  const { currentUser, deviceFilter: filter, setDeviceFilter: setFilter } = useUserStore((state) => state);
  //const currentUser = useUserStore((state) => state.currentUser);
  // const [filter, setFilter] = useImmer({...initialGeneralFilter, depId: currentUser.depId } as IDeviceFilterRequest)
  const [openDialog, setOpenDialog] = useState(false)
  const [device, setDevice] = useState<IDevice>(initialDevice)
  const [order, setOrder] = useState<string | undefined>(undefined)
  const isManger = hasAnyPermissions(currentUser, ['DEVICE:DEP_MANAGER_EDIT'])
  const { data, isFetching } = useGetDevicesQuery(filter);
  const { count, results: devices } = data ? data : { count: 1, results: [] }

  const setOrderBy = (orderBy: string, orderASC: boolean) => {
    setOrder(orderBy)
    setFilter({ ...filter, orderBy: getDeviceOrderColumn(orderBy), orderASC, page: 0 })
  }

  const handleRowDoubleClick = (params: GridRowParams<IDevice>) => {
    setDevice(params.row)
    setOpenDialog(true)
  }

  return {
    isManger,
    count,
    devices,
    device,
    order,
    filter,
    setFilter,
    openDialog,
    setOpenDialog,
    setOrderBy,
    handleRowDoubleClick,
    isFetching
  }
}
export default useDeviceList;