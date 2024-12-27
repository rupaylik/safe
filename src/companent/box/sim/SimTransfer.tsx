import { useEffect, useState } from "react";
import { useUserStore } from "../../../store/store.ts";
import { useGetSimUserDateMissOrDepTransferQuery } from "../../../service/rtk/api/simApi.ts";
import SimTransferDialog from "../../dialog/SimTransferDialog.tsx";

const SimTransfer = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const currentUser = useUserStore((state) => state.currentUser);
  const { data } = useGetSimUserDateMissOrDepTransferQuery(currentUser.depId)
  useEffect(() => {
    setOpenDialog(data?.length != undefined && data?.length > 0)
  }, [data]);

  return (
    <SimTransferDialog
      open={openDialog}
      sims={data || []}
      onClose={() => setOpenDialog(false)}
    />
  );
};

export default SimTransfer;