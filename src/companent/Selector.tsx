import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface Props<T extends string | number> {
  sx?: any
  label: string
  value?: T
  items?: T[]
  setValue: (values?: string | number) => void
}
const Selector = <T extends string | number,>({sx, label, value, setValue, items }: Props<T>) => {
  const onChange = ({ target: { value } }: SelectChangeEvent<string | number | undefined>) => {
    setValue(value);
  };

  return (<>
    {items && items.length > 0 &&
      <FormControl sx={{ width: 280, ...sx }} size="small">
        <InputLabel>{label}</InputLabel>
        <Select
          <T>
          value={value ? value : ''}
          label={label}
          onChange={onChange}
        >
          <MenuItem value={undefined}>{'None'}</MenuItem>
          {items?.map(item => (
            <MenuItem key={item} value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
    }
  </>)
};

export default Selector;