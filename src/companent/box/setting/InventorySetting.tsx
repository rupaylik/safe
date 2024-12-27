import { useStartInventoryDeviceMutation } from "../../../service/rtk/api/deviceApi.ts";
import { Stack, Typography } from "@mui/material";
import useSourceText from "../../../hooks/useSourceText.ts";
import { useState } from "react";
import CustomButton from "../button/CustomButton.tsx";
import { useGetDepsAllQuery } from "../../../service/rtk/api/userApi.ts";
import DepsSelector from "./DepsSelector";
import { IDep } from "../../../interfaces/data.ts";
import LoadingBox from "../../LoadingBox.tsx";
import { SelectorINameId } from "../../SelectorINameId.tsx";
import { EquipmentTypes } from "../../../constants/enums.ts";
import { INameId } from "../../../interfaces/types.ts";
import { useStartInventorySimMutation } from "../../../service/rtk/api/simApi.ts";
import { toast } from "react-toastify";
import { useUserStore } from "../../../store/store.ts";

const InventorySetting = () => {
  const label = useSourceText();
  const currentUser = useUserStore((state) => state.currentUser);
  const [typeEquipment, setTypeEquipment] = useState(1)
  const [startInventoryDevice, { isLoading: isLoadingDevice }] = useStartInventoryDeviceMutation();
  const [startInventorySim, { isLoading: isLoadingSim }] = useStartInventorySimMutation();
  const startInventory = typeEquipment == 1 ? startInventoryDevice : startInventorySim;

  const equipmentTypesNameId = Object.values(EquipmentTypes).map((value, index) => ({
    id: index + 1,
    name: value
  } as INameId<number>))

  const [depIds, setDepIds] = useState<string[]>([])
  const { data } = useGetDepsAllQuery()
  const deps: IDep[] = [];
  data?.filter(d => currentUser.permissions?.includes('P_FULL_ADMIN') || (currentUser?.depId && d.id.includes(currentUser?.depId)))
    .forEach(dep => {
      if (!deps.find(d => dep.id.includes(d.id))) {
        let newDep = {
          ...dep,
          children: data.filter(d => d.id.includes(dep.id) && d.id != dep.id)
        }
        deps.push(newDep)
      }
    })
  const handleStartInventory = () => {
    startInventory(depIds)
      .then(() => {
        setDepIds([])
        toast.info(label.InventoryStarted);
      })
  }

  return (
    <Stack spacing={2} sx={{ maxWidth: '500px', width: '100%' }}>
      {(isLoadingDevice || isLoadingSim) && <LoadingBox/>}
      <Typography variant="h6">
        {label.startInventoryTitle}
      </Typography>
      <SelectorINameId
        withoutNone={true}
        label={label.EquipmentTypesEdit}
        value={typeEquipment}
        items={equipmentTypesNameId}
        setValue={(id) => {
          id && setTypeEquipment(id)
        }}
      />
      <DepsSelector
        label={label.departments}
        deps={deps}
        selectedDepIds={depIds}
        setSelectedDepIds={(depIds) => setDepIds(depIds)}
      />
      <CustomButton onClick={handleStartInventory}>
        {label.startInventory}
      </CustomButton>
    </Stack>
  );
};

export default InventorySetting;