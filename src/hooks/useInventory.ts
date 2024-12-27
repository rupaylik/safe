import { useState } from "react";
import { IEquipment } from "../interfaces/data.ts";
import { hasAccessByPermissions } from "../util/authUtil.ts";
import { IDeviceFilterRequest, ISimFilterRequest } from "../interfaces/request.ts";
import { IResponseByFilter } from "../interfaces/response.ts";
import { useUserStore } from "../store/store.ts";

interface Props {
  getEquipmentForInventory: any
  saveInventoryEquipment: any
}

const useInventory = ({ getEquipmentForInventory, saveInventoryEquipment }: Props) => {
  const [inventoryMode, setInventoryMode] = useState(false)
  const currentUser = useUserStore((state) => state.currentUser);
  const [inventoryIds, setInventoryIds] = useState<number[]>([])

  const equipmentCanBeInventory = (equipment: IEquipment) => {
    return inventoryMode &&
      hasAccessByPermissions(currentUser,
        ['DEVICE:DEP_MANAGER_INVENTORY', 'SIM:DEP_MANAGER_INVENTORY'],
        {
          userId: equipment?.userId,
          depId: equipment?.userDepId || equipment?.safeDepId
        })
  }

  const saveInventory = () => {
    saveInventoryEquipment(inventoryIds).then(() => {
      setInventoryMode(false)
      setInventoryIds([])
    })
  }

  const selectAllAvailableForInventory = (filter: IDeviceFilterRequest | ISimFilterRequest) => {
    getEquipmentForInventory(filter)
      .then(({ data }: { data: IResponseByFilter<IEquipment> }) => {
        const ids = data.results.filter(e => equipmentCanBeInventory(e)).map(e => e.id || 0)
        setInventoryIds(ids)
      })
  }

  const setInventoryModeFun = (mode: boolean) => {
    setInventoryMode(mode);
    setInventoryIds([])
  }

  return {
    inventoryMode,
    setInventoryMode: setInventoryModeFun,
    selectAllAvailableForInventory,
    equipmentCanBeInventory,
    saveInventory,
    inventoryIds,
    setInventoryIds
  }
}
export default useInventory