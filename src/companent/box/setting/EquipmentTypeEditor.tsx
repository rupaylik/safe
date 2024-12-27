import useSourceText from "../../../hooks/useSourceText.ts";
import LoadingBox from "../../LoadingBox.tsx";
import EquipmentParamEdit from "./EquipmentParamEdit.tsx";
import { SelectorINameId } from "../../SelectorINameId.tsx";
import { useState } from "react";
import { EquipmentTypes } from "../../../constants/enums.ts";
import { INameId } from "../../../interfaces/types.ts";
import { useGetTypesQuery, useSaveTypeMutation } from "../../../service/rtk/api/equipmentApi.ts";

const EquipmentTypeEditor = () => {
  const labels = useSourceText();
  const [typeEquipment, setTypeEquipment] = useState(1)
  const { data: types, isFetching } = useGetTypesQuery(typeEquipment)
  const [saveType]=useSaveTypeMutation()
  const equipmentTypesNameId: INameId<number>[] | undefined = Object.values(EquipmentTypes).map((value, index) => ({
    id: index + 1,
    name: value
  } as INameId<number> ))

  return (
    <>
      {isFetching && <LoadingBox/>}
      <EquipmentParamEdit
        title={labels.EquipmentTypesEdit}
        label={labels.TypeName}
        params={types}
        saveParam={saveType}
      >
        <SelectorINameId
          withoutNone={true}
          label={labels.EquipmentTypesEdit}
          value={typeEquipment}
          items={equipmentTypesNameId}
          setValue={(id) => {
            id && setTypeEquipment(id)
          }}
        />
      </EquipmentParamEdit>
    </>
  );
};

export default EquipmentTypeEditor;