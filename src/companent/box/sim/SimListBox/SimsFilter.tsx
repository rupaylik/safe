import { DraftFunction, Updater, useImmer } from "use-immer";
import { ISimFilterRequest } from "../../../../interfaces/request.ts";
import useSourceText from "../../../../hooks/useSourceText.ts";
import { ChangeEvent, useState } from "react";
import YesNoDialog from "../../../dialog/YesNoDialog.tsx";
import { Checkbox, FormControlLabel, Stack, TextField } from "@mui/material";
import GeneralFieldFilter from "../../generalFilter/GeneralFieldFilter.tsx";
import FilterButtons from "../../generalFilter/FilterButtons.tsx";
import TypeSelector from "../../selector/TypeSelector.tsx";

interface Props {
  filter: ISimFilterRequest
  setFilter: Updater<ISimFilterRequest>
  inventory: boolean
  inventoryIds: number[]
  setInventory: (inventory: boolean) => void
  saveInventory: () => void
  selectAllAvailableForInventory: (filter: ISimFilterRequest) => void
}

const SimsFilter = ({
                      filter,
                      setFilter,
                      inventory,
                      inventoryIds,
                      setInventory,
                      saveInventory,
                      selectAllAvailableForInventory
                    }: Props) => {
  const label = { ...useSourceText().sim, ...useSourceText().equipment };
  const [openInventoryDialog, setOpenInventoryDialog] = useState(false)
  const [filterBuffer, setFilterBuffer] = useImmer<ISimFilterRequest | undefined>(undefined)

  const handleSetInventoryMode = (mode: boolean, filter?: ISimFilterRequest | undefined | DraftFunction<ISimFilterRequest>) => {
    if (mode || (!mode && inventoryIds?.length == 0)) {
      setInventory(mode)
      filter && setFilter(filter)
    } else {
      setOpenInventoryDialog(true)
      setFilterBuffer(filter as (ISimFilterRequest | undefined))
    }
  }

  const handleYesDialog = () => {
    setInventory(false)
    setOpenInventoryDialog(false)
    filterBuffer && setFilter(filterBuffer)
    setFilterBuffer(undefined)
  }

  const handleNoDialog = () => {
    setOpenInventoryDialog(false)
  }

  const handleSetFilter = (filter?: ISimFilterRequest | undefined | DraftFunction<ISimFilterRequest>) => {
    handleSetInventoryMode(false, filter)
  }

  return (
    <Stack direction="row" sx={{ width: '100%' }} flexWrap={"wrap"} useFlexGap justifyContent={"space-between"}
           alignItems={"center"}>
      <YesNoDialog
        open={openInventoryDialog}
        title={label.inventoryExitTitle}
        body={label.inventoryExitBody}
        onYes={handleYesDialog}
        onNo={handleNoDialog}
      />
      <Stack sx={{ width: '90%' }} spacing={2}>
        <Stack direction={"row"} spacing={2} flexWrap={"wrap"} useFlexGap>
          <TypeSelector
            sx={{ width: 220 }}
            typeId={filter.typeId}
            typeEquipmentId={2}
            onChange={handleSetFilter}
          />
          <TextField
            sx={{ width: 270 }}
            label={label.simOrMSISDN}
            value={filter.value ? filter.value : ''}
            size="small"
            onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
              handleSetFilter({ ...filter, value })
            }
          />
          <FormControlLabel
            label={label.provisioning}
            control={
              <Checkbox
                checked={filter.provisioning}
                onChange={({ target: { checked } }) =>
                  handleSetFilter({ ...filter, provisioning: checked })
                }
              />
            }
          />
          <FormControlLabel
            label={label.smsGW}
            control={
              <Checkbox
                checked={filter.smsGW}
                onChange={({ target: { checked } }) =>
                  handleSetFilter({ ...filter, smsGW: checked })
                }
              />
            }
          />
        </Stack>
        <Stack direction={"row"} spacing={2} flexWrap={"wrap"} useFlexGap>
          <GeneralFieldFilter
            filter={filter}
            onFilter={handleSetFilter}
          />
        </Stack>
      </Stack>
      <FilterButtons
        filter={filter}
        onFilter={handleSetFilter}
        onSetInventoryMode={handleSetInventoryMode}
        inventory={inventory}
        saveInventory={saveInventory}
        selectAllAvailableForInventory={selectAllAvailableForInventory}
      />
    </Stack>
  );
};

export default SimsFilter;