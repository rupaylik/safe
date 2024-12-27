import { GridCellParams, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { IEquipment } from "../interfaces/data.ts";
import dayjs from "dayjs";
import { FlagsInventory } from "./enums.ts";
import { dateViewFormat } from "./simConst.tsx";
import useSourceText from "../hooks/useSourceText.ts";
import { IconButton, Tooltip } from "@mui/material";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import { useHasAccessByPermissions } from "../hooks/useHasAccessByPermissions.ts";

export const getEquipmentColumns = (deleted: boolean, handleAgreement: (id: number) => void) => {
  const label = useSourceText().equipment
  const isAdmin = useHasAccessByPermissions()

  let columns: GridColDef[] = [
    {
      field: 'userId', headerName: `${label.owner}`, width: 130, sortable: true,
      valueGetter: (_value: any, row: IEquipment) => {
        return row.temporaryUse == null
          ? row.userId ? row.userNameRus : row.safeName
          : label.temporaryUse
      }
    },
    { field: 'note', headerName: `${label.note}`, flex: 1, sortable: false },
    { field: 'changerNameRus', headerName: `${label.changer}`, width: 120, sortable: true },
  ]

  if (deleted) {
    columns = [...columns,
      { field: 'deleteComment', headerName: `${label.deleteComment}`, flex: 1, sortable: false }
    ]
    if (isAdmin) {
      columns = [...columns,
        {
          field: 'agreementDelete', headerName: `${label.agreed}`, width: 100, sortable: false, align: "center",
          renderCell: (params: GridRenderCellParams<IEquipment>) => {
            return params.value != null
              ? params.value
              : <Tooltip title={label.agreementDelete}>
                <IconButton onClick={() => params.row.id && handleAgreement(params.row.id)}>
                  <AutoDeleteIcon fontSize={'medium'}/>
                </IconButton>
              </Tooltip>
          },
        }
      ]
    }
  } else {
    columns = [...columns,
      { field: 'dateInventory', headerName: `${label.dateInventory}`, sortable: false },
      {
        field: 'startInventory', headerName: `${label.inventory}`, width: 70, sortable: true,
        cellClassName: (params: GridCellParams<IEquipment>) => {
          return params.value == FlagsInventory.Successful
            ? 'inventory_successful'
            : '';
        },
        valueGetter: (_value: any, row: IEquipment) => {
          const startInventory = dayjs(row.startInventory, dateViewFormat);
          const dateInventory = dayjs(row.dateInventory, dateViewFormat);
          return (row.dateInventory != null && (startInventory.isBefore(dateInventory)
            || startInventory.isSame(dateInventory)))
          || (row.startInventory == null && row.dateInventory != null)
            ? FlagsInventory.Successful
            : FlagsInventory.NotPassed
        }
      },
    ]
  }

  return columns
}