import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { IDep } from "../../../../interfaces/data.ts";


type Props = {
  dep: IDep,
  checkedDepIds?: string[],
  onChange: (dep: IDep, checked: boolean) => void
};

export const DepCheckbox = ({ dep, checkedDepIds, onChange }: Props) => {
  const checked = (dep: IDep): boolean => {
    return dep.children && dep.children.length > 0
      ? dep.children.every(c => checked(c)) || checkedDepIds && checkedDepIds?.find(id => id == dep.id) != undefined || false
      : checkedDepIds && checkedDepIds?.find(id => id == dep.id) != undefined || false
  }

  const indeterminateChildren = (dep: IDep): boolean => {
    return dep.children && dep.children.length > 0
      ? (dep.children.some(c => checked(c) || indeterminateChildren(c)) &&
        !dep.children.every(c => checked(c)))
      : checkedDepIds && checkedDepIds?.find(id => id == dep.id) != undefined || false;
  }

  const indeterminate = (dep: IDep): boolean => {
    return dep.children && dep.children.length > 0
      ? indeterminateChildren(dep)
      : false
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label={dep.name}
        control={
          <Checkbox
            checked={checked(dep)}
            indeterminate={indeterminate(dep)}
            onChange={({ target: { checked } }) => onChange(dep, checked)}
          />
        }
      />
      {dep.children && dep.children.length > 0 &&
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2 }}>
          {dep.children.map((children, index) => (
            <DepCheckbox key={index} dep={children} checkedDepIds={checkedDepIds} onChange={onChange}/>
          ))}
        </Box>
      }
    </Box>
  );
};