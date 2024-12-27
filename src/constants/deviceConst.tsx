import { GridColDef } from "@mui/x-data-grid";
import { getEquipmentColumns } from "./equipmentConst.tsx";
import useSourceText from "../hooks/useSourceText.ts";
import { useAgreementDeleteDeviceMutation } from "../service/rtk/api/deviceApi.ts";

export const dateViewFormat: string = 'DD.MM.YYYY'

export const getDeviceOrderColumn = (field: string) => {
  switch (field) {
    case 'typeName': {
      return 'type.name'
    }
    case 'brandName': {
      return 'brand.name'
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


export const getDeviceColumns = (deleted: boolean) => {
  const label = useSourceText().device
  const [agreementDelete] = useAgreementDeleteDeviceMutation()
  const handleAgreement = async (id: number) => {
    await agreementDelete(id)
  }
  let columns: GridColDef[] = [
    { field: 'typeName', headerName: `${label.typeName}`, width: 80, sortable: true },
    { field: 'brandName', headerName: `${label.brand}`, width: 80, sortable: true },
    { field: 'model', headerName: `${label.model}`, width: 120, sortable: true },
    { field: 'imei1', headerName: `${label.imei1}`, width: 155, sortable: true },
    { field: 'snNumber', headerName: `${label.snNumber}`, width: 120, sortable: true },
  ];

  if (!deleted) {
    columns = [...columns,
      { field: 'displaySize', headerName: `${label.displaySize}`, width: 40, sortable: true },
      { field: 'ppi', headerName: `${label.ppi}`, width: 40, sortable: true },
      { field: 'osName', headerName: `${label.os}`, width: 70, sortable: false },
      { field: 'osVersion', headerName: `${label.osVersion}`, width: 60, sortable: true },
    ]
  }
  const equipmentColumns = getEquipmentColumns(deleted, handleAgreement)

  return [...columns, ...equipmentColumns]
}