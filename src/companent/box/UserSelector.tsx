import { Autocomplete, TextField } from "@mui/material";
import { IUser } from "../../interfaces/data.ts";
import { AutocompleteRenderInputParams } from "@mui/material/Autocomplete/Autocomplete";

interface Props {
  label: string
  users: IUser[]
  userId?: number
  disabled?: boolean
  getOptionDisabled?:  (user: IUser) => boolean
  setUser: (user: IUser | null) => void
  sx?: any
  error?: boolean
  helperText?: string
}

const UserSelector = ({ label, users, userId, getOptionDisabled, disabled, setUser, sx, error, helperText }: Props) => {
  const value = users
    && users.find(item => item.id == userId) || null

  return (
    <>
      {disabled != true
        ? <Autocomplete
          <IUser>
          sx={{ maxWidth: 300, width: "100%", ...sx }}
          size="small"
          value={value}
          options={users}
          getOptionDisabled={getOptionDisabled}
          getOptionLabel={(option) => option.nameRus || ''}
          onChange={(_event: any, value: IUser | null) => {
            setUser(value)
          }}
          renderInput={(params: AutocompleteRenderInputParams) => {
            const newParams = {
              ...params,
              inputProps: {
                ...params.inputProps,
                value: params.inputProps.value || ''
              }
            }
            return <TextField
              {...newParams}
              error={error}
              helperText={helperText}
              label={label}
            />
          }}
        />
        : <TextField
          fullWidth
          disabled={disabled}
          sx={{ flexGrow: 1 }}
          label={label}
          value={value?.nameRus}
          size="small"
          slotProps={{
            inputLabel: { shrink: true }
          }}
        />
      }
    </>

  );
};

export default UserSelector;