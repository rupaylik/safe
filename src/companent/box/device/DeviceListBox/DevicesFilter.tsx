import { IDeviceFilterRequest } from "../../../../interfaces/request.ts";
import {
  useGetModelsQuery,
  useGetOsesQuery,
  useGetSnNumberAllQuery
} from "../../../../service/rtk/api/deviceFieldApi.ts";
import { IconButton, Stack, TextField, Tooltip } from "@mui/material";
import AutocompleteString from "../../AutocompleteString.tsx";
import useSourceText from "../../../../hooks/useSourceText.ts";
import { SelectorINameId } from "../../../SelectorINameId.tsx";
import { ChangeEvent, useState } from "react";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import QrScannerDialog from "../../../dialog/QrScannerDialog.tsx";
import YesNoDialog from "../../../dialog/YesNoDialog.tsx";
import { DraftFunction, Updater, useImmer } from "use-immer";
import GeneralFieldFilter from "../../generalFilter/GeneralFieldFilter.tsx";
import FilterButtons from "../../generalFilter/FilterButtons.tsx";
import BrandSelector from "../selector/BrandSelector.tsx";
import TypeSelector from "../../selector/TypeSelector.tsx";
import { initialGeneralFilter } from "../../../../constants/initialObj.ts";

interface Props {
  filter: IDeviceFilterRequest
  setFilter: Updater<IDeviceFilterRequest>
  inventory: boolean
  inventoryIds: number[]
  setInventory: (inventory: boolean) => void
  saveInventory: () => void
  selectAllAvailableForInventory: (filter: IDeviceFilterRequest) => void
}

const DevicesFilter = ({
                         filter,
                         setFilter,
                         inventory,
                         inventoryIds,
                         setInventory,
                         saveInventory,
                         selectAllAvailableForInventory
                       }: Props) => {
  const label = { ...useSourceText().device, ...useSourceText().equipment };
  const [openInventoryDialog, setOpenInventoryDialog] = useState(false)
  const [filterBuffer, setFilterBuffer] = useImmer<IDeviceFilterRequest | undefined>(undefined)
  const [openQRDialog, setOpenQRDialog] = useState(false)
  const { data: models } = useGetModelsQuery()
  const { data: snNumbers = [] } = useGetSnNumberAllQuery()
  const { data: oses } = useGetOsesQuery()

  const handleSetInventoryMode = (mode: boolean, filter?: IDeviceFilterRequest | undefined | DraftFunction<IDeviceFilterRequest>) => {
    if (mode || (!mode && inventoryIds?.length == 0)) {
      setInventory(mode)
      filter && setFilter(filter)
    } else {
      setOpenInventoryDialog(true)
      setFilterBuffer(filter as (IDeviceFilterRequest | undefined))
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

  const handleSetFilter = (filter?: IDeviceFilterRequest | undefined | DraftFunction<IDeviceFilterRequest>) => {
    handleSetInventoryMode(false, filter)
  }

  const setHash = (hash?: string) => {
    handleSetFilter((draft) => {
      if (draft.hashes == undefined) {
        // @ts-ignore
        Object.keys(draft).forEach(key =>draft[key] = undefined)
        draft.pageSize=initialGeneralFilter.pageSize
        draft.page = initialGeneralFilter.page
      }
      draft.hashes = hash ? [...(draft?.hashes || []), hash] : draft?.hashes;
      draft.qrCodeScannerMode = true;
      draft.page = 0;
    })
  }
  const handleORCode = () => {
    setOpenQRDialog(true)
  }

  return (
    <Stack direction="row" sx={{ flexWrap: 'wrap' }} justifyContent={"space-between"}>
      <YesNoDialog
        open={openInventoryDialog}
        title={label.inventoryExitTitle}
        body={label.inventoryExitBody}
        onYes={handleYesDialog}
        onNo={handleNoDialog}
      />
      <QrScannerDialog setHash={setHash} open={openQRDialog} onClose={() => setOpenQRDialog(false)}/>
      <Stack sx={{ width: '92%' }} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <Stack direction={"row"} spacing={2} flexWrap={"wrap"} useFlexGap>
          <TypeSelector
            sx={{ width: 220 }}
            typeId={filter.typeId}
            typeEquipmentId={1}
            onChange={handleSetFilter}
          />
          <BrandSelector brandId={filter.brandId} onChange={handleSetFilter}/>
          <AutocompleteString
            sx={{ width: 200 }}
            label={label.model}
            options={models}
            value={filter.model}
            setValue={(model?: string) => {
              handleSetFilter({ ...filter, model, page: 0 })
            }}
          />
          <SelectorINameId
            sx={{ width: 110 }}
            label={label.os}
            value={filter.osId}
            items={oses}
            setValue={(value?: number) => handleSetFilter({ ...filter, osId: value })}
          />
          <TextField
            sx={{ width: 250 }}
            label={label.imei}
            value={filter.imei ? filter.imei : ''}
            size="small"
            onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
              handleSetFilter({ ...filter, imei: value })
            }
          />
          <AutocompleteString
            sx={{ width: 180 }}
            label={label.snNumber}
            options={snNumbers}
            value={filter.snNumber}
            setValue={(snNumber?: string) => {
              handleSetFilter({ ...filter, snNumber, page: 0 })
            }}
          />
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
      >
        {filter.deleted != true &&
          <Tooltip title={label.scanQr}>
            <IconButton size={"large"} onClick={handleORCode} sx={{ p: 1 }}>
              <QrCodeScannerIcon fontSize={'large'} color={filter.qrCodeScannerMode ? 'error' : 'action'}/>
            </IconButton>
          </Tooltip>
        }
      </FilterButtons>
    </Stack>
  );
};

export default DevicesFilter;