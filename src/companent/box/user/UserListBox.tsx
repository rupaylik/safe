import { useGetRoleAllQuery, useGetUserCountsQuery, useSaveUserMutation } from "../../../service/rtk/api/userApi.ts";
import { Box } from "@mui/material";
import useSourceText from "../../../hooks/useSourceText.ts";
import { IUser } from "../../../interfaces/data.ts";
import LoadingBox from "../../LoadingBox.tsx";
import { useState } from "react";
import { getUserColumns } from "../../../constants/userConst.tsx";
import DataGridCustom from "../../DataGridCustom.tsx";

const UserListBox = () => {
  const label = { ...useSourceText().user, ...useSourceText() };
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20
  });
  const [saveUser, { isLoading }] = useSaveUserMutation()
  const { data, isFetching } = useGetUserCountsQuery()
  const { data: roles } = useGetRoleAllQuery()
  const setUserRole = async (user: IUser, roleId?: number) => {
    roleId && await saveUser({ ...user, roleId }).unwrap()
  }

  return (
    <Box flexGrow={1} width={'100%'}>
      {(isLoading || isFetching) && <LoadingBox/>}
      <DataGridCustom
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        columns={getUserColumns(label, roles, setUserRole)}
        rows={data}
        rowCount={data?.length || 0}
        rowHeight={50}
        disableColumnMenu
      />
    </Box>
  );
};

export default UserListBox;