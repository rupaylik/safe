import { DepCheckbox } from "./DepCheckbox.tsx";
import { IDep } from "../../../../interfaces/data.ts";

interface Props {
  deps?: IDep[],
  selectedDepIds?: string[],
  setSelectedDepIds: (depIds: string[]) => void
}

const DepCheckboxList = ({ deps, selectedDepIds, setSelectedDepIds }: Props) => {
  const getALllChildrenId = (children: IDep[] | undefined): string[] => {
    let result: string[] = [];

    if (children != undefined) {
      children.forEach(c => {
        result = [...result, c.id.toString(), ...getALllChildrenId(c.children)]
      })
    }

    return result
  }

  const onChange = (dep: IDep, checked: boolean) => {
    let value;

    if (dep.children && dep.children.length > 0) {
      value = checked
        ? selectedDepIds && [...selectedDepIds.filter(id => id.indexOf(dep.id.toString()) == -1), dep.id,
        ...getALllChildrenId(dep.children)]
        : selectedDepIds && selectedDepIds?.filter(id => id.indexOf(dep.id.toString()) == -1)
    } else {
      value = checked
        ? selectedDepIds && [...selectedDepIds.filter(id => id != dep.id), dep.id]
        : selectedDepIds &&  selectedDepIds?.filter(id => id != dep.id.toString())
    }

    setSelectedDepIds(value ? value : [])
  };

  return (<>
    {deps?.map((dep, index) => (
      <DepCheckbox key={index} dep={dep} checkedDepIds={selectedDepIds} onChange={onChange}/>
    ))}
  </>);
};

export default DepCheckboxList;