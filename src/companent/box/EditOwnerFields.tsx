import { TextField } from "@mui/material";
import { IEquipment, ITemporaryUse } from "../../interfaces/data.ts";
import useSourceText from "../../hooks/useSourceText.ts";
import { ChangeEvent } from "react";
import { ValidationError } from "yup";
import UserAndSafeSelector from "./UserAndSafeSelector.tsx";

interface Props<T extends IEquipment> {
  equipment: T
  startEditEquipment?: T,
  setEquipment: (equipment: T) => void
  errors?: ValidationError[]
  canEdit: boolean,
}

const EditOwnerFields = <T extends IEquipment, >({
                                                   equipment,
                                                   startEditEquipment,
                                                   setEquipment,
                                                   errors,
                                                   canEdit
                                                 }: Props<T>) => {
  const label = useSourceText().equipment

  const setTemporaryUseComment = ({ target: { value: comment } }: ChangeEvent<HTMLInputElement>) => {
    if (comment.trim() == "") {
      setEquipment({ ...equipment, temporaryUse: undefined })
      return
    }
    if (equipment.temporaryUse == undefined) {
      setEquipment({
        ...equipment,
        userId: startEditEquipment?.userId,
        safeId: startEditEquipment?.safeId,
        temporaryUse: { comment } as ITemporaryUse
      })
    } else {
      setEquipment({ ...equipment, temporaryUse: { ...equipment.temporaryUse, comment } })
    }
  }

  return (
    <>
      <UserAndSafeSelector
        disabled={equipment.temporaryUse != undefined || !(canEdit)}
        equipment={equipment}
        setEquipment={setEquipment}
        errors={errors}
      />
      {equipment.id &&
        <TextField
          disabled={!(canEdit)}
          multiline
          rows={2}
          label={label.temporaryUse}
          value={equipment.temporaryUse?.comment || ''}
          size="small"
          onChange={setTemporaryUseComment}
          onBlur={() => {
            if (equipment.temporaryUse != undefined) {
              equipment.temporaryUse.comment = equipment.temporaryUse.comment.trim()
              setEquipment({ ...equipment, temporaryUse: equipment.temporaryUse })
            }
          }}
        />
      }
    </>
  );
};

export default EditOwnerFields;