import useSourceText from "../../../hooks/useSourceText.ts";
import EquipmentParamEdit from "./EquipmentParamEdit.tsx";
import { useGetOsesQuery, useSaveOsMutation } from "../../../service/rtk/api/deviceFieldApi.ts";
import LoadingBox from "../../LoadingBox.tsx";

const OsesEdit = () => {
  const labels = useSourceText();
  const labelDevice = useSourceText().device;
  const { data: oses, isFetching } = useGetOsesQuery()
  const [saveOs] = useSaveOsMutation()

  return (
    <>
      {isFetching && <LoadingBox/>}
      <EquipmentParamEdit
        title={labels.osesEdit}
        label={labelDevice.os}
        params={oses}
        saveParam={saveOs}
      />
    </>
  );
};

export default OsesEdit;