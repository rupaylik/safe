import { IDevice, IEquipment } from "../../interfaces/data.ts";
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useTheme } from "@mui/material/styles";
import DeviceEditDialog from "./DeviceEditDialog.tsx";
import DataGridCustom from "../DataGridCustom.tsx";
import { GridRowParams } from "@mui/x-data-grid";
import { getDeviceColumns } from "../../constants/deviceConst.tsx";
import { useState } from "react";
import { initialDevice } from "../../constants/initialObj.ts";
import UserAndSafeSelector from "../box/UserAndSafeSelector.tsx";
import useSourceText from "../../hooks/useSourceText.ts";
import CustomButton from "../box/button/CustomButton.tsx";
import { useSaveDeviceMutation } from "../../service/rtk/api/deviceApi.ts";

interface Props {
  devices: IDevice[],
  open: boolean,
  onClose: () => void
}

const DeviceTransferDialog = ({ devices, open, onClose }: Props) => {
  const theme = useTheme<any>();
  const label = useSourceText().device
  const [device, setDevice] = useState<IDevice>(initialDevice)
  const [openDeviceDialog, setOpenDeviceDialog] = useState(false)
  const [equipment, setEquipment] = useState<IEquipment>({} as IEquipment)

  const [saveDevice] = useSaveDeviceMutation()
  const handleRowDoubleClick = (params: GridRowParams<IDevice>) => {
    setDevice(params.row)
    setOpenDeviceDialog(true)
  }

  const handleTransfer = () => {
    const saveDevices = devices.map(d => ({ ...d, ...equipment }))
    saveDevices.forEach( async (d)=>{
      await saveDevice(d)
    })

    onClose()
  }

  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{
        '& .MuiPaper-root': { background: theme.palette.background.default } //minHeight: '90%',
      }}
      fullWidth
      maxWidth={"lg"}
    >
      <DialogTitle>
        <Stack direction={"row"} alignItems={"start"} justifyContent={"space-between"}>
          <Typography variant="h6">
            {label.deviceTransferTitle}
          </Typography>
          <IconButton onClick={onClose}>
            <ClearIcon fontSize={"large"}/>
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        {openDeviceDialog &&
          <DeviceEditDialog
            open={openDeviceDialog}
            device={device}
            onClose={() => setOpenDeviceDialog(false)}
          />}
        <DataGridCustom
          hideFooter={true}
          rows={devices}
          columns={getDeviceColumns(false)}
          onRowDoubleClick={handleRowDoubleClick}
        />
        <Stack sx={{ mt: 1 }} spacing={1}>
          <Typography variant="h6">
            {label.transferAllTo}
          </Typography>
          <UserAndSafeSelector
            equipment={equipment}
            setEquipment={setEquipment}
          />
          <Box>
            <CustomButton
              title={label.transfer}
              onClick={handleTransfer}
            />
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default DeviceTransferDialog;