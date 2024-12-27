import EditDeviceBox from "../box/device/EditDeviceBox.tsx";
import { IDevice } from "../../interfaces/data.ts";
import { Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import getSourceText from "../../constants/sourceText.ts";

interface Props {
  open: boolean
  device: IDevice
  onClose: () => void
}

const DeviceEditDialog = ({ device, open, onClose }: Props) => {
  const theme = useTheme<any>();
  const label = getSourceText();
  const [startEditDevice, setStartEditDevice] = useState<IDevice>(device)

  useEffect(() => {
    setStartEditDevice(device)
  }, [device]);

  const handleOnSaved = () => {
    onClose()
  }

  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{
        '& .MuiPaper-root': { background: theme.palette.background.default },

      }}
      fullWidth
      maxWidth={"lg"}
    >
      <DialogTitle>
        <Stack direction={"row"} alignItems={"start"} justifyContent={"space-between"}>
          <Typography variant="h6">
            {label.viewDevice}
          </Typography>
          <IconButton onClick={onClose}>
            <ClearIcon fontSize={"large"}/>
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <EditDeviceBox device={device} startEditDevice={startEditDevice} onSaved={handleOnSaved} />
      </DialogContent>
    </Dialog>
  );
};

export default DeviceEditDialog;