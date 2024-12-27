import { Box, FormControl, InputLabel, MenuItem, Select, useTheme } from "@mui/material";
import { DataGrid, GridRowClassNameParams, GridRowParams } from "@mui/x-data-grid";
import { GridPaginationModel } from "@mui/x-data-grid/models/gridPaginationProps";
import { DataGridProps } from "@mui/x-data-grid/models/props/DataGridProps";
import useSourceText from "../hooks/useSourceText.ts";
import { Dictionary } from "../interfaces/types.ts";

interface Props extends DataGridProps {
  orderBy?: string,
  orderASC?: boolean,
  setOrder?: (value: string, valueASC: boolean) => void,
  columOrders?: Dictionary<any>
  showOrderSelector?: boolean,
  paginationModel?: GridPaginationModel,
  setRowDisable?: (params: GridRowParams<any>) => boolean,
  labels?: any,
}

const DataGridCustom = (props: Props) => {
  const {
    orderBy,
    orderASC,
    setOrder,
    paginationModel,
    setRowDisable,
    labels,
    columOrders,
    showOrderSelector
  } = props
  const label = { ...labels, ...useSourceText() };
  const theme = useTheme<any>();
  const changeOrder = (value: string) => {
    const sortable = props.columns.find(c => c.field == value)?.sortable;
    if (sortable != true) {
      return
    }
    setOrder && setOrder(value,
      orderBy != undefined && orderBy == value
        ? !orderASC
        : true
    )
  };

  const onRowClick = (params: GridRowParams<any>, event: any, details: any) => {
    if ((setRowDisable == undefined || !setRowDisable(params)) && props.onRowClick != undefined) {
      props.onRowClick(params, event, details)
    }
  }

  const getRowClassName = (params: GridRowClassNameParams<any>) => {
    return (props.getRowClassName != undefined ? props.getRowClassName(params) : '') +
      (setRowDisable != undefined && setRowDisable(params) ? 'Mui-disabled' : '') +
      (params.indexRelativeToCurrentPage % 2 === 0 ? "Mui-odd" : "Mui-even")
  }

  return (
    <>
      {columOrders != undefined && showOrderSelector == true &&
        <FormControl sx={{ mb: 1, width: 220 }} size="small">
          <InputLabel>{label.orderBy}</InputLabel>
          <Select
            value={orderBy}
            label={label.orderBy}
            onChange={({ target: { value } }) => changeOrder(value)}
          >
            <MenuItem value=""> <em>None</em> </MenuItem>
            {Object.keys(columOrders).map((key: string) => {
              const { value, getName } = columOrders[key]
              return <MenuItem key={`order_${value}`} value={value}>{getName(label)}</MenuItem>
            })}
          </Select>
        </FormControl>
      }
      <Box flexGrow={1} width={'100%'}>
        <DataGrid
          sx={{
            '& .MuiDataGrid-row.Mui-even': {
              backgroundColor: theme.palette.background.mainMenuSearch
            }
          }}
          rowHeight={30}
          getRowClassName={getRowClassName}
          pageSizeOptions={paginationModel ? [paginationModel.pageSize] : undefined}
          onRowClick={onRowClick}
          onColumnHeaderClick={({ field }) => changeOrder(field)}
          paginationModel={paginationModel}
          disableColumnMenu
          paginationMode="server"
          {...props}
        />
      </Box>
    </>
  );
};

export default DataGridCustom;