import useSourceText from "../../../hooks/useSourceText.ts";
import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { ILogFilterRequest } from "../../../interfaces/request.ts";
import { useGetLoggingMutation } from "../../../service/rtk/api/logApi.ts";
import { Stack } from "@mui/material";
import LoadingBox from "../../LoadingBox.tsx";
import DataGridCustom from "../../DataGridCustom.tsx";
import { ILog } from "../../../interfaces/data.ts";
import { getLogColumns } from "../../../constants/logConst.tsx";
import LogFilter from "./LogFilter.tsx";

const LogListBox = () => {
  const label = useSourceText().log;

  const [order, setOrder] = useState<string | undefined>('date')
  const [count, setCount] = useState(0)
  const [logList, setLogList] = useState<ILog[]>([])
  const [filter, setFilter] = useImmer({ page: 0, pageSize:20} as ILogFilterRequest)
  const [getLogging, { isLoading }] = useGetLoggingMutation();
  const setOrderBy = (orderBy: string, orderASC: boolean) => {
    setOrder(orderBy)
    setFilter({ ...filter, orderBy, orderASC, page: 0 })
  }

  useEffect(() => {
    (filter.message == undefined || filter.message?.length > 2) &&
    getLogging(filter).unwrap().then(data => {
      setLogList(data?.results || [])
      setCount(data?.count || 0)
    })
  }, [filter]);

  return (
    <Stack
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={1}
    >
      {isLoading && <LoadingBox/>}
      <LogFilter filter={filter} setFilter={setFilter}/>
      <DataGridCustom
        rows={logList}
        rowCount={count}
        columns={getLogColumns(label)}
        paginationModel={filter}
        onPaginationModelChange={({ page, pageSize })=>setFilter({...filter, page, pageSize})}
        setOrder={setOrderBy}
        orderBy={order}
        orderASC={filter.orderASC}
      />
    </Stack>
  );
};

export default LogListBox;