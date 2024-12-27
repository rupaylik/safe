import { IEquipment, ISim } from "../../interfaces/data.ts";
import { useTheme } from "@mui/material/styles";
import useSourceText from "../../hooks/useSourceText.ts";
import { useState } from "react";
import { initialSim } from "../../constants/initialObj.ts";
import { GridRowParams } from "@mui/x-data-grid";
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import UserAndSafeSelector from "../box/UserAndSafeSelector.tsx";
import CustomButton from "../box/button/CustomButton.tsx";
import { useSaveSimMutation } from "../../service/rtk/api/simApi.ts";
import SimEditDialog from "./SimEditDialog.tsx";
import { getSimColumns } from "../../constants/simConst.tsx";
import DataGridCustom from "../DataGridCustom.tsx";

interface Props {
  sims: ISim[],
  open: boolean,
  onClose: () => void
}

const SimTransferDialog = ({ sims, open, onClose }: Props) => {
  const theme = useTheme<any>();
  const label = useSourceText().sim
  const [sim, setSim] = useState<ISim>(initialSim)
  const [openSimDialog, setOpenSimDialog] = useState(false)
  const [equipment, setEquipment] = useState<IEquipment>({} as IEquipment)

  const [saveSim] = useSaveSimMutation()
  const handleRowDoubleClick = (params: GridRowParams<ISim>) => {
    setSim(params.row)
    setOpenSimDialog(true)
  }

  const handleTransfer = () => {
    const saveDevices = sims.map(d => ({ ...d, ...equipment }))
    saveDevices.forEach(async (d) => {
      await saveSim(d)
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
            {label.simTransferTitle}
          </Typography>
          <IconButton onClick={onClose}>
            <ClearIcon fontSize={"large"}/>
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        {openSimDialog &&
          <SimEditDialog
            open={openSimDialog}
            sim={sim}
            onClose={() => setOpenSimDialog(false)}
          />
        }
        <DataGridCustom
          hideFooter={true}
          rows={sims}
          columns={getSimColumns(false)}
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
    </Dialog>)
};

export default SimTransferDialog;