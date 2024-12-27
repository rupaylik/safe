import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { INameId } from "../interfaces/types.ts";

interface Props<T extends string | number > {
  sx?: any
  disabled?: boolean
  error?: boolean
  helperText?: string,
  label?: string
  value?: number | string
  items?: INameId<T>[]
  setValue: (value?: T) => void,
  withoutNone?: boolean
}

export const SelectorINameId = <T extends string | number,>({ sx, label, value, setValue, items, error, helperText, disabled, withoutNone}: Props<T>) => {
  const selectedValue = items
    && items.find(item => item.id == value)?.name

  const onChange = ({ target: { value } }: SelectChangeEvent<string | number>) => {
    setValue(value ? value as T : undefined);
  };

  return (<>
      {items && items.length > 0 &&
        <FormControl sx={{ minWidth: 100, ...sx }} size="small" error={!disabled && error} fullWidth>
          {disabled != true
            ? <>
              <InputLabel>{label}</InputLabel>
              <Select
                <number | string>
                value={value || ''}
                label={label}
                onChange={onChange}
              >
                {!withoutNone &&
                  <MenuItem value={undefined}>{'None'}</MenuItem>
                }
                {items?.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>{name}</MenuItem>
                ))}
              </Select>
              {helperText && <FormHelperText>{helperText}</FormHelperText>}
            </>
            : <TextField
              fullWidth
              disabled={disabled}
              sx={{ flexGrow: 1 }}
              label={label}
              value={selectedValue || ''}
              size="small"
              slotProps={{
                inputLabel:{shrink: true }
              }}
            />
          }
        </FormControl>
      }
    </>
  );
};