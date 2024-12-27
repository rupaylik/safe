import { Box, Chip, FormControl, InputLabel, OutlinedInput, Select } from "@mui/material";
import { useEffect, useState } from "react";
import DepCheckboxList from "./DepCheckboxList.tsx";
import { IDep } from "../../../../interfaces/data.ts";

type Props = {
  label?: string
  deps?: IDep[],
  selectedDepIds: string[] | undefined
  setSelectedDepIds: (depIds: string[]) => void
};
const DepsSelector = ({ deps, selectedDepIds, setSelectedDepIds, label }: Props) => {
  const [selectedDeps, setSelectedDeps] = useState<IDep[]>([])

  const findDepById = (id: string, deps: IDep[] | undefined) => {
    let dep: IDep | undefined = undefined
    dep = deps && deps?.find(d => d.id == id)
    if (dep) return dep

    deps?.forEach(d => {
      if (dep) return
      dep = findDepById(id, d?.children)
    })

    return dep;
  }

  useEffect(() => {
    const buffDep: IDep[] = [];
    selectedDepIds?.forEach(id => {
      const dep = findDepById(id, deps)
      dep && buffDep.push(dep)
    })
    setSelectedDeps(buffDep)
  }, [selectedDepIds, deps]);

  if (!deps || deps?.length <= 0) {
    return (<></>)
  }

  return (
    <FormControl   size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        variant={'standard'}
        value={selectedDeps}
        input={<OutlinedInput label={label}/>}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, maxHeight: 70, overflow: 'auto' }}>
            {selected.map((r) => (
              <Chip key={r?.id} label={r?.name}/>
            ))}
          </Box>
        )}
      >
        <DepCheckboxList deps={deps} selectedDepIds={selectedDepIds} setSelectedDepIds={setSelectedDepIds}/>
      </Select>
    </FormControl>
  );
};

export default DepsSelector;