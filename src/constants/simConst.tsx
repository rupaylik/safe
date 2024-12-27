import { GridColDef } from "@mui/x-data-grid";
import { getEquipmentColumns } from "./equipmentConst.tsx";
import { ISim } from "../interfaces/data.ts";
import useSourceText from "../hooks/useSourceText.ts";
import { useAgreementDeleteSimMutation } from "../service/rtk/api/simApi.ts";

export const dateViewFormat: string = 'DD.MM.YYYY'
export const dateSendFormat: string = 'YYYY-MM-DD'

export const getSimOrderColumn = (field: string) => {
  switch (field) {
    case 'typeName': {
      return 'type.name'
    }
    case 'userId': {
      return 'user.nameRus'
    }
    case 'changerNameRus': {
      return 'changer.nameRus'
    }
    default:
      return field
  }
}

export const getSimColumns = (deleted: boolean) => {
  const label = useSourceText().sim
  const [agreementDelete] = useAgreementDeleteSimMutation()
  const handleAgreement = async (id: number) => {
    await agreementDelete(id)
  }

  let columns: GridColDef[] = [
    { field: 'typeName', headerName: `${label.typeName}`, width: 120, sortable: true },
    { field: 'simNo', headerName: `simNo`, width: 170, sortable: true },
    { field: 'msisdn', headerName: `msisdn`, width: 130, sortable: true },
    {
      field: 'provisioning', headerName: `provisioning`, width: 80, sortable: false,
      valueGetter: (_value: any, row: ISim) => {
        return row.provisioning == true ? 'Да' : 'Нет'
      }
    },
    { field: 'smsGW', headerName: `SMSGW`, width: 80, sortable: false,
      valueGetter: (_value: any, row: ISim) => {
        return row.smsGW == true ? 'Да' : 'Нет'
      }
    },
  ];

  const equipmentColumns = getEquipmentColumns(deleted, handleAgreement)

  return [...columns, ...equipmentColumns]
}