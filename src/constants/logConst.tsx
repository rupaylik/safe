import { GridColDef } from "@mui/x-data-grid";

export const getLogColumns = (label: any) => {
  let columns: GridColDef[] = [
    { field: 'date', headerName: `${label.date}`, width: 150, sortable: true },
    { field: 'level', headerName: `${label.level}`, width: 70, sortable: true },
    { field: 'userNameRus', headerName: `${label.user}`, width: 170, sortable: true },
    { field: 'message', headerName: `${label.message}`, flex: 1, minWidth: 500, sortable: false },
  ];

  return columns
}