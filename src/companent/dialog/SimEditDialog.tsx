import { ISim } from "../../interfaces/data.ts";
import { useTheme } from "@mui/material/styles";
import getSourceText from "../../constants/sourceText.ts";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import EditSimBox from "../box/sim/EditSimBox.tsx";

interface Props {
  open: boolean
  sim: ISim
  onClose: () => void
}

const SimEditDialog = ({ sim, open, onClose }: Props) => {
  const theme = useTheme<any>();
  const label = getSourceText();
  const [startEditSim, setStartEditSim] = useState<ISim>(sim)

  useEffect(() => {
    setStartEditSim(sim)
  }, [sim]);

  const handleOnSaved = () => {
    onClose()
  }

  return (
    <Dialog
      fullWidth
      maxWidth={"sm"}
      onClose={onClose}
      open={open}
      sx={{
        '& .MuiPaper-root': { background: theme.palette.background.default } //minHeight: '90%',
      }}
    >
      <DialogTitle>
        <Stack direction={"row"} alignItems={"start"} justifyContent={"space-between"}>
          <Typography variant="h6">
            {label.viewSim}
          </Typography>
          <IconButton onClick={onClose}>
            <ClearIcon fontSize={"large"}/>
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <EditSimBox sim={sim} startEditSim={startEditSim} onSaved={handleOnSaved}/>
      </DialogContent>
    </Dialog>
  );
};

export default SimEditDialog;