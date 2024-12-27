import { useState } from "react";
import { IDevice, ISim } from "../../../../interfaces/data.ts";
import { initialSim } from "../../../../constants/initialObj.ts";
import useInventory from "../../../../hooks/useInventory.ts";
import { GridRowParams, GridRowSelectionModel } from "@mui/x-data-grid";
import { Stack } from "@mui/material";
import LoadingBox from "../../../LoadingBox.tsx";
import DataGridCustom from "../../../DataGridCustom.tsx";
import {
  useGetSimsForInventoryMutation,
  useGetSimsQuery,
  useSaveInventorySimMutation
} from "../../../../service/rtk/api/simApi.ts";
import SimsFilter from "./SimsFilter.tsx";
import { getSimColumns, getSimOrderColumn } from "../../../../constants/simConst.tsx";
import SimEditDialog from "../../../dialog/SimEditDialog.tsx";
import { useUserStore } from "../../../../store/store.ts";
import SimTransfer from "../SimTransfer.tsx";
import { hasAnyPermissions } from "../../../../util/authUtil.ts";

const SimListBox = () => {

  const { currentUser, simFilter: filter, setSimFilter: setFilter } = useUserStore((state) => state);
  const [openDialog, setOpenDialog] = useState(false)
  const [sim, setSim] = useState<ISim>(initialSim)
  const [order, setOrder] = useState<string | undefined>(undefined)
  const { data, isFetching } = useGetSimsQuery(filter);
  const { count, results: sims } = data ? data : { count: 0, results: [] }
  const [getSimsForInventory, { isLoading }] = useGetSimsForInventoryMutation()
  const [saveInventorySim, { isLoading: inventoryLoading }] = useSaveInventorySimMutation()
  const isManger = hasAnyPermissions(currentUser, ['SIM:DEP_MANAGER_EDIT'])

  const {
    inventoryMode,
    setInventoryMode,
    equipmentCanBeInventory,
    saveInventory,
    inventoryIds,
    setInventoryIds,
    selectAllAvailableForInventory
  } = useInventory({ getEquipmentForInventory: getSimsForInventory, saveInventoryEquipment: saveInventorySim })

  const setOrderBy = (orderBy: string, orderASC: boolean) => {
    setOrder(orderBy)
    setFilter({ ...filter, orderBy: getSimOrderColumn(orderBy), orderASC, page: 0 })
  }

  const handleRowDoubleClick = (params: GridRowParams<ISim>) => {
    setSim(params.row)
    setOpenDialog(true)
  }

  const handleRowSelectionModelChange = (ids: GridRowSelectionModel) => {
    setInventoryIds(ids.map(id => id as number))
  }

  return (
    <Stack
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={1}
    >
      {(isLoading || isFetching || inventoryLoading)
        && <LoadingBox/>
      }
      {isManger &&
        <SimTransfer/>
      }
      <SimEditDialog
        open={openDialog}
        sim={sim}
        onClose={() => setOpenDialog(false)}
      />
      <SimsFilter
        filter={filter}
        setFilter={setFilter}
        inventory={inventoryMode}
        inventoryIds={inventoryIds}
        setInventory={setInventoryMode}
        saveInventory={saveInventory}
        selectAllAvailableForInventory={selectAllAvailableForInventory}
      />
      <DataGridCustom
        keepNonExistentRowsSelected
        checkboxSelection={inventoryMode}
        onRowSelectionModelChange={handleRowSelectionModelChange}
        rowSelectionModel={inventoryIds}
        isRowSelectable={(params: GridRowParams<IDevice>) => equipmentCanBeInventory(params.row)}
        rows={sims}
        rowCount={count}
        columns={getSimColumns(filter.deleted || false)}
        onRowDoubleClick={handleRowDoubleClick}
        paginationModel={filter}
        onPaginationModelChange={({ page, pageSize }) => setFilter({ ...filter, page, pageSize })}
        setOrder={setOrderBy}
        orderBy={order}
        orderASC={filter.orderASC}
      />
    </Stack>
  );
};

export default SimListBox;

