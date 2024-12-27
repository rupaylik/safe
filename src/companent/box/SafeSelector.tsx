import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useGetSafeAllQuery } from "../../service/rtk/api/safeApi.ts";
import { ISafe } from "../../interfaces/data.ts";

interface Props {
  label: string
  id?: number
  name?: string
  disabled?: boolean
  filter?: (safe: ISafe) => boolean
  setSafe: (safe?: ISafe) => void
  sx?: any
  error?: boolean
  helperText?: string
}

const SafeSelector = ({ label, id, name, disabled, filter = () => true, setSafe, sx, error, helperText }: Props) => {
  const { data: safes = [] } = useGetSafeAllQuery()

  const onChange = ({ target: { value } }: SelectChangeEvent<number>) => {
    setSafe(safes.find(s=>s.id == value))
  };

  return (
    <FormControl sx={{ ...sx, m: 1, maxWidth: 300, width: "100%" }} error={error} size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        disabled={disabled}
        value={id || ''}
        label={label}
        renderValue={(id) => {
          const value = safes?.find(u => u.id == id)
          return <> {value ? value.name
            : name}
          </>
        }}
        onChange={onChange}
      >
        <MenuItem value={undefined}>{'None'}</MenuItem>
        {safes?.filter(filter)?.map(({ id, name, depName }) => (
          <MenuItem key={id} value={id}>{`${name} (${depName})`}</MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default SafeSelector;