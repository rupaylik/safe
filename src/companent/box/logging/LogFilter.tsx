import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import UserSelector from "../UserSelector.tsx";
import { IUser } from "../../../interfaces/data.ts";
import { ILogFilterRequest } from "../../../interfaces/request.ts";
import { Updater } from "use-immer";
import useSourceText from "../../../hooks/useSourceText.ts";
import { ChangeEvent } from "react";
import { useGetUsersAllAccessedQuery } from "../../../service/rtk/api/userApi.ts";
import ClearIcon from "@mui/icons-material/Clear";

interface Props {
  filter: ILogFilterRequest
  setFilter: Updater<ILogFilterRequest>
}

const LogFilter = ({ filter, setFilter }: Props) => {
  const label = useSourceText().log;
  const { data: users } = useGetUsersAllAccessedQuery()

  return (
    <Stack sx={{ width: "100%" }} direction={"row"} spacing={2}>
      <UserSelector
        label={label.user}
        users={users || []}
        userId={filter.userId}
        setUser={(value: IUser | null) => {
          setFilter({
            ...filter,
            userId: value?.id,
            page:0
          })
        }}
      />
      <TextField
        fullWidth
        label={label.message}
        value={filter.message || ''}
        size="small"
        onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
          setFilter({ ...filter, message: value || undefined, page:0 })
        }
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                {filter?.message && (
                  <IconButton onClick={() => setFilter({ ...filter, message:  undefined, page:0 })}>
                    <ClearIcon/>
                  </IconButton>
                )}
              </InputAdornment>
            )
          }
        }}
      />
    </Stack>
  );
};

export default LogFilter;