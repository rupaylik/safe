import { IEquipment } from "../../../interfaces/data.ts";
import CustomButton from "./CustomButton.tsx";
import useSourceText from "../../../hooks/useSourceText.ts";

interface Props {
  equipment: IEquipment,
  onAgreement: (id: number) => void
}

const AgreementDeleteButton = ({ equipment, onAgreement }: Props) => {
  const label = useSourceText().equipment

  return (
    < >
      {equipment.dataDelete != null &&
        (equipment.agreementDelete == null
            ? <CustomButton
              title={label.agreementDelete}
              onClick={() => equipment.id && onAgreement(equipment.id)}
            />
            : <p>
              {`${label.agreedDelete}: ${equipment.agreementDelete}`}
            </p>
        )
      }
    </ >
  );
};

export default AgreementDeleteButton;