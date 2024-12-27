import {
  useGetDevicesForInventoryMutation,
  useSaveInventoryDeviceMutation
} from "../../../../service/rtk/api/deviceApi.ts";
import { Stack } from "@mui/material";
import DataGridCustom from "../../../DataGridCustom.tsx";
import { GridRowParams, GridRowSelectionModel } from "@mui/x-data-grid";
import DevicesFilter from "./DevicesFilter.tsx";
import { getDeviceColumns } from "../../../../constants/deviceConst.tsx";
import { IDevice } from "../../../../interfaces/data.ts";
import DeviceEditDialog from "../../../dialog/DeviceEditDialog.tsx";
import useInventory from "../../../../hooks/useInventory.ts";
import LoadingBox from "../../../LoadingBox.tsx";
import useDeviceList from "./useDeviceList.ts";
import DeviceTransfer from "../DeviceTransfer.tsx";

const DeviceListBox = () => {
  const {
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
  } = useDeviceList()

  const [getDevicesForInventory, { isLoading: isLoadingDevicesForInventory }] = useGetDevicesForInventoryMutation()
  const [saveInventoryDevice, { isLoading: inventoryLoading }] = useSaveInventoryDeviceMutation()

  const {
    inventoryMode,
    setInventoryMode,
    equipmentCanBeInventory,
    saveInventory,
    inventoryIds,
    setInventoryIds,
    selectAllAvailableForInventory
  } = useInventory({ getEquipmentForInventory: getDevicesForInventory, saveInventoryEquipment: saveInventoryDevice })

  const handleRowSelectionModelChange = (ids: GridRowSelectionModel) => {
    setInventoryIds(ids.map(id => id as number))
  }

  return (
    <Stack
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={1}
    >
      {(isLoadingDevicesForInventory || isFetching || inventoryLoading) && <LoadingBox/>}
      {isManger &&
        <DeviceTransfer/>
      }
      <Stack direction={"row"} spacing={1} justifyContent={"space-between"} sx={{ width: '100%' }}>
        <DevicesFilter
          filter={filter}
          setFilter={setFilter}
          inventory={inventoryMode}
          inventoryIds={inventoryIds}
          setInventory={setInventoryMode}
          saveInventory={saveInventory}
          selectAllAvailableForInventory={selectAllAvailableForInventory}
        />
      </Stack>
      <DeviceEditDialog
        open={openDialog}
        device={device}
        onClose={() => setOpenDialog(false)}
      />
      <DataGridCustom
        keepNonExistentRowsSelected
        checkboxSelection={inventoryMode}
        onRowSelectionModelChange={handleRowSelectionModelChange}
        rowSelectionModel={inventoryIds}
        isRowSelectable={(params: GridRowParams<IDevice>) => equipmentCanBeInventory(params.row)}
        rows={devices}
        rowCount={count}
        columns={getDeviceColumns(filter.deleted || false)}
        onRowDoubleClick={handleRowDoubleClick}
        paginationModel={filter}
        onPaginationModelChange={({ page, pageSize })=>setFilter({...filter, page, pageSize})}
        setOrder={setOrderBy}
        orderBy={order}
        orderASC={filter.orderASC}
      />
    </Stack>
  );
};

export default DeviceListBox;