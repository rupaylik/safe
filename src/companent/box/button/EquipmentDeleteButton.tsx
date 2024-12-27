import CustomButton from "./CustomButton.tsx";
import { hasAccessByPermissions } from "../../../util/authUtil.ts";
import useSourceText from "../../../hooks/useSourceText.ts";
import { useState } from "react";
import DeleteDialog from "../../dialog/DeleteDialog.tsx";
import { IEquipment } from "../../../interfaces/data.ts";
import { useUserStore } from "../../../store/store.ts";

interface Props {
  title: string,
  equipment: IEquipment,
  onDelete: (id: number, comment: string) => void
}

const EquipmentDeleteButton = ({ title, onDelete, equipment }: Props) => {
  const label = { ...useSourceText().device, ...useSourceText().equipment };
  const [openDialog, setOpenDialog] = useState(false)
  const currentUser = useUserStore((state) => state.currentUser);

  const canDelete = hasAccessByPermissions(
    currentUser,
    ['DEVICE:DElETE', 'DEVICE:DEP_MANAGER_DElETE'],
    {
      depId: equipment?.userDepId ? equipment.userDepId : equipment?.safeDepId
    }
  ) && equipment.dataDelete == undefined

  const handleDelete = async (comment?: string) => {
    if (equipment.id && comment) {
      onDelete(equipment.id, comment)
    }
  }

  return (
    < >
      {openDialog &&
        <DeleteDialog
          title={title}
          open={openDialog}
          onYes={handleDelete}
          onNo={() => setOpenDialog(false)}
        />}
      {canDelete && equipment.id &&
        <CustomButton
          variant="outlined"
          title={label.delete}
          onClick={() => setOpenDialog(true)}
        />
      }
    </ >
  );
};

export default EquipmentDeleteButton;