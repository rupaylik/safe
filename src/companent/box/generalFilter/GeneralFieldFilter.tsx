import { SelectorINameId } from "../../SelectorINameId.tsx";
import UserSelector from "../UserSelector.tsx";
import { IUser } from "../../../interfaces/data.ts";
import useSourceText from "../../../hooks/useSourceText.ts";
import { useGetDepsAllQuery, useGetUsersAllOwnersQuery } from "../../../service/rtk/api/userApi.ts";
import { IGeneralFilter } from "../../../interfaces/request.ts";
import { DraftFunction } from "use-immer";
import { FlagsInventory } from "../../../constants/enums.ts";
import { INameId } from "../../../interfaces/types.ts";
import { useGetSafeAllQuery } from "../../../service/rtk/api/safeApi.ts";
import { Checkbox, FormControlLabel } from "@mui/material";

interface Props {
  filter: IGeneralFilter
  onFilter: (filter?: IGeneralFilter | undefined | DraftFunction<IGeneralFilter | undefined>) => void
}

const GeneralFieldFilter = ({ filter, onFilter }: Props) => {
  const label = useSourceText().equipment;
  const { data: deps } = useGetDepsAllQuery()
  const { data: usersData }= useGetUsersAllOwnersQuery()
  const users = usersData?.filter((u) => filter.depId == undefined || (filter.depId != undefined && u.depId?.includes(filter.depId)))
  const { data } = useGetSafeAllQuery()
  const safes = data?.filter(u => !filter.depId || u.depId?.includes(filter.depId))

  const inventoryNameIds = Object.values(FlagsInventory).map((value, index) => ({
    id: index + 1,
    name: value
  } as INameId<number>))

  const setDepId = (depId?: string) => {
    onFilter({ ...filter, depId: depId ? depId : undefined, userId: undefined, safeId: undefined, page: 0 })
  }

  return (
    < >
      <SelectorINameId
        sx={{ width: 220 }}
        label={label.group}
        value={filter.depId}
        items={deps}
        setValue={setDepId}
      />
      <UserSelector
        label={label.owner}
        userId={filter.userId}
        users={users || []}
        setUser={(value: IUser | null) => {
          onFilter({
            ...filter,
            userId: value?.id,
            safeId: undefined,
            page: 0
          })
        }}
      />
      <SelectorINameId
        <number>
        sx={{ width: 150 }}
        label={label.safe}
        value={filter.safeId}
        items={safes}
        setValue={(value) => onFilter({ ...filter, userId: undefined, safeId: value, page: 0  })}
      />
      <SelectorINameId
        <number>
        sx={{ width: 140 }}
        label={label.inventory}
        value={filter.flagInventory == undefined
          ? undefined
          : filter.flagInventory ? 2 : 1
        }
        items={inventoryNameIds}
        setValue={(value) => onFilter({
          ...filter,
          flagInventory: value != undefined ? Boolean(value - 1) : value,
          page: 0
        })}
      />
      <FormControlLabel
        label={label.deleted}
        control={
          <Checkbox
            checked={filter.deleted || false}
            onChange={({ target: { checked } }) =>
              onFilter({ ...filter, deleted: checked, page: 0  })
            }
          />
        }
      />
    </ >
  );
};

export default GeneralFieldFilter;