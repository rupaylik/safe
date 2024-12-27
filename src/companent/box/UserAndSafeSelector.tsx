import { Stack } from "@mui/material";
import UserSelector from "./UserSelector.tsx";
import { IEquipment, ISafe, IUser } from "../../interfaces/data.ts";
import { getError, hasError } from "../../validations/methods.ts";
import SafeSelector from "./SafeSelector.tsx";
import useSourceText from "../../hooks/useSourceText.ts";
import { useUserStore } from "../../store/store.ts";
import { useHasAccessByPermissions } from "../../hooks/useHasAccessByPermissions.ts";
import { ValidationError } from "yup";
import { useGetUsersAllAccessedQuery } from "../../service/rtk/api/userApi.ts";

interface Props<T extends IEquipment> {
  disabled?: boolean
  equipment: T
  setEquipment: (equipment: T) => void
  errors?: ValidationError[]
}

const UserAndSafeSelector = <T extends IEquipment, >({
                                                       disabled = false,
                                                       equipment,
                                                       setEquipment,
                                                       errors
                                                     }: Props<T>) => {
  const label = useSourceText().equipment
  const currentUser = useUserStore((state) => state.currentUser);
  const isAdmin = useHasAccessByPermissions()
  const { data: users } = useGetUsersAllAccessedQuery()

  const setUser = (user?: IUser | null) => {
    setEquipment({
      ...equipment,
      userId: user?.id,
      userNameRus: user?.nameRus,
      safeId: undefined,
      safeName: undefined,
      temporaryUse: undefined
    })
  }

  const setSafe = (safe?: ISafe) => {
    safe && setEquipment({
      ...equipment,
      safeId: safe.id,
      safeName: safe.name,
      userId: undefined,
      userNameRus: undefined,
      temporaryUse: undefined
    })
  }

  return (
    <Stack direction={"row"} spacing={1}>
      <UserSelector
        disabled={disabled}
        getOptionDisabled={(user)=> user.dateMiss != null}
        users={users?.filter((user: IUser) => isAdmin || user.depId.includes(currentUser.depId)) || []}
        label={label.owner}
        userId={equipment?.userId}
        setUser={setUser}
        error={hasError(`safeId-or-userId`, errors)}
        helperText={getError(`safeId-or-userId`, errors)}
      />
      <SafeSelector
        disabled={disabled}
        filter={(safe: ISafe) => isAdmin || safe.depId.includes(currentUser.depId)}
        label={label.safe}
        id={equipment?.safeId}
        name={equipment?.safeName}
        setSafe={setSafe}
        error={hasError(`safeId-or-userId`, errors)}
        helperText={getError(`safeId-or-userId`, errors)}
      />
    </Stack>
  );
};

export default UserAndSafeSelector;