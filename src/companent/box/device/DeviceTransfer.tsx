import { useUserStore } from "../../../store/store.ts";
import { useGetDeviceUserDateMissOrDepTransferQuery } from "../../../service/rtk/api/deviceApi.ts";
import { useEffect, useState } from "react";
import DeviceTransferDialog from "../../dialog/DeviceTransferDialog.tsx";

const DeviceTransfer = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const currentUser = useUserStore((state) => state.currentUser);
  const { data } = useGetDeviceUserDateMissOrDepTransferQuery(currentUser.depId)
  useEffect(() => {
    setOpenDialog(data?.length != undefined && data?.length > 0)
  }, [data]);

  return (
    <DeviceTransferDialog
      open={openDialog}
      devices={data || []}
      onClose={()=>setOpenDialog(false)}
    />
  );
};

export default DeviceTransfer;