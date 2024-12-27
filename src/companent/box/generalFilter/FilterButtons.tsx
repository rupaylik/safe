import { IconButton, Stack, Tooltip } from "@mui/material";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import useSourceText from "../../../hooks/useSourceText.ts";
import { IGeneralFilter } from "../../../interfaces/request.ts";
import { PropsWithChildren } from "react";
import { initialGeneralFilter } from "../../../constants/initialObj.ts";

interface Props extends PropsWithChildren {
  filter: IGeneralFilter
  inventory: boolean,
  onSetInventoryMode: (mode: boolean) => void
  saveInventory: () => void
  selectAllAvailableForInventory: (filter: IGeneralFilter) => void
  onFilter: (filter?: IGeneralFilter | undefined) => void
}

const FilterButtons = ({
                         filter,
                         inventory,
                         onFilter,
                         onSetInventoryMode,
                         saveInventory,
                         selectAllAvailableForInventory,
                         children
                       }: Props) => {
  const label = useSourceText().equipment;
  const isFilter = Object.keys(filter)
    // @ts-ignore
    .filter(key => key != 'pageSize' && (key != 'page' || (key == 'page' && filter[key] != 0)))
    // @ts-ignore
    .filter(key => filter[key] != undefined && filter[key] != "")
  const isFilterEmpty = isFilter.length != 0
  const filterReset = () => {
    onFilter(initialGeneralFilter)
  }

  return (< >
    <Stack sx={{ minWidth: '100px' }} justifyContent={"center"}>
      <Stack direction={"row"} justifyContent={"center"}>
        <Tooltip title={label.filterReset}>
          <IconButton size={"large"} onClick={filterReset} sx={{ p: 1 }}>
            <FilterAltOffIcon fontSize={'large'} color={isFilterEmpty ? 'error' : 'action'}/>
          </IconButton>
        </Tooltip>
        {children}
      </Stack>
      {filter.deleted != true &&
        <Stack alignItems={"center"}>
          <Tooltip title={label.inventory}>
            <IconButton size={"large"} onClick={() => onSetInventoryMode(!inventory)} sx={{ p: 1 }}>
              <AssignmentIcon fontSize={'large'} color={inventory ? 'error' : 'action'}/>
            </IconButton>
          </Tooltip>

        </Stack>
      }
    </Stack>
    {inventory &&
      <Stack spacing={1} direction={"row"} sx={{ flexGrow: 1 }}>
        <Tooltip title={label.selectAllAvailable}>
          <IconButton onClick={() => selectAllAvailableForInventory(filter)}>
            <DoneAllIcon fontSize={'large'}/>
          </IconButton>
        </Tooltip>
        <Tooltip title={label.saveInventory}>
          <IconButton onClick={() => saveInventory()}>
            <AssignmentTurnedInIcon fontSize={'large'}/>
          </IconButton>
        </Tooltip>
        <Tooltip title={label.cancelInventory}>
          <IconButton onClick={() => onSetInventoryMode(false)}>
            <HighlightOffIcon fontSize={'large'}/>
          </IconButton>
        </Tooltip>
      </Stack>
    }
  </>)
};

export default FilterButtons;