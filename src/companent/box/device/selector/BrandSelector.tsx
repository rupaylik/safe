import useSourceText from "../../../../hooks/useSourceText.ts";
import { SelectorINameId } from "../../../SelectorINameId.tsx";
import { useGetBrandsQuery } from "../../../../service/rtk/api/deviceFieldApi.ts";
import { Updater } from "use-immer";
import { ErrorProps } from "../../../../interfaces/props.ts";

interface Props<T extends { brandId?: number }> extends ErrorProps {
  brandId?: number
  onChange: Updater<T>,
  sx?: any
  disabled?: boolean
}

const BrandSelector = <T extends { brandId?: number }, >({ brandId, onChange, sx, disabled, error, helperText }: Props<T>) => {
  const label = useSourceText().device
  const { data: brands } = useGetBrandsQuery()
  const handleChange = (value?: number) => {
    onChange((draft) => {
      if (draft) {
        draft.brandId = value;
      }
    })
  }

  return (
    <SelectorINameId
      sx={{ ...sx, width: 130 }}
      label={label.brand}
      value={brandId}
      items={brands}
      setValue={handleChange}
      disabled={disabled}
      error={error}
      helperText={helperText}
    />
  );
};

export default BrandSelector;