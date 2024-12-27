import { Autocomplete, TextField } from "@mui/material";
import { FocusEventHandler, SyntheticEvent } from "react";

interface Props {
  sx?: any
  label: string,
  value?: string | null
  setValue: (value?: string) => void
  options?: string[]
  disabled?: boolean
  error?: boolean
  helperText?: string
  onBlur?: FocusEventHandler<HTMLDivElement>;
}

const AutocompleteString = ({ sx, label, value, setValue, options, disabled, error, helperText, onBlur }: Props) => {
  const onChange = (_e: SyntheticEvent<Element, Event>, value?: string | null) => {
    setValue(value != null ? value : undefined)
  }

  return (<>
    {disabled != true
      ? <Autocomplete
        onBlur={onBlur}
        size="small"
        sx={{ maxWidth: 300, width: "100%", ...sx }}
        value={value && value != null ? value : ''}
        options={options || []}
        onChange={onChange}
        onInputChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label || ''}
            error={error}
            helperText={helperText}
          />
        )}
      />
      : <TextField
        fullWidth
        disabled={disabled}
        sx={{ flexGrow: 1 }}
        label={label}
        value={value}
        size="small"
        error={error}
        helperText={helperText}
        slotProps={{
          inputLabel: { shrink: true }
        }}
      />
    }
  </>);
};

export default AutocompleteString;