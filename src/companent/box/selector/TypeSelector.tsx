import { SelectorINameId } from "../../SelectorINameId.tsx";
import useSourceText from "../../../hooks/useSourceText.ts";
import { Updater } from "use-immer";
import { useGetTypesQuery } from "../../../service/rtk/api/equipmentApi.ts";
import { ErrorProps } from "../../../interfaces/props.ts";

interface Props<T extends { typeId?: number }> extends ErrorProps {
  sx?:any
  disabled?: boolean
  typeId?: number
  typeEquipmentId: number
  onChange: Updater<T>,
}

const TypeSelector = <T extends { typeId?: number }, >({sx, disabled, typeId, typeEquipmentId, onChange, error, helperText }: Props<T>) => {
  const label = useSourceText().equipment
  const { data: types } = useGetTypesQuery(typeEquipmentId)
  const handleChange = (typeId?: number) => {
    onChange(draft => {
      if(draft){
        draft.typeId = typeId;
      }
    })
  }
  return (
    <SelectorINameId
      sx={sx}
      disabled={disabled}
      label={label.type}
      value={typeId}
      items={types}
      setValue={handleChange}
      error={error}
      helperText={helperText}
    />
  );
};

export default TypeSelector;