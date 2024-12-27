import useSourceText from "../../../hooks/useSourceText.ts";
import { useGetBrandsQuery, useSaveBrandMutation } from "../../../service/rtk/api/deviceFieldApi.ts";
import LoadingBox from "../../LoadingBox.tsx";
import EquipmentParamEdit from "./EquipmentParamEdit.tsx";

const BrandEdit = () => {
  const labels = useSourceText();
  const labelDevice = useSourceText().device;
  const { data, isFetching } = useGetBrandsQuery()
  const [saveBrand] = useSaveBrandMutation()

  return (
    <>
      {isFetching && <LoadingBox/>}
      <EquipmentParamEdit
        title={labels.brandsEdit}
        label={labelDevice.brand}
        params={data}
        saveParam={saveBrand}
      />
    </>
  );
};

export default BrandEdit;